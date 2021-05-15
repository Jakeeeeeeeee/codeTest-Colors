import React from 'react';
import useCanvas from '../hooks/useCanvas/useCanvas';

const Canvas = () => {
  
  const drawCurve = (ctx) => {
    const width = 256;
    const height = 128;
    const data = ctx.getImageData(0, 0, width, height);
  
    /* rotate a quadrant */
    function rotateXy(n, p, r) {
      if (r.y === 0) {
        if (r.x === 1) {
          p.x = n-1 - p.x;
          p.y = n-1 - p.y;
        }

        /* Swap x and y */
        const t  = p.x;
        p.x = p.y;
        p.y = t;
      }
    }
      
    /* to get the data by xy */
    function dataByXy (n, p) {
      p = {x: p.x, y: p.y};

      let r = {x: 0, y: 0}, s, d=0;

      for (s=(n/2)|0; s>0; s=(s/2)|0) {
        r.x = (p.x & s) > 0 ? 1 : 0;
        r.y = (p.y & s) > 0 ? 1 : 0;
        d += s * s * ((3 * r.x) ^ r.y);
        rotateXy(s, p, r);
      }

      return d;
    }

    /* To get RGB */
    function rgbByData(v) {
      return ((v & 0xf800) << 8) | ((v & 0x7e0) << 5) | ((v & 0x1f) << 3); 
    }

    /* To put the data into imagedata */
    function putData(arr, width, coord, v) {
      const pos = (coord.x + width * coord.y) * 4;
      const rgb = rgbByData(v);

      arr[pos] = (rgb & 0xff0000) >> 16;
      arr[pos + 1] = (rgb & 0xff00) >> 8;
      arr[pos + 2] = rgb & 0xff;
      arr[pos + 3] = 0xff;
    }

    /* for loop 32,768 times to put data into imagedata */
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const p = {x: j, y: i};

        putData(data.data, width, p, dataByXy(width, p));
      }
    }

    /* To draw the image by imagedata */
    ctx.putImageData(data, 0, 0);
  }
  
  const canvasRef = useCanvas(drawCurve);

  return (
    <canvas ref={canvasRef} width="256px" height="128px"/>
  );
}

export default Canvas;
