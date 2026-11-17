/**
 * Verified location/park photography from Wikimedia Commons.
 * Do not silently substitute unrelated landscape photos for destinations.
 * Commons hosts the original; this app uses the browser-facing Special:FilePath endpoint,
 * so no Next.js remotePatterns or image optimization config is needed.
 */
export type DiscoverPhoto = {
  file: string;
  author: string;
  license: string;
  licenseUrl: string;
  description: string;
  /** When true, imagery is of the broader park, NOT the named campsite. */
  representative?: boolean;
};
const photos = {
  garibaldi: {
    file: "Garibaldi Lake seen from Panorama Ridge.jpg", author: "The Cosmonaut",
    license: "CC BY-SA 2.5 CA", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.5/ca/",
    description: "Garibaldi Lake seen from Panorama Ridge",
  },
  joffre: {
    file: "Joffre Lakes Provincial Park6.jpg", author: "Gopi.Perumal",
    license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    description: "Joffre Lakes Provincial Park",
  },
  robson: {
    file: "Mount Robson, Canada.jpg", author: "Nick Saxby",
    license: "CC0 1.0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    description: "Mount Robson in British Columbia",
  },
  elfin: {
    file: "Elfin Lakes 2.jpg", author: "Andysonic777",
    license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    description: "Elfin Lakes, Garibaldi Provincial Park",
  },
  wedgemount: {
    file: "WedgemountLake by IvanAndreevich.JPG", author: "IvanAndreevich",
    license: "CC BY 3.0", licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
    description: "Wedgemount Lake in Garibaldi Provincial Park",
  },
  cape: {
    file: "Cape Scott Provincial Park (28693304363).jpg", author: "David Stanley",
    license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    description: "Cape Scott Provincial Park",
  },
  paradise: {
    file: "Paradise Meadows Strathcona Provincial Park 01.jpg", author: "Susan Daly",
    license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    description: "Paradise Meadows, Strathcona Provincial Park",
  },
} satisfies Record<string, DiscoverPhoto>;

const exact: Readonly<Record<string, keyof typeof photos>> = {
  "garibaldi-lake-destination": "garibaldi",
  "garibaldi-lake": "garibaldi",
  "panorama-ridge-garibaldi": "garibaldi",
  "upper-joffre-lake": "joffre",
  "elfin-lakes": "elfin",
  "elfin-lakes-destination": "elfin",
  "wedgemount-lake": "wedgemount",
  "berg-lake-trail": "robson",
  "berg-lake-robson": "robson",
  "nel-bight-cape-scott": "cape",
  "nels-bight-cape-scott": "cape",
  "san-josef-bay-cape-scott": "cape",
  "paradise-meadows-loop": "paradise",
};
const representativeIds = new Set(["berg-lake-trail", "berg-lake-robson", "nels-bight-cape-scott", "san-josef-bay-cape-scott", "upper-joffre-lake"]);
const representativeParks: Readonly<Record<string, keyof typeof photos>> = {
  "Mount Robson Park": "robson",
  "Cape Scott Park": "cape",
  "Joffre Lakes Park": "joffre",
  "Strathcona Park": "paradise",
};
export function getDiscoverPhoto(destination: { id: string; kind?: string; park: string }): DiscoverPhoto | null {
  const match = exact[destination.id];
  if (match) return representativeIds.has(destination.id) ? { ...photos[match], representative: true } : photos[match];
  // A representative image is clearly labelled and only used for campsites
  // inside the exact same named park. No guessed photo matches by category.
  const parkMatch = destination.kind === "campground" || !destination.kind ? representativeParks[destination.park] : undefined;
  if (!parkMatch) return null;
  return { ...photos[parkMatch], representative: true };
}
export function discoverPhotoUrl(photo: DiscoverPhoto): string {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(photo.file)}?width=960`;
}
export function discoverPhotoSource(photo: DiscoverPhoto): string {
  return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(photo.file)}`;
}
