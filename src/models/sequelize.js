import { Sequelize } from "sequelize";

// Retrieve necessary environment variables
const { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } = process.env;

// Construct the connection URL
const databaseURL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`;

// Create an instance (an instance is just an object created by a class) of Sequelize
export const sequelize = new Sequelize(databaseURL, {
  define: {
    underscored: true,
  },
  logging: false,
});

try {
  await sequelize.authenticate();
  console.log("📚 Sequelize connected");
} catch (error) {
  console.error("❌ Sequelize can't connect to database");
  console.error(error);
}
