export const perPageOptions = [3, 5, 10, 20] as const;

export type PerPage = (typeof perPageOptions)[number];
