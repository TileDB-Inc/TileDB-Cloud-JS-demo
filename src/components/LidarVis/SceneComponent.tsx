import {
  Engine,
  Scene,
  type EngineOptions,
  type SceneOptions,
} from "@babylonjs/core";
import React, { useEffect, useRef } from "react";

interface SceneComponentPros {
  id: string;
  
  antialias?: boolean;
  engineOptions?: EngineOptions;
  adaptToDeviceRatio?: boolean;
  sceneOptions?: SceneOptions;
  onSceneReady: (scene: Scene) => void;
  onRender?: (scene: Scene) => void;
}

const SceneComponent: React.FC<SceneComponentPros> = (props) => {
  const reactCanvas = useRef(null);
  const {
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    onRender,
    onSceneReady,
    ...rest
  } = props;

  useEffect(() => {
    const { current: canvas } = reactCanvas;

    if (!canvas) return;

    const engine = new Engine(
      reactCanvas.current,
      antialias,
      engineOptions,
      adaptToDeviceRatio
    );
    const scene = new Scene(engine, sceneOptions);
    if (scene.isReady()) {
      onSceneReady(scene);
    } else {
      scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
    }

    engine.runRenderLoop(() => {
      onRender?.(scene);
      scene.render();
    });

    const resize = () => {
      scene.getEngine().resize();
    };

    if (window) {
      window.addEventListener("resize", resize);
    }

    return () => {
      scene.getEngine().dispose();

      if (window) {
        window.removeEventListener("resize", resize);
      }
    };
  }, [
    reactCanvas,
    adaptToDeviceRatio,
    engineOptions,
    antialias,
    onRender,
    sceneOptions,
    onSceneReady
  ]);

  return <canvas style={{ height: "400px" }} ref={reactCanvas} {...rest} />;
};

export default SceneComponent;
