function resultsBase(baseUrl: string): string {
  const url = new URL(baseUrl);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error(`Results URL must use http or https, got ${url.protocol}`);
  }
  return baseUrl.replace(/\/$/, '');
}

export function buildSampleUrl(baseUrl: string): string {
  return `${resultsBase(baseUrl)}/?sample=1`;
}

export function buildResultsUrl(
  baseUrl: string,
  gameName: string,
  tagLine: string,
  region: string,
): string {
  const params = new URLSearchParams({
    riotId: gameName,
    tag: tagLine,
    region,
  });
  return `${resultsBase(baseUrl)}/?${params.toString().replace(/\+/g, '%20')}`;
}
