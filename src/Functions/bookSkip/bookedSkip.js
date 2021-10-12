const bookedSkip = async id => {
  try {
    const response = await fetch(
      'http://scrappy.world:3000/api/v1/skip/booking/service/getAllBookingSkipsByUserId',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-cache',
        },
        body: JSON.stringify({
          userId: id,
          perPage: 20,
          currentPage: 1,
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

export default bookedSkip;
