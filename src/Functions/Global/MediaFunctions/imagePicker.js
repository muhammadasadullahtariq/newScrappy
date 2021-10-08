import ImagePicker from 'react-native-image-crop-picker';

const imageContainer = (
  responce,
  setVideoORImageSourceArray,
  VideoOrImageSourceArray,
) => {
  try {
    if (responce == 'Take Photo') {
      try {
        ImagePicker.openCamera({
          width: 500,
          height: 500,
          cropperCircleOverlay: true,
          compressImageMaxWidth: 640,
          compressImageMaxHeight: 480,
          freeStyleCropEnabled: true,
        }).then(image => {
          console.log('asad', image);
          console.log('size', image.size);
          setVideoORImageSourceArray(s => {
            s.splice(VideoOrImageSourceArray.length - 1, 1);
            return [
              ...s,
              {flag: false, path: {uri: image.path}, responce: image},
              {path: ''},
            ];
          });
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropperCircleOverlay: true,
        freeStyleCropEnabled: true,
        compressImageMaxWidth: 640,
        compressImageMaxHeight: 480,
        avoidEmptySpaceAroundImage: true,
        maxFiles: 5,
        multiple: true,
      }).then(image => {
        console.log('asad', image);
        console.log('size', image.size);
        if (image.length > 5) {
          setAlertText('Please select only five pictures');
          setAlertFlag(true);
        } else {
          VideoOrImageSourceArray.splice(VideoOrImageSourceArray.length - 1, 1);
          for (var i = 0; i < image.length; i++) {
            setVideoORImageSourceArray(s => {
              return [
                ...s,
                {
                  flag: false,
                  path: {uri: image[i].path},
                  responce: image[i],
                },
              ];
            });
            if (i == image.length - 1) {
              setVideoORImageSourceArray(s => {
                return [...s, {path: ''}];
              });
            }
          }
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export default imageContainer;
