import Client from "@tiledb-inc/tiledb-cloud";

const client = new Client({
  apiKey: process.env.REACT_APP_API_KEY_PROD,
});

export default client;
