import React from 'react';
//import RNFetchBlob from 'rn-fetch-blob';
import {Platform} from "react-native";

const videoUpload = async video => {
  return await upload(video.responce);
};

async function upload(imageSur) {
  console.log(imageSur);
  var uri=Platform.OS=="ios"?imageSur.sourceURL: imageSur.path;
  var image = {};
  image.uri = uri;
  image.name = imageSur.path.substring(imageSur.path.lastIndexOf('/') + 1);
  image.type = imageSur.mime;
  image.dateModified = new Date();
  var formdata = new FormData();
  formdata.append('video', image, uri);
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
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const imageUpload = async image => {
  //console.log(image);
  console.log("called and waiting");
  const result=await registerUser(image.responce);
  //await sleep(1000);
  return result;
};

export const registerUser = async imageSur => {
  console.log(imageSur);
  var uri=Platform.OS=="ios"?imageSur.sourceURL: imageSur.path;
  console.log(uri);
  var image = {};
  image.uri = uri;
  image.name = imageSur.path.substring(imageSur.path.lastIndexOf('/') + 1);
  image.type = imageSur.mime;
  console.log(image);
  image.dateModified = new Date();
  var formdata = new FormData();
  formdata.append('image', image, uri);
  try {
    const response = await fetch(
      'http://scrappy.world:3000/api/v1/file/upload/image',
      {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      },
    );
    console.log("here and i");
    console.log(JSON.stringify(formdata))
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

export {videoUpload, imageUpload};
