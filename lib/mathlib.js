const checkForCollision = (
  x,
  y,
  xSpeed,
  ySpeed,
  height,
  bricks,
  topAction,
  bottomAction,
  leftAction,
  rightAction
) => {
  var newPosision = [x, y];

  for (var i in bricks) {
    if (bricks[i].type === undefined) {
      continue;
    } else if (
      y >= bricks[i].position[1] + 1 + ySpeed &&
      y <= bricks[i].position[1] + 1 &&
      x > bricks[i].position[0] - 1 &&
      x <
        bricks[i].position[0] +
          (bricks[i].dim !== undefined ? bricks[i].dim[0] : 1) &&
      bricks[i].type !== "hidden"
    ) {
      newPosision[1] = bricks[i].position[1] + 1;
      topAction(bricks[i]);
      break;
    } else if (
      y >=
        bricks[i].position[1] -
          (bricks[i].dim !== undefined ? bricks[i].dim[1] : 1) -
          height +
          1 &&
      y <=
        bricks[i].position[1] -
          (bricks[i].dim !== undefined ? bricks[i].dim[1] : 1) -
          height +
          1 +
          ySpeed &&
      x > bricks[i].position[0] - 1 &&
      x <
        bricks[i].position[0] +
          (bricks[i].dim !== undefined ? bricks[i].dim[0] : 1)
    ) {
      newPosision[1] =
        bricks[i].position[1] -
        (bricks[i].dim !== undefined ? bricks[i].dim[1] : 1) -
        height +
        1;
      bottomAction(bricks[i]);
    }
  }

  for (var i in bricks) {
    if (bricks[i].type === "hidden" || undefined) {
      continue;
    } else if (
      x >=
        bricks[i].position[0] +
          (bricks[i].dim !== undefined ? bricks[i].dim[0] : 1) +
          xSpeed &&
      x <=
        bricks[i].position[0] +
          (bricks[i].dim !== undefined ? bricks[i].dim[0] : 1) &&
      newPosision[1] >
        bricks[i].position[1] -
          (bricks[i].dim !== undefined ? bricks[i].dim[1] : 1) -
          height +
          1 &&
      newPosision[1] < bricks[i].position[1] + 1
    ) {
      newPosision[0] =
        bricks[i].position[0] +
        (bricks[i].dim !== undefined ? bricks[i].dim[0] : 1);
      rightAction(bricks[i]);
      break;
    } else if (
      x >= bricks[i].position[0] - 1 &&
      x <= bricks[i].position[0] + xSpeed &&
      newPosision[1] >
        bricks[i].position[1] -
          (bricks[i].dim !== undefined ? bricks[i].dim[1] : 1) -
          height +
          1 &&
      newPosision[1] < bricks[i].position[1] + 1
    ) {
      newPosision[0] = bricks[i].position[0] - 1;
      leftAction(bricks[i]);
      break;
    }
  }

  return newPosision;
};

export { checkForCollision };
