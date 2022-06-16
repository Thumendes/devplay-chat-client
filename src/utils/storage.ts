export class Storage {
  static set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static get(key: string) {
    const value = localStorage.getItem(key);

    if (!value) return;

    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  }

  static remove(key: string) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }
}
