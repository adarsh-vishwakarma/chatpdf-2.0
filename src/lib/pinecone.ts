import { Pinecone, PineconeRecord } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./s3-server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export const getPineconeClient = () => {
  if (!process.env.PINECONE_API_KEY) {
    throw new Error("Pinecone API key is missing");
  }
  return new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });
};

export async function loadS3IntoPinecone(fileKey: string) {
  console.log("Downloading file from S3...");
  const file_name = await downloadFromS3(fileKey);
  if (!file_name) {
    throw new Error("Could not download the file from S3");
  }

  console.log(`Loading PDF content from ${file_name}`);
  const loader = new PDFLoader(file_name);
  const pages = await loader.load()
  return pages;
}
