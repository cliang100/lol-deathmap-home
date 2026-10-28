export function buildResultsUrl(
  baseUrl: string,
  gameName: string,
  tagLine: string,
  region: string,
): string {
  const base = baseUrl.replace(/\/$/, '');
  const params = new URLSearchParams({
    riotId: gameName,
    tag: tagLine,
    region,
  });
  return `${base}/?${params.toString().replace(/\+/g, '%20')}`;
}