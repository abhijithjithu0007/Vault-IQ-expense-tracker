import { redisClient } from "../db/redis";

export function getOrSetCache(
  key: string,
  CACHE_DURATION: number,
  cb: () => Promise<any>
) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, async (err, data) => {
      if (err) return reject(err);
      if (data !== null) {
        console.log("Data from Cache");
        return resolve(data ? JSON.parse(data) : null);
      }
      const freshData = await cb();
      redisClient.setex(key, CACHE_DURATION, JSON.stringify(freshData));
      console.log("Data from DB");

      resolve(freshData);
    });
  });
}
