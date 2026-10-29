export function buildResultsUrl(
  baseUrl: string,
  gameName: string,
  tagLine: string,
  region: string,
): string {
  const url = new URL(baseUrl);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error(`Results URL must use http or https, got ${url.protocol}`);
  }
  const base = baseUrl.replace(/\/$/, '');
  const params = new URLSearchParams({
    riotId: gameName,
    tag: tagLine,
    region,
  });
  return `${base}/?${params.toString().replace(/\+/g, '%20')}`;
}
