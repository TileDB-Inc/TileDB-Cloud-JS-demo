import React from "react";
import { Form, InputNumber, Button, Table, Typography } from "antd";
import { TileDBQuery } from "@tiledb-inc/tiledb-cloud";
import LidarVis from "../components/LidarVis";

const tiledbQuery = new TileDBQuery({
  apiKey: process.env.REACT_APP_API_KEY_PROD,
});

const columns = [
  {
    title: "X",
    dataIndex: "X",
    key: "X",
  },
  {
    title: "Y",
    dataIndex: "Y",
    key: "Y",
  },
  {
    title: "Z",
    dataIndex: "Z",
    key: "Z",
  },
  {
    title: "Blue",
    dataIndex: "Blue",
    key: "Blue",
  },
  {
    title: "Classification",
    dataIndex: "Classification",
    key: "Classification",
  },
  {
    title: "EdgeOfFlightLine",
    dataIndex: "EdgeOfFlightLine",
    key: "EdgeOfFlightLine",
  },
  {
    title: "GpsTime",
    dataIndex: "GpsTime",
    key: "GpsTime",
  },
  {
    title: "Green",
    dataIndex: "Green",
    key: "Green",
  },
  {
    title: "Intensity",
    dataIndex: "Intensity",
    key: "Intensity",
  },
  {
    title: "NumberOfReturns",
    dataIndex: "NumberOfReturns",
    key: "NumberOfReturns",
  },
  {
    title: "PointSourceId",
    dataIndex: "PointSourceId",
    key: "PointSourceId",
  },
  {
    title: "Red",
    dataIndex: "Red",
    key: "Red",
  },
  {
    title: "ReturnNumber",
    dataIndex: "ReturnNumber",
    key: "ReturnNumber",
  },
  {
    title: "ScanAngleRank",
    dataIndex: "ScanAngleRank",
    key: "ScanAngleRank",
  },
  {
    title: "ScanDirectionFlag",
    dataIndex: "ScanDirectionFlag",
    key: "ScanDirectionFlag",
  },
  {
    title: "UserData",
    dataIndex: "UserData",
    key: "UserData",
  },
];
const AutzenForm = () => {
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    // Reset results
    setResults([]);
    const ranges = [
      [values.X_start, values.X_end].filter(Boolean),
      [values.Y_start, values.Y_end].filter(Boolean),
      [values.Z_start, values.Z_end].filter(Boolean),
    ];

    const query = {
      layout: "row-major",
      ranges: ranges,
      bufferSize: values.bufferSize,
    };
    setLoading(true);

    for await (let results of tiledbQuery.ReadQuery(
      "TileDB-Inc",
      "autzen_tiledb",
      query
    )) {
      // In case the results are null
      if (!Array.isArray(results.Blue)) {
        continue;
      }
      const result = results.Blue.map((t, i) => ({
        Blue: t,
        UserData: results.UserData[i],
        ScanDirectionFlag: results.ScanDirectionFlag[i],
        ScanAngleRank: results.ScanAngleRank[i],
        ReturnNumber: results.ReturnNumber[i],
        Red: results.Red[i],
        PointSourceId: results.PointSourceId[i],
        NumberOfReturns: results.NumberOfReturns[i],
        Intensity: results.Intensity[i],
        Green: results.Green[i],
        GpsTime: results.GpsTime[i],
        EdgeOfFlightLine: results.EdgeOfFlightLine[i],
        Classification: results.Classification[i],
        X: results.X[i],
        Y: results.Y[i],
        Z: results.Z[i],
        key: i,
      }));
      console.log(result);
      setResults((res) => res.concat(result));
    }

    setLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      {!!results.length && <LidarVis data={results} />}
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 24 }}
        style={{ marginTop: "32px" }}
        initialValues={{
          X_start: 636800,
          X_end: 637800,
          Y_start: 851000,
          Y_end: 853000,
          Z_start: 406.14,
          Z_end: 615.26,
          bufferSize: 15000000,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="Buffer size" name="bufferSize">
          <InputNumber />
        </Form.Item>
        <Form.Item label="X Start" name="X_start">
          <InputNumber />
        </Form.Item>

        <Form.Item label="X End" name="X_end">
          <InputNumber />
        </Form.Item>

        <Form.Item label="Y Start" name="Y_start">
          <InputNumber />
        </Form.Item>

        <Form.Item label="Y End" name="Y_end">
          <InputNumber />
        </Form.Item>

        <Form.Item label="Z Start" name="Z_start">
          <InputNumber />
        </Form.Item>

        <Form.Item label="Z End" name="Z_end">
          <InputNumber />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
          <Button
            style={{ marginRight: "15px" }}
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
      {!!results.length && (
        <Typography.Title level={5}>
          Showing {results.length} results
        </Typography.Title>
      )}
      <Table
        scroll={{ x: 140 }}
        dataSource={results.slice(0, 500)}
        columns={columns}
      />
    </>
  );
};

export default AutzenForm;
