const registerUser = async phoneNumber => {
  try {
    const response = await fetch(
      'http://scrappy.world:3000/api/v1/user/getUserByPhone/' + phoneNumber,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-cache',
        },
        redirect: 'follow',
      },
    );
    const j = await response.json();
    console.log('g g ', j);
    return j;
    console.log(response);
  } catch (error) {
    console.log('asad', error);
    return 'User not found';
  }
};

export default registerUser;
