import React from "react";
import { Form, Input, Button, Table, Typography } from "antd";
import { TileDBQuery } from "@tiledb-inc/tiledb-cloud";

const tiledbQuery = new TileDBQuery({
  apiKey: process.env.REACT_APP_API_KEY_PROD,
});

const columns = [
  {
    title: "Sample",
    dataIndex: "sample",
    key: "sample",
  },
  {
    title: "Gene id",
    dataIndex: "gene_id",
    key: "gene_id",
  },
  {
    title: "Tpm",
    dataIndex: "tpm",
    key: "tpm",
  },
];
const GtexForm = () => {
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm();
  const onFinish = (values) => {
    const ranges = [
      [values.gene_id_start, values.gene_id_end].filter(Boolean),
      [values.sample_start, values.sample_end].filter(Boolean),
    ];

    const query = {
      layout: "row-major",
      ranges: ranges,
      bufferSize: 150000000,
    };
    setLoading(true);

    const generator = tiledbQuery.ReadQuery(
      "TileDB-Inc",
      "gtex-analysis-rnaseqc-gene-tpm",
      query
    );
    generator
      .next()
      .then(({ value: res }) => {
        const result = res.tpm.map((t, i) => ({
          tpm: t,
          sample: res.sample[i],
          gene_id: res.gene_id[i],
          key: i,
        }));
        console.log(result);
        setResults(result);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 24 }}
        style={{ marginTop: "32px" }}
        initialValues={{
          gene_id_start: "ENSG00000202059.1",
          gene_id_end: "ENSG00000202059.1",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="gene_id Start" name="gene_id_start">
          <Input />
        </Form.Item>

        <Form.Item label="gene_id End" name="gene_id_end">
          <Input />
        </Form.Item>

        <Form.Item label="sample start" name="sample_start">
          <Input />
        </Form.Item>

        <Form.Item label="sample end" name="sample_end">
          <Input />
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
      <Table dataSource={results} columns={columns} />
    </>
  );
};

export default GtexForm;
