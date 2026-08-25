import type { RoutePoint, Stop } from "./types";

/**
 * The Pretoria–Cape Town line, traced through the towns the rail actually
 * passes through. Points carrying a `stop` id are scheduled stops; the rest
 * shape the line so the Karoo bends and the Hex River Pass read correctly.
 */
export const ROUTE: RoutePoint[] = [
  { lat: -25.7469, lng: 28.1878, stop: "pretoria" },
  { lat: -25.8603, lng: 28.1894 },
  { lat: -25.9895, lng: 28.13 },
  { lat: -26.1, lng: 28.09 },
  { lat: -26.2041, lng: 28.04, stop: "johannesburg" },
  { lat: -26.1625, lng: 27.8725 },
  { lat: -26.1006, lng: 27.7719 },
  { lat: -26.18, lng: 27.7 },
  { lat: -26.4, lng: 27.42 },
  { lat: -26.7145, lng: 27.0975 },
  { lat: -26.8598, lng: 26.6667, stop: "klerksdorp" },
  { lat: -27.24, lng: 26.25 },
  { lat: -27.1969, lng: 25.9797 },
  { lat: -27.6472, lng: 25.6053 },
  { lat: -27.9089, lng: 25.1631 },
  { lat: -28.1119, lng: 24.8481 },
  { lat: -28.4, lng: 24.79 },
  { lat: -28.7383, lng: 24.7639, stop: "kimberley" },
  { lat: -29.04, lng: 24.6 },
  { lat: -29.43, lng: 24.38 },
  { lat: -29.61, lng: 24.19 },
  { lat: -29.9, lng: 24.09 },
  { lat: -30.2, lng: 24.05 },
  { lat: -30.6497, lng: 24.0122, stop: "deaar" },
  { lat: -31.0, lng: 23.85 },
  { lat: -31.3, lng: 23.6 },
  { lat: -31.88, lng: 23.03 },
  { lat: -32.1, lng: 22.78 },
  { lat: -32.3567, lng: 22.5833, stop: "beaufortwest" },
  { lat: -32.62, lng: 22.24 },
  { lat: -32.77, lng: 21.96 },
  { lat: -33.0, lng: 21.6 },
  { lat: -33.14, lng: 21.15 },
  { lat: -33.1958, lng: 20.8547 },
  { lat: -33.2325, lng: 20.5806, stop: "matjiesfontein" },
  { lat: -33.29, lng: 20.28 },
  { lat: -33.3389, lng: 20.0244, stop: "touwsrivier" },
  { lat: -33.44, lng: 19.79 },
  { lat: -33.4767, lng: 19.6708 },
  { lat: -33.58, lng: 19.53 },
  { lat: -33.6465, lng: 19.4485, stop: "worcester" },
  { lat: -33.6, lng: 19.24 },
  { lat: -33.6394, lng: 19.0111 },
  { lat: -33.7274, lng: 18.956 },
  { lat: -33.81, lng: 18.86 },
  { lat: -33.9008, lng: 18.6292 },
  { lat: -33.9249, lng: 18.4241, stop: "capetown" },
];

