/** Accept only encrypted web links without embedded credentials. */
export function isSafeWebUrl(value: string): value is `https://${string}` {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && Boolean(url.hostname) && !url.username && !url.password;
  } catch {
    return false;
  }
}
