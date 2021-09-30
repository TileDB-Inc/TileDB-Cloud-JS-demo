import * as React from "react";
import { Typography, Divider } from "antd";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialOceanic } from "react-syntax-highlighter/dist/esm/styles/prism";
import AutzenForm from "./AutzenForm";


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
  for await (let results of tiledbQuery.ReadQuery("norman", "autzen_tiledb", query)) {
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
      <SyntaxHighlighter language="javascript" style={materialOceanic}>
        {markdown}
      </SyntaxHighlighter>
      <Divider />
      <AutzenForm />
    </>
  );
};

export default Autzen;
