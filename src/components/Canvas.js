import React, { useLayoutEffect, useRef } from "react";
import { cube, addModel2Scene, updateModel } from "../threeComponents";
import useThree from "../hooks/useThree";
import styled from "styled-components";

const CanvasBase = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px;
`;

export const Canvas = () => {
  const canvasRef = useRef();
  const { init, animate, addObject, scene, cleanUp } = useThree();

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    init(canvas, [1000, 1000]);
    // addObject(cube);
    addModel2Scene(scene);
    animate((clockDelta) => {
      updateModel(clockDelta);
    });
    console.log("layout");
    return () => {
      cleanUp(canvas);
      console.log("clean up");
    };
  });

  return <CanvasBase ref={canvasRef}></CanvasBase>;
};