export const STOPS: Stop[] = [
  {
    id: "pretoria",
    name: "Pretoria",
    province: "Gauteng",
    biome: "highveld",
    arrival: "10:00",
    day: 1,
    dwell: 0,
    tagline: "Departure. A Herbert Baker station, and a city that turns purple in October.",
    attractions: [
      {
        name: "Union Buildings",
        interest: "heritage",
        reach: "8 km · 15 min taxi",
        blurb:
          "Baker's sandstone crescent above terraced gardens, and the 9-metre Mandela statue that now anchors the lawn.",
      },
      {
        name: "Freedom Park",
        interest: "heritage",
        reach: "6 km · 12 min taxi",
        blurb:
          "A memorial built into Salvokop hill. The Wall of Names runs for 697 metres and is still being added to.",
      },
      {
        name: "Jacaranda streets, Brooklyn",
        interest: "nature",
        reach: "5 km · seasonal, Oct–Nov",
        blurb:
          "Roughly 70 000 jacarandas across the city. For six weeks the older suburbs go entirely purple overhead.",
      },
    ],
    story: {
      title: "The station is the first exhibit",
      text: "Pretoria Station opened in 1910, designed by Herbert Baker in the same year the Union of South Africa was formed. The building was declared a national monument before most passengers thought of a station as somewhere worth looking at. Stand on the concourse before you board — the roof trusses and the clock are the same ones that watched the first Cape mail leave.",
    },
    taste: {
      name: "Marabastad curry",
      note: "Ten minutes from the platform, the oldest Indian trading quarter in the city still serves the bunny chow's Pretoria cousin.",
    },
  },
  {
    id: "johannesburg",
    name: "Johannesburg",
    province: "Gauteng",
    biome: "highveld",
    arrival: "11:35",
    day: 1,
    dwell: 25,
    tagline: "Park Station. Twenty-five minutes is enough to feel the city breathe.",
    attractions: [
      {
        name: "Constitution Hill",
        interest: "heritage",
        reach: "2 km · 8 min taxi",
        blurb:
          "The Old Fort prison where both Gandhi and Mandela were held, with the Constitutional Court built from its bricks.",
      },
      {
        name: "Museum Africa, Newtown",
        interest: "art",
        reach: "1.4 km · 18 min walk",
        blurb:
          "A converted fruit market holding the city's photographic archive, plus the Bensusan camera collection.",
      },
      {
        name: "Maboneng precinct",
        interest: "food",
        reach: "3 km · 10 min taxi",
        blurb:
          "Warehouse blocks turned studios and rooftop kitchens on the eastern edge of the CBD.",
      },
    ],
    story: {
      title: "The concourse that moved house",
      text: "The Victorian steel-and-glass concourse that once covered Park Station was taken apart piece by piece in the 1950s when the new station went up. It sat in storage for decades before being re-erected in Newtown, where it now shelters a market. The station you arrive at is the second building on the site; the roof of the first is a fifteen-minute walk away.",
    },
    taste: {
      name: "Kota from a Newtown corner",
      note: "A quarter loaf hollowed out and packed with chips, polony, atchar and cheese. Built for eating standing up.",
    },
  },
  {
    id: "klerksdorp",
    name: "Klerksdorp",
    province: "North West",
    biome: "highveld",
    arrival: "14:20",
    day: 1,
    dwell: 10,
    tagline: "The oldest town north of the Vaal, and the last of the maize before the veld thins.",
    attractions: [
      {
        name: "Faan Meintjies Nature Reserve",
        interest: "nature",
        reach: "18 km · 20 min drive",
        blurb:
          "White rhino, giraffe and blesbok on 1 000 hectares of grassland — a short reserve you can actually do in an afternoon.",
      },
      {
        name: "Klerksdorp Museum",
        interest: "heritage",
        reach: "3 km · 8 min taxi",
        blurb:
          "Housed in the 1891 gaol. The cells are intact, including the ones used for the town's gold-rush drunks.",
      },
      {
        name: "Goudkoppie viewpoint",
        interest: "adventure",
        reach: "6 km · 15 min drive",
        blurb:
          "The koppie the first diggers climbed to peg claims in 1886. The whole goldfield is laid out below it.",
      },
    ],
    story: {
      title: "Founded by sixteen families",
      text: "Klerksdorp began in 1837 when sixteen Voortrekker families settled on the banks of the Schoonspruit — making it the oldest town in the old Transvaal. Fifty years later gold turned it into a boom town so fast that it opened its own stock exchange, and briefly had more share brokers than churches. The exchange lasted eight years.",
    },
    taste: {
      name: "Platteland padkos",
      note: "Droëwors and koeksisters sold on the platform. This is the last stop where the maize belt still feeds the trolley.",
    },
  },
  {
    id: "kimberley",
    name: "Kimberley",
    province: "Northern Cape",
    biome: "karoo",
    arrival: "20:15",
    day: 1,
    dwell: 30,
    tagline: "The city that lit itself before London did, built around a hole dug by hand.",
    attractions: [
      {
        name: "The Big Hole",
        interest: "heritage",
        reach: "5 km · 10 min taxi",
        blurb:
          "463 metres across, dug with picks and buckets by up to 30 000 men. The viewing platform hangs out over the water.",
      },
      {
        name: "William Humphreys Art Gallery",
        interest: "art",
        reach: "4 km · 9 min taxi",
        blurb:
          "Old Masters alongside one of the country's strongest collections of contemporary South African painting.",
      },
      {
        name: "Star of the West",
        interest: "food",
        reach: "5 km · 10 min taxi",
        blurb:
          "Trading since 1873 and still pouring. The oldest pub in South Africa, two streets from the mine that paid for it.",
      },
    ],
    story: {
      title: "Electric light before Europe",
      text: "In 1882 Kimberley became the first city in the southern hemisphere — and one of the first anywhere — to install electric street lighting, ahead of London. The diamond companies needed the mines worked around the clock, and the town got the light as a side effect. Arrive after dark and you are pulling into a place that decided night was optional a hundred and forty years ago.",
    },
    taste: {
      name: "Halfway House drive-in bar",
      note: "You can still order a drink from the saddle, or the driver's seat. A licence the town never bothered to repeal.",
    },
  },
  {
    id: "deaar",
    name: "De Aar",
    province: "Northern Cape",
    biome: "karoo",
    arrival: "00:40",
    day: 2,
    dwell: 20,
    tagline: "Midnight at the country's great rail crossroads, under the darkest sky on the line.",
    attractions: [
      {
        name: "Olive Schreiner House",
        interest: "heritage",
        reach: "1 km · 12 min walk",
        blurb:
          "The writer of The Story of an African Farm lived here from 1907. Her desk faces the Karoo she made famous.",
      },
      {
        name: "The junction yards",
        interest: "heritage",
        reach: "On the platform",
        blurb:
          "South Africa's second-largest rail junction. Lines split here for Namibia, the Cape and the interior.",
      },
      {
        name: "Karoo night sky",
        interest: "stargazing",
        reach: "Step off the platform",
        blurb:
          "Almost no light pollution for 200 km. On a moonless night the Magellanic Clouds are visible without help.",
      },
    ],
    story: {
      title: "A town that exists because two lines met",
      text: "De Aar was not a settlement that gained a railway; it is a railway that grew a town. The junction was laid in 1881 on an empty farm, and everything else followed the tracks. At its height the yards handled a hundred trains a day. If you are awake at this stop, look out at the sidings — the sheer width of the yard is the reason there is anything here at all.",
    },
    taste: {
      name: "Karoo lamb, off the coals",
      note: "The sheep graze on wild karoobossie scrub, which seasons the meat before it ever reaches salt.",
    },
  },
  {
    id: "beaufortwest",
    name: "Beaufort West",
    province: "Western Cape",
    biome: "karoo",
    arrival: "04:25",
    day: 2,
    dwell: 15,
    tagline: "Gateway to the Karoo National Park, and the town that produced a heart surgeon.",
    attractions: [
      {
        name: "Karoo National Park",
        interest: "nature",
        reach: "5 km · 10 min drive",
        blurb:
          "Cape mountain zebra, black rhino and the Klipspringer Pass. The fossil trail reads 250 million years back.",
      },
      {
        name: "Chris Barnard Museum",
        interest: "heritage",
        reach: "2 km · 20 min walk",
        blurb:
          "The parsonage where the surgeon who performed the first human heart transplant grew up, kept as it was.",
      },
      {
        name: "Pre-dawn Karoo sky",
        interest: "stargazing",
        reach: "On the platform",
        blurb:
          "At 04:25 the Milky Way sits directly overhead in winter. Fifteen minutes is enough to see it properly.",
      },
    ],
    story: {
      title: "The oldest town in the Karoo",
      text: "Beaufort West was proclaimed in 1818 and became the first municipality in South Africa in 1837 — before Cape Town formally had one. The Dutch Reformed church on Donkin Street now holds the town museum. Christiaan Barnard's father preached in it, and Barnard credited the plain rooms of the parsonage with teaching him that careful work matters more than equipment.",
    },
    taste: {
      name: "Moerkoffie and beskuit",
      note: "Grounds boiled in the pot, poured over a rusk hard enough to stand a spoon in. The correct order is dunk, then bite.",
    },
  },
  {
    id: "matjiesfontein",
    name: "Matjiesfontein",
    province: "Western Cape",
    biome: "karoo",
    arrival: "07:10",
    day: 2,
    dwell: 10,
    tagline: "A whole Victorian village, declared a national monument, one street deep.",
    attractions: [
      {
        name: "Lord Milner Hotel",
        interest: "heritage",
        reach: "40 m · across the platform",
        blurb:
          "Turrets, a 1899 billiard room and a guest list that ran from Cecil Rhodes to the Sultan of Zanzibar.",
      },
      {
        name: "Marie Rawdon Museum",
        interest: "art",
        reach: "60 m · on the platform",
        blurb:
          "Three floors of Victoriana in the old station building, including a transport hall out back.",
      },
      {
        name: "The Laird's Arms",
        interest: "food",
        reach: "80 m · one minute walk",
        blurb:
          "A London pub interior shipped out whole. The bus outside is a genuine Routemaster and still does tours.",
      },
    ],
    story: {
      title: "The man who sold water to trains",
      text: "James Logan was a Scottish railwayman posted to this siding in 1884 with weak lungs. He noticed that steam locomotives crossing the Karoo needed water and that nobody was selling it, took the refreshment contract for the entire Cape line, and built a village with the proceeds. The whole of Matjiesfontein — hotel, church, cottages — is one man's dining-car monopoly turned into architecture.",
    },
    taste: {
      name: "Breakfast at the Lord Milner",
      note: "The dining room opens for the morning train. Ten minutes is tight, but people have managed it since 1899.",
    },
  },
  {
    id: "touwsrivier",
    name: "Touws River",
    province: "Western Cape",
    biome: "cape",
    arrival: "08:35",
    day: 2,
    dwell: 8,
    tagline: "The top of the Hex River Pass — where the Karoo stops, in about four kilometres.",
    attractions: [
      {
        name: "Hex River Pass tunnels",
        interest: "adventure",
        reach: "From your window",
        blurb:
          "Four tunnels, the longest 13.4 km, dropping the line 600 m into the valley. Sit on the left side.",
      },
      {
        name: "Hex River Valley vineyards",
        interest: "nature",
        reach: "Visible for 20 min",
        blurb:
          "The country's largest table-grape region, laid out in green blocks under bare rock walls.",
      },
      {
        name: "Matroosberg Reserve",
        interest: "adventure",
        reach: "35 km · 40 min drive",
        blurb:
          "2 249 m and one of the few places in South Africa that reliably snows. Skiing, in the Western Cape.",
      },
    ],
    story: {
      title: "Four kilometres, two countries",
      text: "The Hex River Pass is the sharpest landscape edge on the entire journey. Above it: bare Karoo, thorn and stone, unchanged since De Aar. Below it: irrigated vineyard, oak, whitewashed gables. The tunnels took twelve years to bore and opened in 1989. Passengers who sleep through this section are the ones who tell you the trip was mostly desert.",
    },
    taste: {
      name: "Hanepoot grapes, in season",
      note: "Sold on the platform from February. Sweet enough that the region turned most of the crop into wine instead.",
    },
  },
  {
    id: "worcester",
    name: "Worcester",
    province: "Western Cape",
    biome: "cape",
    arrival: "10:20",
    day: 2,
    dwell: 12,
    tagline: "Brandy, succulents, and the working farm museum that pretends it is 1890.",
    attractions: [
      {
        name: "Karoo Desert Botanical Garden",
        interest: "nature",
        reach: "3 km · 8 min taxi",
        blurb:
          "The only botanical garden in the country dedicated to succulents. Peak flowering runs August to October.",
      },
      {
        name: "KWV House of Brandy",
        interest: "food",
        reach: "4 km · 10 min taxi",
        blurb:
          "120 potstills under one roof, the largest concentration in the world. Tastings run on the hour.",
      },
      {
        name: "Kleinplasie Living Museum",
        interest: "heritage",
        reach: "5 km · 11 min taxi",
        blurb:
          "A working pioneer farm — bread baked in a clay oven, witblits distilled, tobacco rolled, daily.",
      },
    ],
    story: {
      title: "Where the country's brandy is decided",
      text: "Worcester sits at the centre of the Breede River Valley, which produces roughly a quarter of South Africa's wine grapes and almost all of its brandy. The KWV cellar here holds 120 copper potstills. South African brandy has taken the world's top trophy more often than any other country's, and nearly all of it was distilled within twenty kilometres of this platform.",
    },
    taste: {
      name: "Potstill brandy and a slice of melktert",
      note: "The classic Boland pairing. The brandy is triple-distilled and aged three years minimum by law.",
    },
  },
  {
    id: "capetown",
    name: "Cape Town",
    province: "Western Cape",
    biome: "cape",
    arrival: "13:00",
    day: 2,
    dwell: 0,
    tagline: "Arrival. The mountain is on your right for the last twenty minutes.",
    attractions: [
      {
        name: "Bo-Kaap",
        interest: "heritage",
        reach: "1.5 km · 20 min walk",
        blurb:
          "Cobbled streets and painted façades above the CBD, and the country's oldest mosque, built in 1794.",
      },
      {
        name: "Table Mountain",
        interest: "adventure",
        reach: "6 km · 15 min taxi",
        blurb:
          "Platteklip Gorge on foot in about two hours, or the rotating cable car in five minutes.",
      },
      {
        name: "Zeitz MOCAA",
        interest: "art",
        reach: "1.8 km · 22 min walk",
        blurb:
          "Contemporary African art in a carved-out grain silo. The atrium alone is worth the entry.",
      },
    ],
    story: {
      title: "The last twenty minutes",
      text: "After Bellville the line swings and Table Mountain fills the window — the same view that told mail-train passengers they had arrived, before anyone flew. Cape Town Station sits where the old Monument Station stood, and the platform you step onto is the end of a line that has been running to Pretoria since 1892. Twenty-seven hours and one country later, you are here.",
    },
    taste: {
      name: "Gatsby, Athlone-style",
      note: "A foot of bread, masala steak, chips and sauce, cut into four. Invented in Athlone in 1976 to feed workers.",
    },
  },
];
