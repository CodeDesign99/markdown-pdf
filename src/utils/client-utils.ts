export function encodePassphrase(bytes: Uint8Array) {
  const binString = Array.from(bytes, (x) => String.fromCodePoint(x)).join('');
  return btoa(binString);
}

export function decodePassphrase(base64String: string) {
  const binString = atob(base64String);
  // @ts-ignore
  return Uint8Array.from(binString, (m) => m.codePointAt(0));
}
