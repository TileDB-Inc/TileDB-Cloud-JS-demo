import { Typography } from "antd";
import "./Cube.css";

function makeArray(a,b) {
    var arr = new Array(a).fill(0);
    for(var i = 0;i<a;i++)
        arr[i] = new Array(b).fill(0);
    return arr
}

const Cube = ({ dimensions, data, dimensionNames, onClick}) => {
    const [xDimension, yDimension] = dimensionNames;
    const cells = makeArray(dimensions, dimensions);
    const getCellData = (x, y) => {
        let result;
        data[xDimension].forEach((xDim, i) => {
            if (xDim === x && data[yDimension][i] === y) {

                const obj = Object.keys(data).reduce((accumMap, curKey) => {
                    accumMap[curKey] = data[curKey][i];

                    return accumMap;
                }, {})
                
                result = obj;
            }
        });

        return result;
    }
    return (
        <div className="Cube">
            {
                cells.map((innerArr, i) => innerArr.map((_, j) => {

                    return <Cell onClick={onClick} cellData={getCellData(i + 1, j + 1)} y={i + 1} x={j + 1} key={`${i}${j}`} />
                }))
            }
        </div>
    )
}

export default Cube;

const Cell = ({ cellData, x, y, onClick }) => {
    return (
        <div onClick={() => onClick(x, y, cellData)} className={`Cell ${cellData ? 'active' : ''}`}>
            {
                cellData && Object.keys(cellData).map((keyName) => <Typography.Text style={{marginRight: '5px'}} key={keyName}>{keyName}: {cellData[keyName]}</Typography.Text>)
            }
        </div>
    )
}


