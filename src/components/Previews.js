import React from "react";

import Preview from "/src/components/Preview";

const Previews = ({ tetrominoes }) => {
  // We want all of them but the last one
  // (As we don't want to touch the one the player is currently using)
  const previewTetrominoes = tetrominoes
    .slice(1 - tetrominoes.length)
    .reverse();

  /* return seperate previews for each tetromino 
     by taking the array and mapping over it a tetromino
     at a given index and rendering a preview of that given
     tetromino */
  return (
    <>
      {previewTetrominoes.map((tetromino, index) => (
        <Preview tetromino={tetromino} index={index} key={index} />
      ))}
    </>
  );
};
// Will render occasionally when data changes (returning the component)
export default React.memo(Previews);
