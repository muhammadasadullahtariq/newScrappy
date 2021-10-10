const fun = async arr => {
  var sum = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].count > 0) {
      sum += arr[i].price.slice(1) * arr[i].count;
    }
  }
  return sum;
};

export default fun;
