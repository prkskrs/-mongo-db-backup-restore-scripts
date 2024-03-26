const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

// connection string to your MongoDB cluster
const connectionString =
  "your-mongo-srv-connection-string-here";

// fn to get file paths in a directory
async function getBsonFilePaths(directory) {
  return await new Promise((resolve, reject) => {
    fs.readdir(directory, (err, files) => {
      if (err) {
        reject(err);
        return;
      }
      const bsonFiles = files.filter((file) => file.endsWith(".bson"));
      const filePaths = bsonFiles.map((file) => path.join(directory, file));
      console.log(filePaths);
      resolve(filePaths);
    });
  });
}

// import function with database name and array of BSON file paths parameters
function importDatabase(databaseName, bsonFilePaths) {
  if (!Array.isArray(bsonFilePaths)) {
    return Promise.reject(new Error("bsonFilePaths must be an array"));
  }

  const importPromises = bsonFilePaths.map((bsonFilePath) => {
    return new Promise((resolve, reject) => {
      exec(
        `mongorestore --uri="${connectionString}" --db="${databaseName}" "${bsonFilePath}"`,
        (error, stdout, stderr) => {
          if (error) {
            reject(error);
            return;
          }
          resolve();
        }
      );
    });
  });

  return Promise.all(importPromises);
}

const databaseToRestore = "connectAppDBRestored";
const bsonDirectory = "./dump/connectAppDBDev";

async function callRestore() {
  const bsonFilePaths = await getBsonFilePaths(bsonDirectory);
  console.log(bsonFilePaths);
  // importing the database after exporting
  return await importDatabase(databaseToRestore, bsonFilePaths);
}

// call the restore function
callRestore()
  .then(() => {
    console.log("Database imported successfully with newDb name");
  })
  .catch((error) => {
    console.error("Error:", error);
  });
