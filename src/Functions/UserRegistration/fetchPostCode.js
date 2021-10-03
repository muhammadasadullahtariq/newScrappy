const registerUser = async () => {
  console.warn('i called with');
  try {
    const response = await fetch(
      'http://scrappy.world:3000/api/v1/user/getPostCodes',
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-cache',
          redirect: 'follow',
        },
      },
    );
    const j = await response.json();

    console.log('g g ', j);
    console.log('now returning');
    return arrayBuilt(j);
    //return j;
    console.log(response);
  } catch (error) {
    console.log('asad', error);
    console.log('now returning');
    return 'Internet Issue';
  }
};

function arrayBuilt(responce) {
  var data = responce.data;
  var array = [];
  data.forEach(item => array.push({id: item, name: item}));
  console.log('Array', array);
  array.push({id: '1', name: ''});
  array.push({id: '2', name: ''});
  array.push({id: '3', name: ''});
  return array;
}

export default registerUser;
