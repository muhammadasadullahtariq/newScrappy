const registerUser = async (id, type = '') => {
  try {
    const response = await fetch(
      'http://scrappy.world:3000/api/v1/waste/collector/getWasteDataByUserIdAndRole',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-cache',
        },
        body: JSON.stringify({
          userId: id,
          perPage: 10,
          currentPage: 1,
          wasteType: type,
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
