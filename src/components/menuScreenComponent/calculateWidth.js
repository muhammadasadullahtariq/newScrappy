

const NumberOfColumn = width => {//This function return numbers of tabs when user change orientation
  if (width < 480) {
    return 3;
  } else if (width < 786) {
    return 3;
  } else if (width <= 1080) {
    return 4;
  } else {
    return 4;
  }
};

export {NumberOfColumn};
