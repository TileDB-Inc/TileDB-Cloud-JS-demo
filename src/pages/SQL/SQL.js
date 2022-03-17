import { Divider, Typography } from "antd";
import React from "react";
import CodeSnippet from "../../components/CodeSnippet/CodeSnippet";

const { Title, Paragraph } = Typography;

const SQL = () => {
  return (
    <div>
      <Title>Serverless SQL</Title>
      <Paragraph>
        SQL queries can be executed with the TileDB Cloud client as follows.
      </Paragraph>
      <Title level={3}>Basic Usage</Title>
      <CodeSnippet>
        {`import Client from "@tiledb-inc/tiledb-cloud";

const client = new Client({
    apiKey: ''
});

const result = await client.sql.exec("my_namespace", "select SUM(\`a\`) as a FROM \`tiledb://TileDB-Inc/quickstart_dense\`");`}
      </CodeSnippet>
      <Divider />
      <Paragraph>
        Supposing that there is an array <pre style={{display: 'inline'}}>tiledb://user/array_name</pre> that you have
        write permissions for, you can run a SQL query that writes the results
        to that array as follows:
      </Paragraph>
      <CodeSnippet>
        {`import Client from "@tiledb-inc/tiledb-cloud";

const client = new Client({
    apiKey: ''
});

const result = await client.sql.exec("my_namespace",
    "select \`rows\`, AVG(a) as avg_a from \`tiledb://TileDB-Inc/quickstart_dense\` GROUP BY \`rows\`",
    { output_uri: "tiledb://user/array_name"}
  );`}
      </CodeSnippet>
    </div>
  );
};

export default SQL;
