import type { Finding } from "./pack-intelligence";

/** Persist only a user's acknowledgement, never alter the underlying finding. */
export type IgnoredFindingRecords = Record<string, string>;

/**
 * The original Analysis tab already had a handful of the same warnings as
 * Gear Compatibility. Share acknowledgements for truly equivalent checks,
 * without merging independent weather/forecast observations.
 */
export function findingAcknowledgementId(finding: Finding): string {
  const id = finding.id;
  const paired = new Map([
    ['gear-missing-packs', 'missing-packs'],
    ['gear-missing-shelter', 'missing-shelter'],
    ['gear-missing-sleep', 'missing-sleep'],
    ['gear-missing-water', 'missing-water'],
    ['gear-cooking-plan', 'missing-cooking'],
    ['gear-sleep-no-trip-low', 'sleep-no-low'],
    ['gear-sleep-rating-unknown', 'sleep-unrated'],
    ['gear-unknown-weights', 'unknown-weight'],
  ]);
  if (paired.has(id)) return paired.get(id)!;
  if (id.startsWith('gear-sleep-rating-review-')) return `sleep-temp-${id.slice('gear-sleep-rating-review-'.length)}`;
  return id;
}

/**
 * Acknowledgements re-open on changed evidence. Stable missing-category
 * checks have no additional numeric evidence: the finding disappears once
 * the gear is added, so their shared signature only needs the item IDs.
 */
export function findingFingerprint(finding: Finding): string {
  const id = findingAcknowledgementId(finding);
  const itemIds = [...finding.itemIds].sort();
  if (/^(missing-(packs|shelter|sleep|water|cooking)|sleep-no-low|sleep-unrated|unknown-weight)$/.test(id)) {
    return JSON.stringify([id, itemIds]);
  }
  if (id.startsWith('sleep-temp-')) {
    const temperatures = [...finding.basis.matchAll(/(-?\d+(?:\.\d+)?)°C/g)].map(m => Number(m[1]));
    if (temperatures.length >= 2) return JSON.stringify([id, itemIds, temperatures.slice(0, 2)]);
  }
  return JSON.stringify([
    id, finding.section, finding.level, finding.title, finding.detail,
    finding.action, finding.basis, itemIds,
  ]);
}

export function parseIgnoredFindings(raw: string | null): IgnoredFindingRecords {
  if (!raw) return {};
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== "object" || Array.isArray(value)) return {};
    return Object.fromEntries(Object.entries(value).filter(([id, fingerprint]) =>
      id.length <= 250 && typeof fingerprint === "string" && fingerprint.length <= 10000,
    ));
  } catch {
    return {};
  }
}

export function isFindingIgnored(finding: Finding, records: IgnoredFindingRecords): boolean {
  return records[findingAcknowledgementId(finding)] === findingFingerprint(finding);
}
