import React from 'react';
import useCanvas from './hooks/useCanvas';

const Canvas = () => {
  const width = 256;
  const height = 128;
  
  const drawCurve = (ctx) => {
    const data = ctx.getImageData(0, 0, width, height);
  
    /* Rotate a quadrant */
    function rotateXY(n, p, r) {
      if (r.y === 0) {
        if (r.x === 1) {
          p.x = n-1 - p.x;
          p.y = n-1 - p.y;
        }

        /* Swap x and y */
        const t = p.x;
        p.x = p.y;
        p.y = t;
      }
    }
      
    /* To get the data by xy */
    function dataByXY (n, p) {
      p = { x: p.x, y: p.y };

      let r = { x: 0, y: 0 }, s, d = 0;

      for (s = (n/2)|0; s>0; s = (s/2)|0) {
        r.x = (p.x & s) > 0 ? 1 : 0;
        r.y = (p.y & s) > 0 ? 1 : 0;
        d += s * s * ((3 * r.x) ^ r.y);
        rotateXY(s, p, r);
      }

      return d;
    }

    /* To get RGB */
    function rgbByData(d) {
      return ((d & 0xf800) << 8) | ((d & 0x7e0) << 5) | ((d & 0x1f) << 3); 
    }

    /* To get RGB by data from XY and put the RGB into Imagedata */
    function putData(arr, width, coord, d) {
      const pos = (coord.x + width * coord.y) * 4;
      const rgb = rgbByData(d);

      arr[pos] = (rgb & 0xff0000) >> 16;
      arr[pos + 1] = (rgb & 0xff00) >> 8;
      arr[pos + 2] = rgb & 0xff;
      arr[pos + 3] = 0xff;
    }

    /* For loop 32,768 times to get the position and RGB, and put them into Imagedata */
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const p = { x: j, y: i };

        putData(data.data, width, p, dataByXY(width, p));
      }
    }

    /* Return the Imagedata to draw the image */
    ctx.putImageData(data, 0, 0);
  }
  
  const canvasRef = useCanvas(drawCurve);

  return (
    <canvas ref={canvasRef} width={width} height={height} />
  );
}

export default Canvas;
