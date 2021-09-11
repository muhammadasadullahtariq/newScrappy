import React, {useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import imageSource from '../../photos/download.jpg';
import ButtonComponent from '../../components/GlobalComponent/ButtonComponent';
import ContextMenu from '../../components/uploadImageAndVideo/contextMenu';
import videolink from '../../photos/video.gif';
import plusImageSource from '../../icons/WasteCollerTabScreen/plus.png';
import ImagePicker from 'react-native-image-crop-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';

const screen = () => {
  const imageContainer = responce => {
    if (responce == 'Take Photo') {
      ImagePicker.openCamera({
        width: 400,
        height: 400,
      }).then(image => {
        console.log('asad', image.path);
        setImageURI({uri: image.path});
      });
    } else {
      ImagePicker.openPicker({
        width: 400,
        height: 400,
        multiple: true,
      }).then(image => {
        console.log('asad', image.path);
        setImageURI({uri: image.path});
      });
    }
  };

  const videoContainer = responce => {
    console.log('Video container');
    if (responce == 'Record Video') {
      ImagePicker.openCamera({
        mediaType: 'video',
      }).then(video => {
        console.log('asad', video.path);
        setVideouri({uri: video.path});
      });
    } else {
      ImagePicker.openPicker({
        mediaType: 'video',
      }).then(video => {
        console.log('asad', video.path);
        setVideouri({uri: video.path});
      });
    }
  };
  function selectImage(resonces, index) {
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
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          console.log('G G');
        }}>
        <View style={styles.addImageButtonContainer}>
          <Image source={plusImageSource} style={{}} />
        </View>
      </TouchableOpacity>
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
