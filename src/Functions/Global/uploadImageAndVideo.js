import React from 'react';
//import RNFetchBlob from 'rn-fetch-blob';

const videoUpload = async video => {
  return await upload(video.responce);
};

async function upload(imageSur) {
  console.log(imageSur);
  var image = {};
  image.uri = imageSur.path;
  image.name = imageSur.path.substring(imageSur.path.lastIndexOf('/') + 1);
  image.type = imageSur.mime;
  image.dateModified = new Date();
  var formdata = new FormData();
  formdata.append('video', image, imageSur.path);
  try {
    const response = await fetch(
      'http://scrappy.world:3000/api/v1/file/upload/video',
      {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
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

const imageUpload = async image => {
  return await registerUser(image.responce);
};

export const registerUser = async imageSur => {
  console.log(imageSur);
  var image = {};
  image.uri = imageSur.path;
  image.name = imageSur.path.substring(imageSur.path.lastIndexOf('/') + 1);
  image.type = imageSur.mime;
  image.dateModified = new Date();
  var formdata = new FormData();
  formdata.append('image', image, imageSur.path);
  try {
    const response = await fetch(
      'http://scrappy.world:3000/api/v1/file/upload/image',
      {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
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

export {videoUpload, imageUpload};
