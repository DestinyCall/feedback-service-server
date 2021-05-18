const env = process.env.NODE_ENV || "development";

if (env === "development") {
  process.env.PORT = 9001;
  process.env.MONGODB_URI = "mongodb://localhost:27017/service-feedback-db";
}
console.log(`Server is running in ${env} mode!`);
