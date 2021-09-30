import {videoUpload, imageUpload} from './uploadImageAndVideo';
var videoArray = [];
var imageArray = [];
var count = 0;
const UploadVideosAndImages = async (id, catagory, title, detail, arr) => {
  console.log(arr);
  if(arr.length!=1){
    arr.splice(arr.length-1, 0,arr[arr.length-1]);
  for (var i = 0; i < arr.length ; i++) {
    if (arr[i].flag &&arr[i].path!="") {
      var result = await videoUpload(arr[i]);
      if (result.status == 'OK') {
        videoArray.push(result.data);
      } else {
        count += 1;
      }
    } else if(!arr[i].flag&&arr[i].path!="") {
      console.log("Calling Image Upload Function ",arr[i]);
      var result = await imageUpload(arr[i]);
      console.log("waiting");
      if (result.status == 'OK') {
        imageArray.push(result.data);
      } else {
        count += 1;
      }
    }
    console.log(i);
    if (i == arr.length - 2) {
      console.log('here i am');
      if (count == 0) {
        var res = await uploadScrapData(id, catagory, title, detail);
        if (res.message == 'WasteCollector data successfully added') {
          return 'Data Uploaded Successfully';
        } else {
          return 'Some Error occure try again latter';
        }
      } else if (count < arr.length) {
        var res = await uploadScrapData(id, catagory, title, detail);
        if (res.message == 'WasteCollector data successfully added') {
          return 'WasteCollector Uploaded Successfully some mediua fail to upload';
        } else {
          return 'Some Error occure try again latter';
        }
      } else {
        return 'Fail to Upload';
      }
    }
  }
}else{
  var res = await uploadScrapData(id, catagory, title, detail);
        if (res.message == 'WasteCollector data successfully added') {
          return 'Data Uploaded Successfully';
        } else {
          return 'Some Error occure try again latter';
        }
}
};

async function uploadScrapData(id, catagory, title, detail) {
  try {
    const response = await fetch(
      'http://scrappy.world:3000/api/v1/waste/collector/addWasteData',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-cache',
        },
        body: JSON.stringify({
          userId: id,
          wasteType: catagory,
          images: imageArray,
          videos: videoArray,
          description: detail,
          title: title,
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
}

export default UploadVideosAndImages;
