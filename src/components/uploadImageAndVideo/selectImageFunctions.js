import * as ImagePicker from 'react-native-image-picker';

export const cameraOptions = {
  title: 'Take Picture',
  mediaType: 'photo',
  storageOptions: {
    skipBackup: false,
    path: 'images',
  },
};

export const galleryOptions = {
  title: 'Select Picture',
  mediaType: 'photo',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export const galleryVideOptions = {
  title: 'Select Video',
  mediaType: 'video',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export const cameraVideoOptions = {
  title: 'Record Video',
  mediaType: 'video',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

// export const imageContainer = responce => {
//   let Responce = '';
//   if (responce == 'Take Photo') {
//     ImagePicker.launchCamera(cameraOptions, responce => {
//       Responce = responce;
//     });
//   } else {
//     ImagePicker.launchImageLibrary(galleryOptions, responce => {
//       Responce = responce;
//     });
//   }
//   console.log('responce', Responce);
//   return Responce;
// };

// export const videoContainer = responce => {
//   let Responce = '';
//   if (responce == 'Record Video') {
//     ImagePicker.launchCamera(cameraVideoOptions, responce => {
//       Responce = responce;
//     });
//   } else {
//     ImagePicker.launchImageLibrary(galleryVideOptions, responce => {
//       Responce = responce;
//       return responce;
//     });
//   }
//   console.log('responce', Responce);
//   return Responce;
// };

export default {
  cameraVideoOptions,
  cameraOptions,
  galleryVideOptions,
  galleryOptions,
};
