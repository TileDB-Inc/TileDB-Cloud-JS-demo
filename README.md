# TileDB-Cloud-JS Demo

Demo project to showcase TileDB queries from the browser with the power of [@tiledb-inc/tiledb-cloud](https://github.com/TileDB-Inc/TileDB-Cloud-JS).

### Installation

Run `npm install` to install the dependencies needed for this demo. To install [@tiledb-inc/tiledb-cloud](https://www.npmjs.com/package/@tiledb-inc/tiledb-cloud) in another project, run:

`npm i @tiledb-inc/tiledb-cloud@beta`

### Setup

Create a `.env` file in the root folder with the following variables:

#### Authentication

Your [TileDB API key](https://docs.tiledb.com/cloud/how-to/account/create-api-tokens) (required):

```
VITE_API_KEY=MY_TILEDB_API_KEY
```

Optionally, you can override the default API base path:

```
VITE_API_BASE_PATH=https://api.tiledb.com
```

#### Per-page asset configuration

Each demo page requires a `workspace`, `teamspace` and `asset_id` to identify the array to query:

```
# GTEx
VITE_GTEX_WORKSPACE=TileDB-Inc
VITE_GTEX_TEAMSPACE=TileDB-Inc
VITE_GTEX_ASSET_ID=ast_d67iala22lds72ppmmog

# Autzen Lidar
VITE_AUTZEN_WORKSPACE=TileDB-Inc
VITE_AUTZEN_TEAMSPACE=TileDB-Inc
VITE_AUTZEN_ASSET_ID=autzen_tiledb

# Boulder Lidar
VITE_BOULDER_WORKSPACE=TileDB-Inc
VITE_BOULDER_TEAMSPACE=TileDB-Inc
VITE_BOULDER_ASSET_ID=ast_d67ibrq22lds72ppmmvg

# Files
VITE_FILES_WORKSPACE=TileDB-Inc
VITE_FILES_TEAMSPACE=TileDB-Inc
VITE_FILES_ASSET_ID=VLDB17_TileDB
```

### Working with the "Interactive write" example

User can [create an array](https://docs.tiledb.com/cloud/how-to/arrays/create-arrays) and view it as an interactive 2-dimensional cube. By clicking a cell, user can edit the attributes and see it reflected in the cube. <br/>

The workspace, teamspace and asset ID of the array should be set in the `.env` file as a `/`-separated string:

```
VITE_QUICKSTART_ARRAY=my_workspace/my_teamspace/my_asset_id
```

*Limitations:* Right now the visualization is limited to work only with 4*4 arrays it is adviced to use either [quickstart_dense](https://github.com/TileDB-Inc/TileDB/blob/dev/examples/cpp_api/quickstart_dense.cc) or [quickstart_sparse](https://github.com/TileDB-Inc/TileDB/blob/dev/examples/cpp_api/quickstart_sparse.cc) example arrays.

<img src="https://user-images.githubusercontent.com/33217757/135656093-5ee51fb2-5e29-43ef-a540-1f90d94016aa.png" /> 

### Running the demo

Start the demo with:

`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
