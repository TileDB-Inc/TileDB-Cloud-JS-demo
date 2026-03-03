import Client from "@tiledb-inc/tiledb-cloud";

const client = new Client({
  apiKey: import.meta.env.VITE_API_KEY,
  basePath: import.meta.env.VITE_API_BASE_PATH || "https://api.tiledb.com",
});

export default client;
