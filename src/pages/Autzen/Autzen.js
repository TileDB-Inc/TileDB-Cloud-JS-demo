import * as React from "react";
import { Typography, Divider } from "antd";
import AutzenForm from "./AutzenForm";
import CodeSnippet from "../../components/CodeSnippet/CodeSnippet";

const { Title } = Typography;

const markdown = `
const { TileDBQuery } = require("@tiledb-inc/tiledb-cloud");


const tiledbQuery = new TileDBQuery({
    apiKey: ''
});

const ranges = [
    [636800,637800], [851000,853000], [406.14,615.26]
]

const query = {
    layout: "row-major",
    ranges: ranges,
    bufferSize: 15000000000000,
};

(async function() {
  // Iterate over all results in case query is incomplete
  for await (let results of tiledbQuery.ReadQuery("TileDB-Inc", "autzen_tiledb", query)) {
      console.log(results);
  }
})();
`;

const Autzen = () => {
  return (
    <>
      <Typography>
        <Title>Lidar</Title>
        <Title level={4}>Example code</Title>
      </Typography>
      <CodeSnippet>{markdown}</CodeSnippet>
      <Divider />
      <AutzenForm />
    </>
  );
};

export default Autzen;
