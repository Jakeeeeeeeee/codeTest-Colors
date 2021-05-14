import React, { useEffect, useRef } from 'react';

const Colours = (props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.fillStyle = '#000000'
    context.fillRect(0, 0, 200, 50)
  })

  return (
      <canvas ref={canvasRef} {...props}/>
  );
}

export default Colours;
