import CryptoJS from "crypto-js";

const SECRET_KEY = "734a9018791a6962376dbcb19dbbcdc8";

export const encryptWithAES = (data: OrderRequest): string => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

export const decryptWithAES = (encryptedText: string): OrderRequest => {
    const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}