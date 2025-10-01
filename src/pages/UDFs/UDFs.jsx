import { Divider, Typography } from "antd";
import React from "react";
import CodeSnippet from "../../components/CodeSnippet/CodeSnippet";

const { Title, Paragraph } = Typography;

const UDFs = () => {
  return (
    <div>
      <Title>Serverless UDFs</Title>
      <Paragraph>
        TileDB Cloud allows you to run any lambda-like user-defined function
        (UDF).
      </Paragraph>
      <Paragraph>There are two types of supported UDFs:</Paragraph>
      <ul>
        <li>
          <b>Generic</b>: These can include any code.
        </li>
        <li>
          <b>Array UDFs</b>: These are UDFs that are applied to slices of one or
          more arrays.
        </li>
      </ul>
      <Paragraph>
        Running UDFs is particularly useful if you want to perform reductions
        (such as a sum or an average), since the amount of data returned is very
        small regardless of how much data the UDF processes.
      </Paragraph>
      <Title level={3}>Basic Usage</Title>
      <Paragraph>
        Below we show how to execute a TileDB Cloud UDF that takes no arguments.
      </Paragraph>
      <CodeSnippet>
        {`import Client from "@tiledb-inc/tiledb-cloud";

const client = new Client({
    apiKey: ''
});

const result = await client.udf.exec("namespace/udfName");`}
      </CodeSnippet>
      <Divider />

      <Title level={3}>Passing Arguments</Title>
      <Paragraph>
        The UDF can receive any number of arguments, arguments have to be passed
        as an array.
      </Paragraph>
      <CodeSnippet>
        {`import Client from "@tiledb-inc/tiledb-cloud";

const client = new Client({
    apiKey: ''
});

const result = await client.udf.exec("namespace/udfName", [...args]);`}
      </CodeSnippet>
    </div>
  );
};

export default UDFs;
