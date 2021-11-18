import { Divider, Typography } from "antd";
import React from "react";
import CodeSnippet from "../components/CodeSnippet/CodeSnippet";
import {
  basic,
  basic_write,
  multi_range,
  whole_dim,
  write_nullable,
  write_subarray,
} from "./data";

const { Title, Paragraph } = Typography;

const Intro = () => {
  return (
    <div>
      <Title>Introduction</Title>
      <Paragraph>
        TileDB-Cloud-JS supports TileDB queries, by serializing data to
        capnproto.
      </Paragraph>
      <Title level={3}>Basic read query</Title>
      <Paragraph>
        Dimensions should always be an array of 2 (start of the range and the
        end of the range). <b>bufferSize</b> dictates the server the number of
        bytes that should allocated to make this query. In case the bufferSize
        is not enough, it will result to an incomplete query. For this reason
        ReadQuery is an async generator so a user could get results in batches.
      </Paragraph>
      <CodeSnippet>{basic}</CodeSnippet>

      <Divider />
      <Title level={3}>Multi range read queries</Title>
      <Paragraph>A dimension could be an array of ranges as well</Paragraph>
      <CodeSnippet>{multi_range}</CodeSnippet>
      <Divider />

      <Title level={3}>Selecting whole dimension</Title>
      <Paragraph>
        By setting a dimension as an empty array, query will select the whole
        dimension.
      </Paragraph>
      <CodeSnippet>{whole_dim}</CodeSnippet>
      <Divider />
      <Title level={2}>Write queries</Title>
      <Title level={3}>Specifying dimensions as coordinates</Title>
      <Paragraph>
        For write queries user should provide an object with the attribute
        values and the coordinates of the cells (rows and cols in the object
        below). In this case we are writing to cells [1, 1] up to [1, 3].
      </Paragraph>
      <CodeSnippet>{basic_write}</CodeSnippet>
      <Divider />

      <Title level={3}>Dense writes with subarray</Title>
      <Paragraph>
        For Dense arrays we can provide a subarray instead of the coordinates
        and set the order (e.g. layout set to row-major).
      </Paragraph>
      <CodeSnippet>{write_subarray}</CodeSnippet>
      <Divider />

      <Title level={3}>
        Write queries with nullables and var-length attributes
      </Title>
      <Paragraph>
        For nullables and var-length attributes user should provide validity
        attribute and/or the offsets.
      </Paragraph>
      <CodeSnippet>{write_nullable}</CodeSnippet>
    </div>
  );
};

export default Intro;
