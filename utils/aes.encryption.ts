import CryptoJS, { AES, enc } from "crypto-js";

const SECRET_KEY = enc.Utf8.parse("mDGat1uxKDVhtfi4s+mvoA=="); // 16-byte key
const INIT_VECTOR = enc.Utf8.parse("1234567890123456"); // 16-byte IV

export const encryptTextWithAES = (text: string): string => {
    const encrypted = AES.encrypt(text, SECRET_KEY, {
        iv: INIT_VECTOR,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
};
