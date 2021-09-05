import React, {useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import imageSource from '../photos/download.jpg';
import ButtonComponent from '../components/GlobalComponent/buttonComponent';
import ContextMenu from '../components/uploadImageAndVideo/contextMenu';
import Video from 'react-native-video';
import videolink from '../photos/video.gif';
import fuu, {
  cameraOptions,
  cameraVideoOptions,
  galleryOptions,
  galleryVideOptions,
} from '../components/uploadImageAndVideo/selectImageFunctions';
import * as ImagePicker from 'react-native-image-picker';

const screen = () => {
  const imageContainer = responce => {
    if (responce == 'Take Photo') {
      ImagePicker.launchCamera(cameraOptions, responce => {
        setImageURI({uri: responce.assets[0].uri});
        //console.log(imageuri);
        console.log(responce.assets[0].uri);
      });
    } else {
      ImagePicker.launchImageLibrary(galleryOptions, responce => {
        setImageURI(responce);
        console.log(responce);
      });
    }
  };

  const videoContainer = responce => {
    console.log('Video container');
    if (responce == 'Record Video') {
      ImagePicker.launchCamera(cameraVideoOptions, responce => {
        setVideouri({uri: responce.assets[0].uri});
        console.log('asad ullah', responce);
        //console.log(responce);
      });
    } else {
      ImagePicker.launchImageLibrary(galleryVideOptions, responce => {
        //setImageURI(responce);
        console.log(responce);
      });
    }
  };
  function selectImage(resonces, index) {
    console.log('selectImage');
    setMenuFlag(false);
    if (index <= 1) {
      setimageOrVideoFlag(false);
      imageContainer(resonces);
    } else {
      setimageOrVideoFlag(true);
      videoContainer(resonces);
    }
  }

  function closeMenu() {
    setMenuFlag(false);
  }

  function uploadImage() {}
  //Flag variable declaration to indicate Menu is enabled or disabled
  const [menuFlag, setMenuFlag] = useState(false);
  const [Videouri, setVideouri] = useState(videolink);
  const [imageuri, setImageURI] = useState(imageSource);
  const [imageOrVideoFlag, setimageOrVideoFlag] = useState(false);
  return (
    <View style={styles.mainContainer}>
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
      {!imageOrVideoFlag && (
        <Image source={imageuri} style={styles.imageContainer}></Image>
      )}
      {imageOrVideoFlag && (
        <Video
          controls={true}
          paused
          resizeMode={'contain'}
          source={Videouri} // Can be a URL or a local file.
          ref={ref => {
            player = ref;
          }} // Store reference
          style={styles.backgroundVideo}
        />
      )}
      <ButtonComponent
        text="Select Image"
        style={{marginTop: 50}}
        onPress={() => setMenuFlag(true)}
      />
      <ButtonComponent
        text="Upload Image"
        style={{marginTop: 10}}
        onPress={uploadImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {alignItems: 'center'},
  imageContainer: {
    aspectRatio: 1,
    width: 300,
    height: 300,
    backgroundColor: 'red',
  },
  backgroundVideo: {
    aspectRatio: 1,
    width: 300,
    height: 300,
  },
});

export default screen;
