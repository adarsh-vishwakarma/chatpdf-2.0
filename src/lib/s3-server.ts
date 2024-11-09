import AWS from "aws-sdk";
import fs from "fs/promises";
import path from "path";
import os from "os"; // Import os module to get temp directory

// Function to download a file from S3
export async function downloadFromS3(file_key: string) {
  try {
    AWS.config.update({
      accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
    });

    console.log("Access Key: ", process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID);
    console.log("Bucket Name: ", process.env.NEXT_PUBLIC_S3_BUCKET_NAME);

    const s3 = new AWS.S3({
      region: "eu-north-1",
    });

    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: file_key,
    };

    // Fetch the object from S3
    const obj = await s3.getObject(params).promise();

    const tmpDir = path.join(__dirname, "tmp"); // Use a directory within your project
    await fs.mkdir(tmpDir, { recursive: true }); // Create the directory if it doesn't exist
    const file_name = path.join(tmpDir, `pdf-${Date.now()}.pdf`); 

    await fs.writeFile(file_name, obj.Body as Buffer);

    console.log("File downloaded successfully:", file_name);
    return file_name; // Return the path of the downloaded file
  } catch (error) {
    console.error("Error downloading from S3:", error);
    return null; // Return null in case of error
  }
}
