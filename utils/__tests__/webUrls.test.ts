import { isSafeWebUrl } from '../webUrls';
import { describe, expect, it } from '@jest/globals';

describe('web links', () => {
  it.each([
    'https://ueargentina.edu.ec/plataforma/sierra',
    'https://ueargentina.edu.ec/plataforma/costa',
    'https://ueargentina.edu.ec/plataforma/semipresencial',
    'https://colegioargentina.net/europa',
  ])('allows the institutional HTTPS link %s', (url) => {
    expect(isSafeWebUrl(url)).toBe(true);
  });

  it.each([
    'http://colegioargentina.net/aulavirtual/login/index.php',
    'javascript:alert(1)',
    'data:text/html,hello',
    'file:///etc/passwd',
    '//ueargentina.edu.ec',
    'https://usuario:clave@ueargentina.edu.ec',
    'not a URL',
  ])('blocks an unsafe URL %s', (url) => {
    expect(isSafeWebUrl(url)).toBe(false);
  });
});
