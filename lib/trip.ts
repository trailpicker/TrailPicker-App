export function getDateRange(start: Date, end: Date): Date[] {
  const days: Date[] = [];
  const cursor = new Date(
    Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate())
  );
  const last = new Date(
    Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate())
  );

  while (cursor.getTime() <= last.getTime()) {
    days.push(new Date(cursor));
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  return days;
}

export function formatDateRange(start: Date | null, end: Date | null): string {
  if (!start || !end) return "No dates set";

  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  const sameYear = start.getUTCFullYear() === end.getUTCFullYear();

  const startLabel = start.toLocaleDateString(undefined, { ...opts, timeZone: "UTC" });
  const endLabel = end.toLocaleDateString(undefined, {
    ...opts,
    year: "numeric",
    timeZone: "UTC",
  });

  if (sameYear) {
    return `${startLabel} – ${endLabel}`;
  }

  const startLabelWithYear = start.toLocaleDateString(undefined, {
    ...opts,
    year: "numeric",
    timeZone: "UTC",
  });

  return `${startLabelWithYear} – ${endLabel}`;
}

export function getNights(start: Date | null, end: Date | null): number {
  if (!start || !end) return 0;

  const startUTC = Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate());
  const endUTC = Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate());

  return Math.max(0, Math.round((endUTC - startUTC) / 86400000));
}

export function getDaysUntil(start: Date | null): number | null {
  if (!start) return null;

  const now = new Date();
  const todayUTC = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const startUTC = Date.UTC(
    start.getUTCFullYear(),
    start.getUTCMonth(),
    start.getUTCDate()
  );

  return Math.round((startUTC - todayUTC) / 86400000);
}