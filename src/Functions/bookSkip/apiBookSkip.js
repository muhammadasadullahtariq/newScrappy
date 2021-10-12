const bookSkip = async (id,arr, flag, date) => {
  var userID = id;
  var skipID = '6162f31ee4b8637f76455253';
  var startTime = '';
  var endTime = '';

  if (flag) {
    startTime = '12:00PM';
    endTime = '05:00PM';
  } else {
    startTime = '07:00AM';
    endTime = '12:00PM';
  }
  dataArr = await repalceKey(arr);
  console.log(dataArr);

  try {
    const response = await fetch(
      'http://scrappy.world:3000/api/v1/skip/booking/service/addSkipOrder',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-cache',
        },
        body: JSON.stringify({
          userId: userID,
          skipId: skipID,
          bookSkip: dataArr,
          bookingDate: date,
          fromTime: startTime,
          toTime: endTime,
          description: 'test',
        }),
      },
    );
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

async function repalceKey(arr) {
  var i;
  for (i = 0; i < arr.length; i++) {
    arr[i].quantity = arr[i]['count'];
    arr[i].price=arr[i].price.slice(1);
    delete arr[i].count;
  }
  console.log(arr);
  var returnArr = [];
  for (i = 0; i < arr.length; i++) {
    if (arr[i].quantity != 0) {
      returnArr.push(arr[i]);
    }
  }
  return returnArr;
}

export default bookSkip;
