import { API_BASE_URL } from '../constants/endpoints';

describe('API_BASE_URL', () => {
  it('should be defined', () => {
    expect(API_BASE_URL).toBeDefined();
  });

  it('should be a string', () => {
    expect(typeof API_BASE_URL).toBe('string');
  });

  it('should not be an empty string', () => {
    expect(API_BASE_URL).not.toBe('');
  });

  it("should start with 'http' or 'https'", () => {
    expect(
      API_BASE_URL.startsWith('http://') || API_BASE_URL.startsWith('https://')
    ).toBe(true);
  });
});
