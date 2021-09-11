import React, {useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import ButtonComponent from '../../components/GlobalComponent/ButtonComponent';
import ContextMenu from '../../components/uploadImageAndVideo/contextMenu';
import plusImageSource from '../../icons/WasteCollerTabScreen/plus.png';
import ImagePicker from 'react-native-image-crop-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import VideoOrImage from '../../components/WasteCollectorTabScreen/videoOrImageMap';
import imageSorce from '../../photos/download.jpg';
import VideoSource from '../../photos/video.gif';

const screen = () => {
  const imageContainer = responce => {
    try {
      if (responce == 'Take Photo') {
        ImagePicker.openCamera({
          width: 400,
          height: 400,
        }).then(image => {
          console.log('asad', image);
          setVideoORImageSourceArray(s => {
            s.splice(VideoOrImageSourceArray.length - 1, 1);
            return [...s, {flag: false, path: {uri: image.path}}, {path: ''}];
          });
        });
      } else {
        ImagePicker.openPicker({
          width: 400,
          height: 400,
          multiple: true,
        }).then(image => {
          console.log('asad', image);
          VideoOrImageSourceArray.splice(VideoOrImageSourceArray.length - 1, 1);
          for (var i = 0; i < image.length; i++) {
            setVideoORImageSourceArray(s => {
              return [...s, {flag: false, path: {uri: image[i].path}}];
            });
            if (i == image.length - 1) {
              setVideoORImageSourceArray(s => {
                return [...s, {path: ''}];
              });
            }
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const videoContainer = responce => {
    console.log('Video container');
    if (responce == 'Record Video') {
      ImagePicker.openCamera({
        mediaType: 'video',
      }).then(video => {
        console.log('asad', video.path);
        setVideoORImageSourceArray(s => {
          s.splice(VideoOrImageSourceArray.length - 1, 1);
          return [...s, {flag: true, path: {uri: video.path}}, {path: ''}];
        });
      });
    } else {
      ImagePicker.openPicker({
        mediaType: 'video',
      }).then(video => {
        console.log('asad', video.path);
        setVideoORImageSourceArray(s => {
          s.splice(VideoOrImageSourceArray.length - 1, 1);
          return [...s, {flag: true, path: {uri: video.path}}, {path: ''}];
        });
      });
    }
  };
  function selectImage(resonces, index) {
    setMenuFlag(false);
    console.log('asad', VideoOrImageSourceArray);
    if (index <= 1) {
      imageContainer(resonces);
    } else {
      videoContainer(resonces);
    }
  }

  function closeMenu() {
    setMenuFlag(false);
  }

  function uploadImage() {}
  //Flag variable declaration to indicate Menu is enabled or disabled
  const [menuFlag, setMenuFlag] = useState(false);
  const [VideoOrImageSourceArray, setVideoORImageSourceArray] = useState([
    {path: ''},
  ]);
  return (
    <View style={styles.mainContainer}>
      <VideoOrImage
        Array={VideoOrImageSourceArray}
        onPress={() => setMenuFlag(true)}
      />
      <ContextMenu
        visibal={menuFlag}
        array={[
          'Take Photo',
          'Choose From Gallery',
          'Record Video',
          'Select video',
        ]}
        heading="Select Avatar"
        itemPressed={selectImage}
        closeMenu={closeMenu}
      />
      <View style={{flex: 1}}></View>
      <ButtonComponent
        text="Next"
        style={{width: 200, marginBottom: 50}}
        onPress={uploadImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {alignItems: 'center', flex: 1},
  addImageButtonContainer: {
    backgroundColor: 'white',
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#979797',
  },
});

export default screen;
