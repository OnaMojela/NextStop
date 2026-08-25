/**
 * Runs the ride end to end against the real route and asserts the train
 * stops at every station in order and finishes at Cape Town.
 *
 *   node scripts/check-playback.ts
 */
import { ROUTE, STOPS } from "../src/data/route.ts";
import { buildRoute } from "../src/lib/geo.ts";
import { advance, nearestStop, nextStop } from "../src/lib/playback.ts";

const route = buildRoute(ROUTE);
const marks = STOPS.map((s) => ({ id: s.id, km: route.stopKm[s.id] }));

let failures = 0;
function check(label: string, ok: boolean, detail = "") {
  if (!ok) failures++;
  console.log(`${ok ? "  ok  " : " FAIL "} ${label}${detail ? ` — ${detail}` : ""}`);
}

// Route shape
check("route length is plausible", route.totalKm > 1300 && route.totalKm < 1600, `${route.totalKm.toFixed(0)} km`);
check("marks increase monotonically", marks.every((m, i) => i === 0 || m.km > marks[i - 1].km));
check("starts at Pretoria, km 0", marks[0].id === "pretoria" && marks[0].km === 0);
check("ends at Cape Town, at the far end", marks[9].id === "capetown" && Math.abs(marks[9].km - route.totalKm) < 0.01);

// A full ride at 60 fps, holding at each station the way the app does.
const RIDE_SECONDS = 50;
const speed = route.totalKm / RIDE_SECONDS;
const visited: string[] = [];
let km = 0;
let frames = 0;
let done = false;

while (!done && frames < 20000) {
  frames++;
  const step = advance(km, speed / 60, marks, route.totalKm);
  km = step.km;
  if (step.arrivedId) visited.push(step.arrivedId);
  done = step.done;
}

check("ride terminates", done, `${frames} frames`);
check("stops at every station after the first", visited.length === 9, visited.join(" → ") || "none");
check(
  "stops in route order",
  visited.join(",") === marks.slice(1).map((m) => m.id).join(",")
);
check("no station visited twice", new Set(visited).size === visited.length);
check("finishes at Cape Town", Math.abs(km - route.totalKm) < 0.01);

// A step big enough to skip several stations still lands on the first one.
const bigJump = advance(marks[2].km - 1, 400, marks, route.totalKm);
check(
  "never skips a station, however big the step",
  bigJump.arrivedId === marks[2].id && bigJump.km === marks[2].km,
  `landed on ${bigJump.arrivedId}`
);

// Resuming from a platform does not re-trigger the same arrival.
const resume = advance(marks[3].km, speed / 60, marks, route.totalKm);
check("resuming from a platform moves on", resume.arrivedId === null && resume.km > marks[3].km);

// Readout helpers
check("nextStop at a platform names that platform", nextStop(marks[4].km, marks).id === marks[4].id);
check("nextStop mid-Karoo looks ahead", nextStop(marks[4].km + 50, marks).id === marks[5].id);
check("nearestStop snaps backwards when closer", nearestStop(marks[4].km + 5, marks).id === marks[4].id);
check("nearestStop snaps forwards when closer", nearestStop(marks[5].km - 5, marks).id === marks[5].id);

console.log(failures ? `\n${failures} check(s) failed` : "\nAll checks passed");
process.exit(failures ? 1 : 0);
