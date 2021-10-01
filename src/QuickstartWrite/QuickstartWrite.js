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
import { TileDBQuery, v1 } from "@tiledb-inc/tiledb-cloud";

const { Title, Paragraph } = Typography;

const config = {
  apiKey: process.env.REACT_APP_API_KEY_PROD,
}

const QueryHelper = new TileDBQuery(config);
const arrayAPI = new v1.ArrayApi(config);

const markdown = `
const { TileDBQuery } = require("@tiledb-inc/tiledb-cloud");

const tiledbQueries = new TileDBQuery({
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
  
tiledbQueries.WriteQuery("TileDB", "quickstart_sparse_array", query)
.then((res) => {
    console.log(res)
})
.catch((e) => {
    console.error(e);
});
`;

const QuickstartWrite = () => {
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [writeloading, setWriteLoading] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [SelectedCellData, setSelectedCellData] = React.useState({
    x: -1,
    y: -1,
    cellData: undefined,
  });
  const [dimensions, setDimensions] = React.useState([]);
  const [attributes, setAttributes] = React.useState([]);
  // const [queryString, setQueryString] = React.useState('');
  const quickStartArray = process.env.REACT_APP_QUICKSTART_ARRAY || '';
  const [namespace, arrayName] = quickStartArray.split("/");

  React.useEffect(() => {
    if (!quickStartArray) {
      message.error(
        "Environmental variable REACT_APP_QUICKSTART_ARRAY is needed for this example to work"
      );
    } else {
      // Get arraySchema
      arrayAPI.getArray(namespace, arrayName, 'application/json').then((res) => {
        const dimensionNames = res.data.domain.dimensions.map((dim) => dim.name);
        const attributeNames = res.data.attributes.map((attr) => attr.name);
        setDimensions(dimensionNames);
        setAttributes(attributeNames);
      })
    }
  }, [quickStartArray, arrayName, namespace]);

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

    const generator = QueryHelper.ReadQuery(namespace, arrayName, query);
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
        [dimensions[0]]: {
          values: [SelectedCellData.y],
        },
        [dimensions[1]]: {
          values: [SelectedCellData.x],
        },
      },
    };

    Object.entries(values).forEach(([key, val]) => {
      query.values[key] = {};
      query.values[key].values = [val];
    });

    setWriteLoading(true);
    QueryHelper.WriteQuery(namespace, arrayName, query)
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
      <Paragraph>Press the "Get array data" button to see your array as an interactive cube.<br/>You can edit any of the cells by clicking on them and assigning a new value.</Paragraph>
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
            dimensionNames={dimensions}
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
          key={`${SelectedCellData.x}+${SelectedCellData.y}`}
        >
          {attributes.map((attr) => (
            <Form.Item label={`Attribute ${attr}`} name={attr}>
              <InputNumber style={{ width: 200 }} />
            </Form.Item>
          ))}
        </Form>
      </Modal>
    </div>
  );
};

export default QuickstartWrite;