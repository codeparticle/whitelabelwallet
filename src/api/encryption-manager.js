const crypto = require('crypto');
const atob = require('atob');

/**
 * Handles encryption and decryption of the database
 */
export class EncryptionManager {
  /**
   * [web only] decrypt the encrypted Database stored on client
   * and return a base64string of the decrypted DB file
   * @param {string} username : login name of the user
   * @param {string} password : user's password to the account
   * @param {base64string} dbFile : basae64string of the encrypted file
   */
  static prepToLoadDatabase(username, password, dbFile) {
    const dbBinary = this.encodeBinary(dbFile);
    const buffer = Buffer.from(dbBinary);
    const decryptedDatabase = this.decryptDatabase(username, password, buffer);
    const decodedBinary = this.decodeBinary(decryptedDatabase);

    return decodedBinary;
  }

  /**
   * [web only] encrypt the Database file passed over from the server in
   * buffer format and encrypt the database into serialized string
   * @param {object} userData : user information coming from client side
   * @param {Uint8Array} dbBinary : dbBinary of the unencrypted DB file
   */
  static prepToSaveDatabase(username, password, dbBinary) {
    const encryptedDatabase = this.encryptDatabase(username, password, dbBinary);
    const serializedBinary = this.decodeBinary(encryptedDatabase);

    return serializedBinary;
  }

  /**
   * Given an encrypted ArrayBuffer of the DB file, decrypt the database information using
   * user's login information and return the proper ArrayBuffer
   * @param {string} username : login name of the user
   * @param {string} password : user's password to the account
   * @param {ArrayBuffer} inputBytes : encrypted ArrayBuffer stored in local system
   */
  static decryptDatabase(username, password, inputBytes) {
    let i = Buffer.byteLength(username);
    const recoveredUsername = inputBytes.slice(0, i).toString('utf-8');
    let outputBuffer = [];

    if (username === recoveredUsername) {
      const iv = inputBytes.slice(0, i + 64);
      i += 64;
      const salt = inputBytes.slice(i, i + 64);
      i += 64;
      const tag = inputBytes.slice(i, i + 16);
      i += 16;
      const encrypted = inputBytes.slice(i);
      const key = crypto.pbkdf2Sync(password, salt, 2145, 32, 'sha512');
      const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);

      decipher.setAuthTag(tag);
      decipher.setAutoPadding(true);

      outputBuffer = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    }

    return outputBuffer;
  }

  /**
   * Given a Uint8Array DB file, encrypt the DB with user's login info
   * and return an ArrayBuffer
   * @param {string} username : login name of the user
   * @param {string} password : user's password to the account
   * @param {Uint8Array} inputBytes : DB file to be encrypted as exported by Wallet Service
   */
  static encryptDatabase(username, password, inputBytes) {
    const iv = Buffer.concat([Buffer.from(username, 'utf-8'), crypto.randomBytes(64)]);
    const salt = crypto.randomBytes(64);
    const key = crypto.pbkdf2Sync(password, salt, 2145, 32, 'sha512');
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    const encrypted = Buffer.concat([cipher.update(inputBytes), cipher.final()]);

    return Buffer.concat([iv, salt, cipher.getAuthTag(), encrypted]);
  }

  // helper function that converts Uint8Array into base64 string
  static decodeBinary(dbBinary) {
    const stringArray = new Uint8Array(dbBinary).reduce(function (data, byte) {
      return data + String.fromCharCode(byte);
    }, '');

    return btoa(stringArray);
  }

  // helper function that converts base64 string into Uint8Array
  // dbFile must be in Uint8Array to be read
  static encodeBinary(b64encoded) {
    const bytesArray = atob(b64encoded).split('').map(function (c) {
      return c.charCodeAt(0);
    });

    return new Uint8Array(bytesArray);
  }

  static getAuthentication() {
    return {
      algorithm: 'aes-256-ctr',
      password: process.env.STRING_ENCRYPTION_PASSWORD,
    };
  }

  /**
   * Method used to encrypt a regular string into a hash
   * @param {string} text
   */
  static encryptString(text) {
    const cipher = crypto.createCipher(EncryptionManager.getAuthentication().algorithm, EncryptionManager.getAuthentication().password);
    let crypted = cipher.update(text, 'utf8', 'hex');

    crypted += cipher.final('hex');
    return crypted;
  }

  /**
   * Method used to decrypt a hash into a regular string
   * @param {string} text
   */
  static decryptString(text) {
    const decipher = crypto.createDecipher(EncryptionManager.getAuthentication().algorithm, EncryptionManager.getAuthentication().password);
    let dec = decipher.update(text, 'hex', 'utf8');

    dec += decipher.final('utf8');
    return dec;
  }
}
