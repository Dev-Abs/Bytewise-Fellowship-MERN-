const express = require("express");
const colors = require("colors");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;
const app = express();

connectDB();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === "development"
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
