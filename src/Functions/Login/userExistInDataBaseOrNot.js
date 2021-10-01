const registerUser = async phoneNumber => {
  console.log("i called with",phoneNumber);
  try {
    const response = await fetch(
      'http://scrappy.world:3000/api/v1/user/getUserByPhone/' + phoneNumber,
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
    console.log("now returning");
    return j;
    console.log(response);
  } catch (error) {
    console.log('asad', error);
    console.log("now returning");
    return 'User not found';
  }
};

export default registerUser;
