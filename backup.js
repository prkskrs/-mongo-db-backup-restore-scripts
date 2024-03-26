const { exec } = require("child_process");

// connection string to your MongoDB cluster
const connectionString =
  "your-mongo-srv-connection-string-here";

// database name to export and import
const dbName = "your-database-name-here";

// export function
function exportDatabase() {
  return new Promise((resolve, reject) => {
    exec(
      `mongodump --uri="${connectionString}" --db=${dbName}`,
      (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      }
    );
  });
}

// export the database
exportDatabase()
  .then( () => {
    console.log("Database exported successfully");
    return "success";
  })
  .catch((error) => {
    console.error("Error:", error);
  });
