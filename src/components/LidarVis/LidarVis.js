import {
  Vector3,
  PointsCloudSystem,
  Color3,
  ArcRotateCamera,
} from "@babylonjs/core";
import React from "react";
import SceneComponent from "./SceneComponent";

function minMaxArray(arr, idx) {
  var max = -Number.MAX_VALUE,
    min = Number.MAX_VALUE;
  arr.forEach(function (e) {
    if (max < e[idx]) {
      max = e[idx];
    }
    if (min > e[idx]) {
      min = e[idx];
    }
  });
  return { max: max, min: min };
}

const LidarVis = ({ data }) => {
  const [canvas, setCanvas] = React.useState(null);
  const { max: maxX, min: minX } = minMaxArray(data, "X");
  const { max: maxY, min: minY } = minMaxArray(data, "Y");
  const { max: maxZ, min: minZ } = minMaxArray(data, "Z");
  const num_coords = data.length;

  const onSceneReady = (scene) => {
    // This creates and positions a free camera (non-mesh)
    const camera = new ArcRotateCamera(
      "Camera",
      1,
      0.8,
      3,
      new Vector3(0, 0, 0),
      scene
    );
    camera.attachControl(canvas, true);
    camera.wheelPrecision = 0.5;

    const pcs = new PointsCloudSystem("pcs", 1, scene, { updatable: false });

    const myLoader = function (particle, i, s) {
      particle.position = new Vector3(
        (data[i].X - minX) / (maxX - minX),
        (data[i].Y - minY) / (maxY - minY),
        ((data[i].Z - minZ) / (maxZ - minZ)) * 0.75
      );

      particle.color = new Color3(data[i].Red, data[i].Green, data[i].Blue);
    };

    pcs.addPoints(num_coords, myLoader);
    pcs.buildMeshAsync();
  };

  return (
    <div className="lidar-visualization">
      <SceneComponent
        antialias
        onSceneReady={onSceneReady}
        id="lidar-vis-canvas"
        setCanvas={setCanvas}
      />
    </div>
  );
};

export default LidarVis;
