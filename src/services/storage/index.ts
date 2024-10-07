import { localStorageAdapter } from "./adapters/local-storage";
import { sessionStorageAdapter } from "./adapters/session-storage";
import type { StorageAdapter } from "./types";

class Storage {
  private storage: StorageAdapter;

  constructor(storage: StorageAdapter) {
    this.storage = storage;
  }

  public get(key: string) {
    if (!this.storage.get) {
      throw new Error("Storage should support `get` method");
    }

    return this.storage.get(key);
  }

  public set(key: string, value: string) {
    if (!this.storage.set) {
      throw new Error("Storage should support `set` method");
    }

    return this.storage.set(key, value);
  }
}

export const adaptedSessionStorage = new Storage(sessionStorageAdapter);
export const adaptedLocalStorage = new Storage(localStorageAdapter);
