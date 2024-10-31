import * as dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const url = `mongodb+srv://letrogood:${process.env.DB_PASS}@cluster0.a8zpf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// const options = { useNewUrlParser: true };
const connectDB = new MongoClient(url).connect();

export { connectDB };
