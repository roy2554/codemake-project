import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/tools/database";
import { v4 as uuidv4 } from "uuid";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  const client = await connectDB;
  const db = client.db("blog");

  const result = await db.collection("posts").findOne({
    postId: id,
  });

  if (result) {
    return NextResponse.json(
      {
        result,
      },
      {
        status: 200,
      }
    );
  } else {
    return NextResponse.json(
      {
        message: "No Post found",
      },
      {
        status: 404,
      }
    );
  }
}

export async function POST(request: Request) {
  const { authorId, title, content } = await request.json();

  const client = await connectDB;
  const db = client.db("posts");

  const result = await db.collection("posts").insertOne({
    postId: uuidv4(),
    authorId,
    title,
    content,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });

  if (result) {
    return NextResponse.json(
      {
        message: "posted successfully",
      },
      {
        status: 200,
      }
    );
  } else {
    return NextResponse.json(
      {
        message: "posted failed",
      },
      {
        status: 500,
      }
    );
  }
}
