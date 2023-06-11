import { AES, enc } from "crypto-js";

const secret = "66f3a00583fb00b35c86031150d590cd";

export function encrypt(val: string): string {
  return AES.encrypt(val, secret).toString();
}
export function decrypt(val: string): string {
  return AES.decrypt(val, secret).toString(enc.Utf8);
}
