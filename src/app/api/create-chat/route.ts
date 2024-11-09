import { messages } from "@/lib/db/schema";
import { loadS3IntoPinecone } from "@/lib/pinecone";
import { NextResponse } from "next/server";

// /api/create-chat
export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { file_key, file_name } = body;
    const pages = await loadS3IntoPinecone(file_key)
    console.log("****", file_key, file_name);
    return NextResponse.json({ pages });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
