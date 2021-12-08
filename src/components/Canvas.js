import React, { useLayoutEffect, useRef } from "react";
import { cube, addModel2Scene, updateModel } from "../threeComponents";
import useThree from "../hooks/useThree";
import styled from "styled-components";

const CanvasBase = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Canvas = () => {
  const canvasRef = useRef();
  const { init, animate, addObject, scene } = useThree();

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    init(canvas, [400, 300]);
    // addObject(cube);
    addModel2Scene(scene);
    animate((clockDelta) => {
      updateModel(clockDelta);
    });
  });

  return <CanvasBase ref={canvasRef}></CanvasBase>;
};
