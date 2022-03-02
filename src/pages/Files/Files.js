import React from "react";
import { Button, Divider, Typography } from "antd";
import CodeSnippet from "../../components/CodeSnippet";
import { PlayCircleFilled } from "@ant-design/icons";
import client from '../../helpers/client';

const { Title, Paragraph } = Typography;

const markdown = `
import Client from "@tiledb-inc/tiledb-cloud";


const client = new Client({
    apiKey: ''
});

(async function() {
  // Get file contents as ArrayBuffer
  const { buffer, mimeType, originalFileName } = await tiledbQuery.getFileContents(
    "TileDB-Inc",
    "VLDB17_TileDB"
  );
  
  renderMimeType(buffer, mimeType);
})();
`;

const Files = () => {
  const [dataPdf, setPdfData] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const getFile = React.useCallback(() => {
    async function fetchData() {
      setLoading(true);
      const { buffer, mimeType } = await client.getFileContents(
        "TileDB-Inc",
        "VLDB17_TileDB"
      );
      const blob = new Blob([buffer], { type: mimeType });
      const pdfurl = window.URL.createObjectURL(blob) + "#view=FitW";

      setLoading(false);
      setPdfData(pdfurl);
    }

    fetchData();
  }, []);

  return (
    <>
      <Typography>
        <Title>Files</Title>
        <Paragraph>
          Since files (just like TileDB notebooks) are stored as TileDB arrays,
          we can query the array get the contents and show/download the file.
          <b>@tiledb-inc/tiledb-cloud</b> provides a convenient methods{" "}
          <b>downloadFile</b> and <b>getFileContents</b> to download/render
          files locally.
        </Paragraph>
        <Title level={4}>Example code</Title>
        <CodeSnippet>{markdown}</CodeSnippet>
        <Divider />
        <div>
          <Button
            style={{ marginBottom: "20px" }}
            onClick={getFile}
            loading={loading}
            size="large"
            icon={<PlayCircleFilled />}
          >
            Preview pdf
          </Button>
        </div>
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
