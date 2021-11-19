import { Typography } from "antd";
import "./Cube.css";

function makeArray(a, b) {
  var arr = new Array(a).fill(0);
  for (var i = 0; i < a; i++) arr[i] = new Array(b).fill(0);
  return arr;
}

const Cube = ({ dimensions, data, dimensionNames, onClick }) => {
  const [xDimension, yDimension] = dimensionNames;
  const cells = makeArray(dimensions, dimensions);
  const getCellData = (x, y) => {
    let result;
    data[xDimension].forEach((xDim, i) => {
      if (xDim === x && data[yDimension][i] === y) {
        const obj = Object.keys(data).reduce(
          (accumMap, curKey) => {
            if (curKey === xDimension || curKey === yDimension) {
              accumMap.dimensions[curKey] = data[curKey][i];
            } else {
              accumMap[curKey] = data[curKey][i];
            }

            return accumMap;
          },
          { dimensions: {} }
        );

        result = obj;
      }
    });

    return result;
  };
  return (
    <div className="Cube">
      {cells.map((innerArr, i) =>
        innerArr.map((_, j) => {
          return (
            <Cell
              onClick={onClick}
              cellData={getCellData(i + 1, j + 1)}
              y={i + 1}
              x={j + 1}
              key={`${i}${j}`}
            />
          );
        })
      )}
    </div>
  );
};

export default Cube;

const Cell = ({ cellData, x, y, onClick }) => {
  const { dimensions, ...attributes } = cellData;
  const cellDataFlattened = { ...dimensions, ...attributes };

  return (
    <div
      onClick={() => onClick(x, y, cellDataFlattened)}
      className={`Cell ${attributes ? "active" : ""}`}
    >
      {cellData &&
        Object.keys(attributes).map((keyName) => (
          <Typography.Text className="Cell__attribute" key={keyName}>
            {keyName}: <b>{cellData[keyName]}</b>
          </Typography.Text>
        ))}
      <div className="Cell__dimensions-wrapper">
        {Object.keys(dimensions).map((keyName) => (
          <Typography.Text className="Cell__dimension" key={keyName}>
            {keyName}: <b>{dimensions[keyName]}</b>
          </Typography.Text>
        ))}
      </div>
    </div>
  );
};
