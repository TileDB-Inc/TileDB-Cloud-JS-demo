export const basic = `
import { TileDBQuery } from '@tiledb-inc/tiledb-cloud';
import { Layout } from '@tiledb-inc/tiledb-cloud/lib/v2';

const tileDBQuery = new TileDBQuery({
    apiKey: 'myApiKey'
});

const dimension1 = [636800,637800];
const dimension2 = [851000,853000];

const query = {
    layout: Layout.RowMajor,
    ranges: [dimension1, dimension2],
    bufferSize: 15000000000000,
};

tileDBQuery.ReadQuery("my_namespace", "my_array", query)
  .then((result) => {
    // returns an object with keys the name of the attributes and values the result
      console.log(result);
  })
`

export const multi_range = `
import { TileDBQuery } from '@tiledb-inc/tiledb-cloud';
import { Layout } from '@tiledb-inc/tiledb-cloud/lib/v2';

const tileDBQuery = new TileDBQuery({
    apiKey: 'myApiKey'
});

const dimension1 = [636800,637800];
const dimension2 = [[1577836800, 1588878856], [1577836800, 1578878856]];

const query = {
    layout: Layout.RowMajor,
    ranges: [dimension1, dimension2],
    bufferSize: 15000000000000,
};

tileDBQuery.ReadQuery("my_namespace", "my_array", query)
  .then((result) => {
    // returns an object with keys the name of the attributes and values the result
      console.log(result);
  })

  `


export const whole_dim = `
import { TileDBQuery } from '@tiledb-inc/tiledb-cloud';
import { Layout } from '@tiledb-inc/tiledb-cloud/lib/v2';

const tileDBQuery = new TileDBQuery({
    apiKey: 'myApiKey'
});

const dimension1 = [636800,637800];
// Setting empty array, query will select whole 2nd dimension
const dimension2 = [];

const query = {
    layout: Layout.RowMajor,
    ranges: [dimension1, dimension2],
    bufferSize: 15000000000000,
};

tileDBQuery.ReadQuery("my_namespace", "my_array", query)
  .then((result) => {
    // returns an object with keys the name of the attributes and values the result
      console.log(result);
  })

`

export const basic_write = `
import { TileDBQuery } from '@tiledb-inc/tiledb-cloud';
import { Layout } from '@tiledb-inc/tiledb-cloud/lib/v2';

const tileDBQuery = new TileDBQuery({
    apiKey: 'myApiKey'
});

const query = {
  layout: Layout.Unordered,
  values: {
    rows: {
      values: [1, 1, 1],
    },
    cols: {
      values: [1, 2, 3],
    },
    attr1: {
      values: [2, 3, 38],
    },
    attr2: {
      values: [10, 20, 30],
    },
  },
};

tileDBQuery.WriteQuery("my_namespace", "my_array", query)
  .then((result) => {
    // returns the query object
      console.log(result);
  })

`

export const write_subarray = `
import { TileDBQuery } from '@tiledb-inc/tiledb-cloud';
import { Layout } from '@tiledb-inc/tiledb-cloud/lib/v2';

const tileDBQuery = new TileDBQuery({
    apiKey: 'myApiKey'
});

const query = {
  layout: Layout.RowMajor,
  subarray: [[1, 1], [1, 3]],
  values: {
    attr1: {
      values: [2, 3, 38],
    },
    attr2: {
      values: [10, 20, 30],
    },
  },
};

tileDBQuery.WriteQuery("my_namespace", "my_array", query)
  .then((result) => {
    // returns the query object
      console.log(result);
  })
`

export const write_nullable = `
import { TileDBQuery } from '@tiledb-inc/tiledb-cloud';
import { Layout } from '@tiledb-inc/tiledb-cloud/lib/v2';

const tileDBQuery = new TileDBQuery({
    apiKey: 'myApiKey'
});

const query = {
  layout: Layout.Unordered,
  values: {
      a1: {
          values: [100, 200],
          validity: [1, 0],
      },
      a2: {
          values: [10, 10, 20],
          offsets: [0, 8, 12],
          validity: [1, 0],
      },
      a3: {
          values: ['abcdewxyz'],
          offsets: [0, 3, 5],
          validity: [1, 0],
      },
      rows: {
          values: [1, 1]
      },
      cols: {
          values: [1, 2]
      }
  }
};

tileDBQuery.WriteQuery("my_namespace", "my_array", query)
  .then((result) => {
    // returns the query object
      console.log(result);
  })
`