import type { DateRange } from "./types";

/**
 * Render a structured {@link DateRange} as its display label. A range with both
 * endpoints reads `start - end`; a single-point date (no `end`, e.g. a one-day
 * talk) is just its `start`. Endpoints are authored text, so an ongoing role
 * carries `end: "Present"` (or its localized form) and renders unchanged.
 */
export const formatDateRange = ({ start, end }: DateRange): string =>
  end ? `${start} - ${end}` : start;
