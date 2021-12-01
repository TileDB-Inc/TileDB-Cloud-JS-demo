import React, { useEffect } from "react";
import { Typography } from "antd";
import Client from "@tiledb-inc/tiledb-cloud";
import CodeSnippet from "../../components/CodeSnippet";

const tiledbQuery = new Client({
  apiKey: process.env.REACT_APP_API_KEY_PROD,
});

const { Title, Paragraph } = Typography;
const fileSize = 619181;

const query = {
  layout: "row-major",
  ranges: [[0, fileSize]],
  bufferSize: 5355910,
};

const markdown = `
import Client from "@tiledb-inc/tiledb-cloud";


const client = new Client({
    apiKey: ''
});
// We can get the file size from the array metadata
const fileSize = 615039

const ranges = [
    [0, fileSize]
]

const query = {
    layout: "row-major",
    ranges: ranges,
    bufferSize: 15000000000000,
};

const contents = []

(async function() {
  // Iterate over all results in case query is incomplete
  for await (let results of client.query.ReadQuery("TileDB-Inc", "autzen_tiledb", query)) {
      contents.push(results.contents);
  }
  // Create a buffer from the contents (Array of uint8)
  const buffer = Uint8Array.from(contents).buffer;
  saveBufferAsFile(buffer, 'document.pdf');
})();
`;

const Files = () => {
  const [contents, setContents] = React.useState([]);
  const [dataPdf, setPdfData] = React.useState("");

  React.useEffect(() => {
    async function fetchData() {
      for await (let results of tiledbQuery.query.ReadQuery(
        "TileDB-Inc",
        "VLDB17_TileDB",
        query
      )) {
        setContents((c) => {
          return c.concat(results.contents || []);
        });
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (contents.length >= fileSize) {
      const buffer = Uint8Array.from(contents).buffer;
      const blob = new Blob([buffer], { type: "application/pdf" });
      const pdfurl = window.URL.createObjectURL(blob) + "#view=FitW";

      setPdfData(pdfurl);
    }
  }, [contents]);

  return (
    <>
      <Typography>
        <Title>Files</Title>
        <Paragraph>
          Since files are stored as TileDB arrays, we can query the array get
          the contents and show/download the file. Furthermore{" "}
          <b>@tiledb-inc/tiledb-cloud</b> provides a convenient method{" "}
          <b>downloadFile</b> to download files locally.
        </Paragraph>
        <Title level={4}>Example code</Title>
        <CodeSnippet>{markdown}</CodeSnippet>
        <br />
        {dataPdf && (
          <object
            id="pdfviewer"
            data={dataPdf}
            type="application/pdf"
            style={{ width: "500px", height: "670px" }}
            aria-label="pdf viewer"
          ></object>
        )}
      </Typography>
    </>
  );
};

export default Files;
