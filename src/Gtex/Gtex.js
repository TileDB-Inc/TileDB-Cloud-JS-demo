import * as React from "react";
import { Typography, Divider } from "antd";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialOceanic } from "react-syntax-highlighter/dist/esm/styles/prism";
import GtexForm from "./GtexForm";


const { Title, Paragraph } = Typography;

const markdown = `
const { TileDBQuery } = require("@tiledb-inc/tiledb-cloud");

const tiledbQuery = new TileDBQuery({
    apiKey: ''
});

const ranges = [
    ["ENSG00000202059.1", "ENSG00000202059.1"],
    []
]

const query = {
    layout: "row-major",
    ranges: ranges,
    bufferSize: 150000000,
};

(async function() {
  // Iterate over all results in case query is incomplete
  for await (let results of tiledbQuery.ReadQuery("kostas", "gtex-analysis-rnaseqc-gene-tpm", query)) {
      console.log(results);
  }
})();
`;

const Gtex = () => {
  return (
    <>
      <Typography>
        <Title>GTEx</Title>
        <Paragraph>
          <b>Store RNA-seq data generated by the Genotype-Tissue Expression (GTEx)
          project</b>
        </Paragraph>
        <Paragraph>
          • Original format: 56,200 gene × 17,382 sample matrix <br/>
          • Array: 2D sparse array with dimensions for gene_id and sample names <br/>
        </Paragraph>
        <Title level={4}>Example code</Title>
      </Typography>
      <SyntaxHighlighter language="javascript" style={materialOceanic}>
        {markdown}
      </SyntaxHighlighter>
      <Divider />
      <GtexForm />
    </>
  );
};

export default Gtex;
