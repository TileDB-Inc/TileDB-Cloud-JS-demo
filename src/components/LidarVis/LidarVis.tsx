import {
  Vector3,
  PointsCloudSystem,
  ArcRotateCamera,
  Scene,
  CloudPoint,
  Color4,
} from "@babylonjs/core";
import React from "react";
import SceneComponent from "./SceneComponent";

function minMaxArray(
  arr: Array<Record<string, number>>,
  idx: string
): { min: number; max: number } {
  let max = -Number.MAX_VALUE,
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

const LidarVis: React.FC<{ data: Array<Record<string, number>> }> = ({
  data,
}) => {
  const { max: maxX, min: minX } = minMaxArray(data, "X");
  const { max: maxY, min: minY } = minMaxArray(data, "Y");
  const { max: maxZ, min: minZ } = minMaxArray(data, "Z");
  const pointCount = data.length;

  const onSceneReady = (scene: Scene) => {
    // This creates and positions a free camera (non-mesh)
    const camera = new ArcRotateCamera(
      "Camera",
      1,
      0.8,
      3,
      new Vector3(0, 0, 0),
      scene
    );
    camera.attachControl(true);
    camera.wheelPrecision = 0.5;

    const pcs = new PointsCloudSystem("pcs", 1, scene, { updatable: false });

    const pointLoader = (particle: CloudPoint, index: number) => {
      particle.position = new Vector3(
        (data[index].X - minX) / (maxX - minX),
        (data[index].Y - minY) / (maxY - minY),
        ((data[index].Z - minZ) / (maxZ - minZ))
      );

      particle.color = new Color4(data[index].Red, data[index].Green, data[index].Blue, 1);
    };

    pcs.addPoints(pointCount, pointLoader);
    pcs.buildMeshAsync();
  };

  return (
    <div className="lidar-visualization">
      <SceneComponent
        id="lidar-vis-canvas"
        antialias
        onSceneReady={onSceneReady}
      />
    </div>
  );
};

export default LidarVis;
