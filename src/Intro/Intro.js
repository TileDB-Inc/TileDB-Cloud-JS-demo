import { Divider, Typography } from "antd";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialOceanic } from "react-syntax-highlighter/dist/esm/styles/prism";
import { basic, basic_write, multi_range, whole_dim, write_nullable, write_subarray } from "./data";

const { Title, Paragraph } = Typography;

const Intro = () => {
  return (
    <div>
      <Title>Introduction</Title>
      <Paragraph>TileDB-Cloud-JS supports TileDB queries, by serializing data to capnproto.</Paragraph>
      <Title level={3}>Basic read query</Title>
      <Paragraph>Dimensions should always be an array of 2 (start of the range and the end of the range). bufferSize dictates the server the number of bytes that should allocated to make this query.</Paragraph>
      <SyntaxHighlighter language="javascript" style={materialOceanic}>
        {basic}
      </SyntaxHighlighter>
      <Divider />
      <Title level={3}>Multi range read queries</Title>
      <Paragraph>A dimension could be an array of ranges as well</Paragraph>
      <SyntaxHighlighter language="javascript" style={materialOceanic}>
        {multi_range}
      </SyntaxHighlighter>
      <Divider />

      <Title level={3}>Selecting whole dimension</Title>
      <Paragraph>By setting a dimension as an empty array, query will select the whole dimension.</Paragraph>
      <SyntaxHighlighter language="javascript" style={materialOceanic}>
        {whole_dim}
      </SyntaxHighlighter>
      <Divider />
      <Title level={2}>Write queries</Title>
      <Title level={3}>Specifying dimensions as coordinates</Title>
      <Paragraph>For write queries user should provide an object with the attribute values and the coordinates of the cells (rows and cols in the object below). In this case we are writing to cells [1, 1] up to [1, 3].</Paragraph>
      <SyntaxHighlighter language="javascript" style={materialOceanic}>
        {basic_write}
      </SyntaxHighlighter>
      <Divider />

      <Title level={3}>Dense writes with subarray</Title>
      <Paragraph>For Dense arrays we can provide a subarray instead of the coordinates and set the order (e.g. layout set to row-major).</Paragraph>
      <SyntaxHighlighter language="javascript" style={materialOceanic}>
        {write_subarray}
      </SyntaxHighlighter>
      <Divider />

      <Title level={3}>Write queries with nullables and var-length attributes</Title>
      <Paragraph>For nullables and var-length attributes user should provide validity attribute and/or the offsets.</Paragraph>
      <SyntaxHighlighter language="javascript" style={materialOceanic}>
        {write_nullable}
      </SyntaxHighlighter>
    </div>
  );
};

export default Intro;