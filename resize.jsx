import React from "react";
import { Resizable } from "react-resizable";

function ResizeApp() {
  const [width, setWidth] = React.useState(200);
  const [height, setHeight] = React.useState(200);

  return (
    <Resizable
      width={width}
      height={height}
      onResize={(event, { element, size }) => {
        setWidth(size.width);
        setHeight(size.height);
      }}
    >
      <div className="App bg-gray-600">
        <h1>Hello, world!</h1>
      </div>
    </Resizable>
  );
}

export default ResizeApp;
