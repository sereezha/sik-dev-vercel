class SessionStorageAdapter {
  public get(key: string) {
    return sessionStorage.getItem(key);
  }

  public set(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }
}

export const sessionStorageAdapter = new SessionStorageAdapter();
