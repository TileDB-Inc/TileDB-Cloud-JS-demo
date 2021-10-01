# TileDB-Cloud-JS Demo

Demo project to showcase TileDB queries from the browser with the power of [@tiledb-inc/tiledb-cloud](https://github.com/TileDB-Inc/TileDB-Cloud-JS).

### Installation

Run `npm install` to install the dependencies needed for this demo. To install [@tiledb-inc/tiledb-cloud](https://www.npmjs.com/package/@tiledb-inc/tiledb-cloud) in another project, run:

`npm i @tiledb-inc/tiledb-cloud@beta`

### Setup

Create a `.env` file in the root folder, specifying your [TileDB apiKey](https://docs.tiledb.com/cloud/how-to/account/create-api-tokens):

```
REACT_APP_API_KEY_PROD=MY_TILEDB_API_KEY
```


### Working with the "Interactive write" example

User can [create an array](https://docs.tiledb.com/cloud/how-to/arrays/create-arrays) and view it as an interactive 2-dimensional cube. By clicking a cell, user can edit the attributes and see it reflected in the cube. <br/>

The namespace/name of the array should be set in the `.env` file

```
REACT_APP_QUICKSTART_ARRAY=my_namespace/my_array
```

*Limitations:* Right now the visualization is limited to work only with 4*4 arrays it is adviced to use either [quickstart_dense](https://github.com/TileDB-Inc/TileDB/blob/dev/examples/cpp_api/quickstart_dense.cc) or [quickstart_sparse](https://github.com/TileDB-Inc/TileDB/blob/dev/examples/cpp_api/quickstart_sparse.cc) arrays.

<img src="https://user-images.githubusercontent.com/33217757/135656093-5ee51fb2-5e29-43ef-a540-1f90d94016aa.png" /> 

### Running the demo `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
