import { useEffect, useRef } from "react";

const useCanvas = (drawCurve) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    drawCurve(context);

  }, [drawCurve])

  return canvasRef;
}

export default useCanvas;
