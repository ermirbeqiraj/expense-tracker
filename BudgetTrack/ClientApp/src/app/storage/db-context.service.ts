import { Injectable } from '@angular/core';
import idb from 'idb';

@Injectable({
  providedIn: 'root'
})
export class DbContextService {
  dbName = 'expense-track-local-db';
  dbTableName = 'syncTab1';
  dbVersion = 1;
  constructor() {
    if (!('indexedDB' in window)) {
      throw new Error('This browser doesn\'t support IndexedDB');
    }
  }

  guid() {
    let d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
      d += performance.now(); // use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      // tslint:disable-next-line:no-bitwise
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      // tslint:disable-next-line:no-bitwise
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  idbContext() {
    return idb.open(this.dbName, this.dbVersion, upgradeDb => {
      // Note: we don't use 'break' in this switch statement,
      // the fall-through behaviour is what we want.
      switch (upgradeDb.oldVersion) {
        case 0:
          upgradeDb.createObjectStore(this.dbTableName, { keyPath: 'clientId' });
      }
    });
  }

  saveRequest(url: string, method: string, body: any) {
    // in case the sync method fails, this method will be
    // invoked again. to prevent duplications of the very same object in localDb,
    // we add a custom property (clientId), and simply return before save
    if (body.hasOwnProperty('clientId')) {
      console.log('this item is already in indexedDb');
      return;
    }

    if (body.hasOwnProperty('description')) {
      body['description'] = `${body['description']} (auto-sync)`;
    }

    const customId = this.guid();
    body.clientId = customId;

    const obj = {
      clientId: customId,
      url: url,
      method: method,
      body: JSON.stringify(body)
    };

    this.idbContext().then(db => {
      const tx = db.transaction(this.dbTableName, 'readwrite');
      tx.objectStore(this.dbTableName).add(obj);
      return tx.complete;
    });
  }

  async getAllTab1() {
    const db = await this.idbContext();
    return db.transaction(this.dbTableName, 'readonly').objectStore(this.dbTableName).getAll();
  }

  async delete(clientId: string) {
    const db = await this.idbContext();
    const tx = db.transaction(this.dbTableName, 'readwrite');
    tx.objectStore(this.dbTableName).delete(clientId);
    return tx.complete;
  }
}
