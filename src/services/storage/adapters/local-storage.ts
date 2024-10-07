class LocalStorageAdapter {
  public get(key: string) {
    return localStorage.getItem(key);
  }

  public set(key: string, value: string) {
    localStorage.setItem(key, value);
  }
}

export const localStorageAdapter = new LocalStorageAdapter();
