import Redis from "ioredis";

const redisClient = new Redis({
  host: "localhost",
  port: 6379,
  retryStrategy: (times) => {
    return Math.min(times * 50, 2000);
  },
});

redisClient.on("connect", () => {
  console.log("Redis Client Connected");
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

export { redisClient };
