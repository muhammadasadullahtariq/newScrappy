const NumberOfColumn = width => {
  //This function return numbers of tabs when user change orientation
  if (width < 480) {
    return 4;
  } else if (width < 786) {
    return 8;
  } else if (width <= 1080) {
    return 9;
  } else {
    return 10;
  }
};

export {NumberOfColumn};
