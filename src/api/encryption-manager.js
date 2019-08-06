import { environment } from 'lib/utils/environment';
const crypto = require('crypto');
const atob = require('atob');

const btoa = (b) => Buffer.from(b).toString('base64');
const ALGORITHM = 'aes-192-cbc';

/**
 * Handles encryption and decryption of the database
 */
export class EncryptionManager {
  static decryptDatabase(username, password, dbFile) {
    const key = this.keyFromCredentials(username, password);
    const decrypted = this.decrypt(key, dbFile);

    return decrypted ? this.encodeBinary(decrypted) : null;
  }

  static encryptDatabase(username, password, dbBinary) {
    const key = this.keyFromCredentials(username, password);
    const encrypted = this.encrypt(key, typeof dbBinary === 'string' ? dbBinary : btoa(dbBinary));

    return encrypted;
  }

  static stretchString(s, salt, outputLength) {
    return crypto.pbkdf2Sync(s, salt, 2000, outputLength, 'sha512');
  }

  static keyFromCredentials(username, password) {
    // We need 24 bytes for the key, and another 48 bytes for the salt
    const keyPlusHashingSalt = this.stretchString(`${username}_${password}`, 'salt', 24 + 48);

    return {
      cipherKey: keyPlusHashingSalt.slice(0, 24),
      hashingSalt: keyPlusHashingSalt.slice(24),
    };
  }

  static encrypt(key, sourceData) {
    const iv = Buffer.alloc(16, 0); // Initialization vector
    const cipher = crypto.createCipheriv(ALGORITHM, key.cipherKey, iv);
    let encrypted = cipher.update(sourceData, 'binary', 'binary');
    encrypted += cipher.final('binary');

    return encrypted;
  }

  static decrypt(key, encryptedData) {
    try {
      const iv = Buffer.alloc(16, 0); // Initialization vector
      const decipher = crypto.createDecipheriv(ALGORITHM, key.cipherKey, iv);
      let decrypted = decipher.update(encryptedData, 'binary', 'binary');
      decrypted += decipher.final('binary');

      return decrypted;
    } catch (err) {
      console.error(err);
    }

    return null;
  }

  static decodeBinary(binary) {
    return btoa(new Uint8Array(binary).reduce((data, byte) => {
      return `${data}${String.fromCharCode(byte)}`;
    }, ''));
  }

  static encodeBinary(base64) {
    return new Uint8Array(atob(base64).split('').map((singleCharacter) => {
      return singleCharacter.charCodeAt(0);
    }));
  }

  static getEncryptionString() {
    return environment.encryptionString();
  }

  static encryptString(text) {
    const parsedText = `__${text}___`;
    const iv = Buffer.alloc(16, 0);
    const cipher = crypto.createCipheriv(ALGORITHM, environment.stringEncryptionSecret, iv);

    return `${cipher.update(parsedText, 'utf8', 'hex')}${cipher.final('hex')}`;
  }

  static decryptString(encryptedData) {
    try {
      const iv = Buffer.alloc(16, 0);
      const decipher = crypto.createDecipheriv(ALGORITHM, environment.stringEncryptionSecret, iv);
      const text = `${decipher.update(encryptedData, 'hex', 'utf8')}${decipher.final('utf8')}`.slice(2);

      return text.slice(0, text.length - 3);
    } catch (err) {
      console.error(err);
    }

    return '';
  }
}
