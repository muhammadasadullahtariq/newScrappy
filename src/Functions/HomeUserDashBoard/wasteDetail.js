import getMediaFile from '../Global/downloadMediaFile';
var images = [];
var videos = [];

async function wasteData(id) {
  console.log(id);
  try {
    const response = await fetch(
      'http://scrappy.world:3000/api/v1/waste/collector/getWasteDataById/' + id,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-cache',
        },
        redirect: 'follow',
      },
    );
    var responce = await response.json();
    console.log('g g ', responce.data);
    responce = responce.data;
    if (responce._data.message != 'Waste data not found') {
      await getAllMediaFile(responce._data.images, responce._data.videos);
      responce.image = images;
      responce.video = videos;
    }
    console.log(responce);
    return responce;
  } catch (error) {
    console.log('asad', error);
    return 'Some internal error occure';
  }
}

async function getAllMediaFile(imageArr, videoArr) {
  console.log(imageArr);
  console.log(videoArr);
  images = [];
  videos = [];
  for (var i = 0; i < imageArr.length; i++) {
    images.push({
      uri: 'http://scrappy.world:3000/api/v1/file/get/file/' + imageArr[i],
    });
  }
  for (var i = 0; i < videoArr.length; i++) {
    videos.push({
      uri: 'http://scrappy.world:3000/api/v1/file/video/' + videoArr[i],
    });
  }
}

export default wasteData;
