# The codeTest from EHG

This project was bootstrapped with [Create React App] 

To produce an image with 32,768 discrete colours on a Hilbert curve in ReactJs.

In the project, there are two main components to produce this image.

1. Canvas: in the Canvas component, I write a 'drawCurve' function and a canvas element.
 
    - Everytime the canvas element is rendered, the useCanvas will be called to call 'drawCurve' function.
    
    - In the 'drawCurve' function, through the loop of width and height, to get the postion of XY, to get the number of RGB and   return them to the ImageData to draw the image.
    
2. useCanvas: in the useCanvas component, I write hooks with useRef(to access the canvas element) and useEffect(wait the component      did mount properly before get the real canvas, otherwise will be null in the case). Everytime you want to draw a new image,         you can reuse the useCanvas with the relevant function to draw a new one.

## Available Scripts

In the colours directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.




