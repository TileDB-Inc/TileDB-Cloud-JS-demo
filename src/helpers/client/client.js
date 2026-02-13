import TileDBClient from "@tiledb-inc/tiledb-cloud";

const client = new TileDBClient({
  apiKey: process.env.REACT_APP_API_KEY_PROD,
  basePath: "https://api.qa.tiledb.io/",
});

export default client;
