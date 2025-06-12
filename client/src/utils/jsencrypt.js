import JSEncrypt from "jsencrypt";

import CryptoJS from "crypto-js";
import api from "./api";

async function get_publickey() {
  let res = await api.get_publickey();
  return res.publickey;
}

(async () => {
  try {
    const PublicKey = await get_publickey();
    console.log(PublicKey);
  } catch (error) {
    console.error("Failed to get public key or mount app:", error);
  }
})();

export default {
  // 加密用公钥
  getCode(password) {
    console.log("加密前", password);
    const encryptor = new JSEncrypt();
    encryptor.setPublicKey(PublicKey);
    let encrypted = encryptor.encrypt(password);
    return encrypted;
  },
};
