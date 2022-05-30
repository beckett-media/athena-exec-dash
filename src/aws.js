import { S3, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

const REGION = "us-east-1";

export const s3Client = new S3({
  region: REGION,
});

export const downloadBucketParams = {
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
      ...downloadBucketParams,
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

// Set the parameters.
export const uploadBucketParams = {
  Bucket: "BUCKET_NAME",
  // Specify the name of the new object. For example, 'index.html'.
  // To create a directory for the object, use '/'. For example, 'myApp/package.json'.
  Key: "OBJECT_NAME",
  // Content of the new object.
  Body: "BODY",
};

// Create and upload the object to the S3 bucket.
export const upload = async () => {
  try {
    const data = await s3Client.send(new PutObjectCommand(uploadBucketParams));
    // return data; // For unit tests.
    console.log(
      "Successfully uploaded object: " +
        uploadBucketParams.Bucket +
        "/" +
        uploadBucketParams.Key
    );
  } catch (err) {
    console.log("Error", err);
  }
};
