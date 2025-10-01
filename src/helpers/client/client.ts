import Client from "@tiledb-inc/tiledb-cloud";
import process from "process";

const client = new Client({
  apiKey: process.env.REACT_APP_API_KEY_PROD,
  basePath: "https://api.qa.tiledb.io"
});

export default client;
