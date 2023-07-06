const connection = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "test",
  },
});

async function testConnection() {
  try {
    // Execute a raw query to check the connection
    const result = await connection.raw("SELECT 1 + 1 AS solution");
    console.log("Connection successfully");
    console.log("Result:", result[0][0].solution); // Access the result if needed
  } catch (error) {
    console.error("Connection failed:", error);
  } finally {
    // Close the database connection
    connection.destroy();
  }
}

  // testConnection()

module.exports = connection;
