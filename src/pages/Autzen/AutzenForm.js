import React from "react";
import { Form, InputNumber, Button, Table, Typography, Slider } from "antd";
import LidarVis from "../../components/LidarVis";
import Timeline from "../../components/Timeline/Timeline";
import client from '../../helpers/client';

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
  const [timelineItems, setTimelineItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const stop = React.useRef(false);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    // Reset results
    stop.current = false;
    setTimelineItems([]);
    setResults([]);
    const ranges = [values.X, values.Y, values.Z];

    const query = {
      layout: "row-major",
      ranges: ranges,
      bufferSize: values.bufferSize,
    };
    setLoading(true);

    for await (let results of client.query.ReadQuery(
      "TileDB-Inc",
      "autzen_tiledb",
      query
    )) {
      if (stop.current) {
        setTimelineItems((items) => {
          return items.concat({
            type: "stopping",
            text: `Stopped`,
          });
        });
        break;
      }
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
      setResults((res) => res.concat(result));
      setTimelineItems((items) => {
        return items.concat({
          type: "success",
          text: `Fetched ${result.length} results`,
        });
      });
    }
    if (!stop.current) {
      setTimelineItems((items) => {
        return items.concat({
          type: "completed",
          text: `Finished`,
        });
      });
    }
    setLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onStop = () => {
    stop.current = true;
  };

  return (
    <>
      {!!results.length && <LidarVis data={results} />}
      <div className="Form-wrapper">
        <Form
          form={form}
          name="basic"
          layout="vertical"
          labelCol={{ span: 14 }}
          wrapperCol={{ span: 24 }}
          style={{ marginTop: "32px" }}
          initialValues={{
            X: [636800, 637800],
            Y: [851000, 853000],
            Z: [406.14, 615.26],
            bufferSize: 15000000,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            tooltip="Buffer size allocated to the server for the query"
            label="Buffer size"
            name="bufferSize"
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="X" name="X">
            <Slider range min={500000} max={1000000} />
          </Form.Item>
          <Form.Item label="Y" name="Y">
            <Slider range min={500000} max={1000000} />
          </Form.Item>
          <Form.Item label="Z" name="Z">
            <Slider range min={200} max={800} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
            <Button
              style={{ marginRight: "15px" }}
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
            >
              Submit
            </Button>
            <Button
              htmlType="button"
              size="large"
              onClick={onReset}
              style={{ marginRight: "15px" }}
            >
              Reset
            </Button>
            {loading && (
              <Button htmlType="button" size="large" danger onClick={onStop}>
                Stop
              </Button>
            )}
          </Form.Item>
        </Form>
        <Timeline loading={loading} items={timelineItems} />
      </div>
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
