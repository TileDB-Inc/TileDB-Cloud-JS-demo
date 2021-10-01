import * as React from "react";
import { Typography, Divider } from "antd";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialOceanic } from "react-syntax-highlighter/dist/esm/styles/prism";
import BoulderForm from "./BoulderForm";

const { Title, Paragraph } = Typography;

const markdown = `
const { TileDBQuery } = require("@tiledb-inc/tiledb-cloud");


const tiledbQuery = new TileDBQuery({
    apiKey: ''
});

const ranges = [
    [475425,475450], [], []
]

const query = {
    layout: "row-major",
    ranges: ranges,
    bufferSize: 15000000000000,
};

(async function() {
  // Iterate over all results in case query is incomplete
  for await (let results of tiledbQuery.ReadQuery("TileDB-Inc", "boulder", query)) {
      console.log(results);
  }
})();

`;

const Boulder = () => {
  return (
    <>
      <Typography>
        <Title>Boulder</Title>
        <Title level={4}>Example code</Title>
        <Paragraph>Point cloud data from <a href="https://www.pixel8.earth/" rel="noreferrer" target="_blank">https://www.pixel8.earth/</a> licensed as CC by 2.0</Paragraph>
      </Typography>
      <SyntaxHighlighter language="javascript" style={materialOceanic}>
        {markdown}
      </SyntaxHighlighter>
      <Divider />
      <BoulderForm />
    </>
  );
};

export default Boulder;
