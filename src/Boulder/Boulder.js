import * as React from "react";
import { Typography, Divider } from "antd";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialOceanic } from "react-syntax-highlighter/dist/esm/styles/prism";
import BoulderForm from "./BoulderForm";


const { Title } = Typography;

const markdown = `
const { TileDBQuery } = require("@tiledb-inc/tiledb-cloud");


const QueryHelper = new TileDBQuery({
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

QueryHelper.ReadQuery("TileDB-Inc", "boulder", query)
.then((res) => {
    console.log(res);
})
.catch((e) => {
    console.error(e);
});
`;

const Boulder = () => {
  return (
    <>
      <Typography>
        <Title>Boulder</Title>
        <Title level={4}>Example code</Title>
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
