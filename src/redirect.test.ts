import { describe, it, expect } from 'vitest';
import { buildResultsUrl } from './redirect';

describe('buildResultsUrl', () => {
  it('builds a simple results URL', () => {
    expect(buildResultsUrl('http://localhost:3000', 'Faker', 'KR1', 'na1')).toBe(
      'http://localhost:3000/?riotId=Faker&tag=KR1&region=na1',
    );
  });

  it('encodes spaces in the name', () => {
    expect(buildResultsUrl('http://localhost:3000', 'Hide on bush', 'KR1', 'kr')).toBe(
      'http://localhost:3000/?riotId=Hide%20on%20bush&tag=KR1&region=kr',
    );
  });

  it('encodes non-Latin name and tag', () => {
    expect(buildResultsUrl('http://localhost:3000', '이름', '한국어', 'kr')).toBe(
      'http://localhost:3000/?riotId=%EC%9D%B4%EB%A6%84&tag=%ED%95%9C%EA%B5%AD%EC%96%B4&region=kr',
    );
  });

  it('strips a trailing slash from the base URL', () => {
    expect(buildResultsUrl('http://localhost:3000/', 'Faker', 'KR1', 'na1')).toBe(
      'http://localhost:3000/?riotId=Faker&tag=KR1&region=na1',
    );
  });

  it('still works with https', () => {
    expect(buildResultsUrl('https://results.example.com', 'Faker', 'KR1', 'na1')).toBe(
      'https://results.example.com/?riotId=Faker&tag=KR1&region=na1',
    );
  });

  it.each(['javascript:alert(1)', 'data:text/html,x', 'not a url'])(
    'rejects %s',
    (baseUrl) => {
      expect(() => buildResultsUrl(baseUrl, 'Faker', 'KR1', 'na1')).toThrow();
    },
  );
});