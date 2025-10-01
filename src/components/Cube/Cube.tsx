import { Typography } from "antd";
import "./Cube.css";
import type React from "react";

function makeArray(outer_size: number, inner_size: number): Array<Array<number>> {
  var arr = new Array(outer_size).fill(0);
  for (var i = 0; i < outer_size; i++) arr[i] = new Array(inner_size).fill(0);
  return arr;
}

interface CubeProps {
  dimensions: number;
  dimensionNames: Array<string>;
  onClick: (x: number, y: number, data: any) => void;
}

const Cube: React.FC<CubeProps> = ({ dimensions, data, dimensionNames, onClick }) => {
  const [xDimension, yDimension] = dimensionNames;
  const cells = makeArray(dimensions, dimensions);
  const getCellData = (x: number, y: number) => {
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

interface CellProps {
  cellData: any;
  x: number;
  y: number;
  onClick: (x: number, y: number, data: any) => void;
}

const Cell: React.FC<CellProps> = ({ cellData, x, y, onClick }) => {
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
