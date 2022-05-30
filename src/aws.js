const { S3, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");

const REGION = "us-west-1";

const s3Client = new S3({
  region: REGION,
});

const downloadBucketParams = {
  Bucket: "csv-amplifys3uploader112948-dev",
  Key: "json/average_selling_price.json",
};

// fileKey: "KEY.json"
exports.download = async (fileKey) => {
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
const uploadBucketParams = {
  Bucket: "csv-amplifys3uploader112948-dev",
  // Specify the name of the new object. For example, 'index.html'.
  // To create a directory for the object, use '/'. For example, 'myApp/package.json'.
  Key: "json/average_selling_price.json",
  // Content of the new object.
  Body: "[\"Hello world\"]",
};

// Create and upload the object to the S3 bucket.
exports.upload = async () => {
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
