import React from "react";
import { Form, Input, Button, Table, Typography } from "antd";
import client from '../../helpers/client';
import { type QueryData } from "@tiledb-inc/tiledb-cloud";
import { Layout } from "@tiledb-inc/tiledb-cloud/v3";

type ResultItem = {
  gene_id: string;
  sample: string;
  tpm: number;
};

type Result<Type> = {
  [Property in keyof Type]: Array<Type[Property]>;
};

type FormProps = {
  gene_id: string;
  sample_start: string;
  sample_end: string;
}

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
  const [results, setResults] = React.useState<Array<ResultItem>>([]);
  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm();
  const onFinish = (values: FormProps) => {
    const ranges = [
      [values.gene_id, values.gene_id].filter(Boolean),
      [values.sample_start, values.sample_end].filter(Boolean),
    ];

    console.log(ranges);

    const query: QueryData = {
      layout: Layout.RowMajor,
      ranges: ranges,
      bufferSize: 150000000,
    };
    setLoading(true);

    const generator = client.query.ReadQuery(
      "TileDB-Inc.",
      "xanthos-test",
      "Cloud JS Demo/gtex-analysis-rnaseqc-gene-tpm",
      query
    );
    generator
      .next()
      .then(({ value: res }) => {
        const typedResults = res as Result<ResultItem>;
        const resultCount = typedResults.sample.length;
        const result: Array<ResultItem> = new Array(resultCount);

        for (let i = 0; i < resultCount; ++i) {
          result[i] = {
            tpm: typedResults.tpm[i],
            sample: typedResults.sample[i],
            gene_id: typedResults.gene_id[i],
          };
        }
        
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
        layout="vertical"
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 24 }}
        style={{ marginTop: "32px" }}
        initialValues={{
          gene_id: "ENSG00000202059.1",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="Gene id" name="gene_id">
          <Input />
        </Form.Item>

        <Form.Item label="Sample start" name="sample_start">
          <Input />
        </Form.Item>

        <Form.Item label="Sample end" name="sample_end">
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
          <Button
            style={{ marginRight: "15px" }}
            type="primary"
            htmlType="submit"
            loading={loading}
            size="large"
          >
            Submit
          </Button>
          <Button htmlType="button" size="large" onClick={onReset}>
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
