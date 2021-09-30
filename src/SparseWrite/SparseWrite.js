import React from "react";
import {
  Typography,
  Divider,
  Button,
  message,
  Modal,
  Form,
  InputNumber,
  Spin,
} from "antd";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialOceanic } from "react-syntax-highlighter/dist/esm/styles/prism";
import Cube from "../components/Cube";
import { TileDBQuery } from "@tiledb-inc/tiledb-cloud";

const { Title } = Typography;

const QueryHelper = new TileDBQuery({
  apiKey: process.env.REACT_APP_API_KEY,
  basePath: "https://api.dev.tiledb.io/v2",
});

const markdown = `
const { TileDBQuery } = require("@tiledb-inc/tiledb-cloud");

const QueryHelper = new TileDBQuery({
    apiKey: ''
});

const query = {
    layout: "unordered",
    values: {
        a: {
            values: [1, 2, 3]
        },
        rows: {
            values: [1, 2, 2]
        },
        cols: {
            values: [1, 4, 3]
        },
    }
  }
  
QueryHelper.WriteQuery("kostas", "quickstart_sparse_array", query)
.then((res) => {
    console.log(res)
})
.catch((e) => {
    console.error(e);
});
`;

const SparseWrite = () => {
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [writeloading, setWriteLoading] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [SelectedCellData, setSelectedCellData] = React.useState({
    x: -1,
    y: -1,
    cellData: undefined,
  });

  const showModal = (x, y, cellData) => {
    setSelectedCellData({ x, y, cellData });
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getArray = () => {
    const query = {
      layout: "row-major",
      ranges: [
        [1, 4],
        [1, 4],
      ],
      bufferSize: 150000,
    };
    setLoading(true);

    const generator = QueryHelper.ReadQuery(
      "kostas",
      "quickstart_sparse_array",
      query
    );
    generator
      .next()
      .then(({ value }) => {
        console.log(value);
        setData(value);
      })
      .catch((e) => {
        message.error(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onFinish = (values) => {
    const query = {
      layout: "unordered",
      values: {
        a: {
          values: [values.a],
        },
        rows: {
          values: [SelectedCellData.y],
        },
        cols: {
          values: [SelectedCellData.x],
        },
      },
    };
    setWriteLoading(true);
    QueryHelper.WriteQuery("kostas", "quickstart_sparse_array", query)
      .then((res) => {
        getArray();
        handleOk();
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setWriteLoading(false);
      });
  };
  return (
    <div>
      <Title>Sparse array write</Title>
      <Title level={4}>Example code</Title>
      <SyntaxHighlighter language="javascript" style={materialOceanic}>
        {markdown}
      </SyntaxHighlighter>
      <Divider />
      <Button
        style={{ marginBottom: "20px" }}
        onClick={getArray}
        loading={loading}
      >
        Get array data
      </Button>
      {!!Object.keys(data).length && (
        <Spin spinning={loading} tip="Loading...">
          <Cube
            dimensions={4}
            data={data}
            dimensionNames={["rows", "cols"]}
            onClick={showModal}
          />
        </Spin>
      )}
      <Modal
        footer={[
          <Button
            form="cell-form"
            key="submit"
            htmlType="submit"
            loading={writeloading}
          >
            Submit
          </Button>,
        ]}
        title={`Cell colls: ${SelectedCellData.x} rows: ${SelectedCellData.y}`}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <Form
          id="cell-form"
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 32 }}
          style={{ marginTop: "32px" }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="Attribute a" name="a">
            <InputNumber style={{ width: 200 }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SparseWrite;
