import { S3, GetObjectCommand } from "@aws-sdk/client-s3";

const REGION = "us-east-1";

export const s3Client = new S3({
  region: REGION,
});

export const bucketParams = {
  Bucket: "BUCKET_NAME",
  Key: "KEY",
};

// fileKey: "KEY.json"
export const download = async (fileKey) => {
  try {
    // Create a helper function to convert a ReadableStream to a string.
    const streamToString = (stream) =>
      new Promise((resolve, reject) => {
        const chunks = [];
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("error", reject);
        stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
      });

    // Get the object} from the Amazon S3 bucket. It is returned as a ReadableStream.
    const data = await s3Client.send(new GetObjectCommand({
      ...bucketParams,
      Key: fileKey,
    }));
    // return data; // For unit tests.

    // Convert the ReadableStream to a string.
    const bodyContents = await streamToString(data.Body);
    console.log(bodyContents);
    return bodyContents;
  } catch (err) {
    console.log("Error", err);
  }
};
