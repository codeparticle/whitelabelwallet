/**
* MIT License
*
* Copyright (c) 2020 Code Particle Inc.
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
import { EncryptionManager } from '../encryption-manager';
export class FileManager {
  constructor(storage) {
    this.storage = storage;
  }

  getKeyName(username, password) {
    const encryptionString = EncryptionManager.getEncryptionString();
    return EncryptionManager.encryptString(`${encryptionString}:${username}:${password}`);
  }

  savePrivateKey(privateKey) {
    this.storage.setItem('privateKey', privateKey);
  }

  saveItem(itemName, item) {
    this.storage.setItem(itemName, item);
  }

  getItem(itemName) {
    return this.storage.getItem(itemName) || null;
  }

  getPrivateKey() {
    return this.storage.getItem('privateKey') || null;
  }

  // fetch DB file on localStorage given username
  getDatabaseFile(username, password) {
    return this.storage.getItem(this.getKeyName(username, password)) || null;
  }

  // removes DB file on localStorage
  removeDatabaseFile(username, password) {
    const keyName = this.getKeyName(username, password);

    if (this.storage.getItem(keyName) !== null) {
      this.storage.removeItem(keyName);
    }
  }

  // stores DB file on localStorage given username
  storeDatabaseFile(username, password, dbFile) {
    this.storage.setItem(this.getKeyName(username, password), dbFile);
  }
}
