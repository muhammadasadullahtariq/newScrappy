const registerUser = async id => {
  console.log('bidding id', id);
  try {
    const response = await fetch(
      'http://scrappy.world:3000/api/v1/waste/bidding/getBiddingListByWasteId/' +
        id,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-cache',
        },
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

export default registerUser;
