import { MongoClient } from "mongodb";

export class Db {

    static url = "mongodb://localhost:27017";

   static async connect() {
      const client = new MongoClient(this.url);
      await client.connect();
      console.log("Connected to MongoDB");
      return client;
   }
}