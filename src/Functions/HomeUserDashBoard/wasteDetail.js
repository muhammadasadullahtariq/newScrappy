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
    const j = await response.json();
    console.log('g g ', j);
    if (j.message != 'Waste data not found') {
      await getAllMediaFile(j.data.images, j.data.videos);
      j.image = images;
      j.video = videos;
    }
    console.log(j);
    return j;
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
      uri: 'http://scrappy.world:3000/api/v1/file/get/file/' + videoArr[i],
    });
  }
}

export default wasteData;
