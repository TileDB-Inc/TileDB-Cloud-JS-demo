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
const BoulderForm = () => {
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [timelineItems, setTimelineItems] = React.useState([]);
  const stop = React.useRef(false);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    stop.current = false;
    setResults([]);
    setTimelineItems([]);
    const ranges = [values.X, values.Y || [], values.Z || []];
    const query = {
      layout: "unordered",
      ranges: ranges,
      bufferSize: values.bufferSize,
    };
    setLoading(true);

    for await (let results of client.query.ReadQuery(
      "TileDB-Inc",
      "boulder",
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
      const result = results.Blue.map((t, i) => {
        return ({
          Blue: t / 65535,
          UserData: results.UserData[i],
          ScanDirectionFlag: results.ScanDirectionFlag[i],
          ScanAngleRank: results.ScanAngleRank[i],
          ReturnNumber: results.ReturnNumber[i],
          Red: results.Red[i] / 65535,
          PointSourceId: results.PointSourceId[i],
          NumberOfReturns: results.NumberOfReturns[i],
          Intensity: results.Intensity[i],
          Green: results.Green[i] / 65535,
          GpsTime: results.GpsTime[i],
          EdgeOfFlightLine: results.EdgeOfFlightLine[i],
          Classification: results.Classification[i],
          X: results.X[i],
          Y: results.Y[i],
          Z: results.Z[i],
          key: i,
        })
      });
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
    setTimelineItems([]);
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
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          initialValues={{
            X: [475425, 475450],
            bufferSize: 2000000,
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
            <Slider range min={400000} max={800000} />
          </Form.Item>

          <Form.Item
            label="Y"
            tooltip="Will select whole dimension if not set"
            name="Y"
          >
            <Slider range min={0} max={1000000} />
          </Form.Item>

          <Form.Item
            label="Z"
            tooltip="Will select whole dimension if not set"
            name="Z"
          >
            <Slider range min={0} max={1000000} />
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
              style={{ marginRight: "15px" }}
              htmlType="button"
              size="large"
              onClick={onReset}
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

export default BoulderForm;
