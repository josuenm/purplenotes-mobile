import AsyncStorage from "@react-native-async-storage/async-storage";

export default class ExpireStorage {
  static async getItem(key: string) {
    let data = (await AsyncStorage.getItem(key)) as string as any;
    data = JSON.parse(data);
    if (
      data !== null &&
      data.expireAt &&
      new Date(data.expireAt) < new Date()
    ) {
      await AsyncStorage.removeItem(key);
      data = null;
    }
    return data?.value;
  }

  static async setItem(key: string, value: string, expireInMinutes: number) {
    const data = { value } as { value: string; expireAt: Date };
    if (expireInMinutes) {
      const expireAt = this.getExpireDate(expireInMinutes);
      data.expireAt = expireAt;
    } else {
      const expireAt = JSON.parse(
        (await AsyncStorage.getItem(key)) as string
      )?.expireAt;
      if (expireAt) {
        data.expireAt = expireAt;
      } else {
        return;
      }
    }
    const objectToStore = JSON.stringify(data);
    return AsyncStorage.setItem(key, objectToStore);
  }

  static async removeItem(key: string) {
    return AsyncStorage.removeItem(key);
  }

  static getExpireDate(expireInMinutes: number) {
    const now = new Date();
    const expireTime = new Date(now);
    expireTime.setMinutes(now.getMinutes() + expireInMinutes);
    return expireTime;
  }
}
