import ImagePicker from 'react-native-image-crop-picker';

const videoContainer = (
  responce,
  setVideoORImageSourceArray,
  VideoOrImageSourceArray,
) => {
  console.log('Video container');
  if (responce == 'Record Video') {
    ImagePicker.openCamera({
      mediaType: 'video',
      compressVideoPreset: 'LowQuality',
    }).then(video => {
      console.log('asad', video);
      console.log('size', video.size);
      if (video.size > 15000000) {
        setAlertText('Image size Cannot be greater than 15mb');
        setAlertFlag(true);
        return;
      }
      setVideoORImageSourceArray(s => {
        s.splice(VideoOrImageSourceArray.length - 1, 1);
        return [
          ...s,
          {flag: true, path: {uri: video.path}, responce: video},
          {path: ''},
        ];
      });
    });
  } else {
    ImagePicker.openPicker({
      mediaType: 'video',
      compressVideoPreset: 'LowQuality',
    }).then(video => {
      console.log('asad', video.path);
      console.log('size', video.size);
      if (video.size > 15000000) {
        setAlertText('Image size Cannot be greater than 15mb');
        setAlertFlag(true);
        return;
      }
      setVideoORImageSourceArray(s => {
        s.splice(VideoOrImageSourceArray.length - 1, 1);
        return [
          ...s,
          {flag: true, path: {uri: video.path, responce: video}},
          {path: ''},
        ];
      });
    });
  }
};

export default videoContainer;
