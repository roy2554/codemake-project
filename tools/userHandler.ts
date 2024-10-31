import { connectDB } from "./database";
import { v4 as uuidv4 } from "uuid";

export async function isExistUser(email: string) {
  const client = await connectDB;
  const db = client.db("blog");

  const result = await db.collection("users").findOne({
    email,
  });

  if (result) {
    return true;
  } else {
    return false;
  }
}

export async function getUser(email: string) {
  const client = await connectDB;
  const db = client.db("blog");

  const result = await db.collection("users").findOne({
    email,
  });

  return result;
}

export async function createUser(email: string, name: string) {
  const client = await connectDB;
  const db = client.db("blog");

  const result = await db.collection("users").insertOne({
    id: uuidv4(),
    name,
    email,
    permission: 1,
  });

  if (result) {
    return true;
  } else {
    return false;
  }
}
