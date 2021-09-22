const registerUser = async (userID, wasteID, bidPrice) => {
  try {
    const response = await fetch(
      'http://scrappy.world:3000/api/v1/waste/bidding/addBiddingData',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-cache',
        },
        body: JSON.stringify({
          userId: userID,
          wasteId: wasteID,
          bidPrice: bidPrice,
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

export default registerUser;
