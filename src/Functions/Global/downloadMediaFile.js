const getMediaFile = async fileName => {
  try {
    const response = await fetch(
      'http://scrappy.world:3000/api/v1/file/get/file/' + fileName,
      {
        method: 'GET',
        headers: {
          'cache-control': 'no-cache',
        },
        redirect: 'follow',
      },
    );
    console.log(response);
    console.log('g g ');
    return response;
  } catch (error) {
    console.log('asad', error);
    return 'Media not found';
  }
};

export default getMediaFile;
