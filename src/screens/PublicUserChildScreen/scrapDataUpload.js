import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import ButtonComponent from '../../components/GlobalComponent/ButtonComponent';
import ContextMenu from '../../components/uploadImageAndVideo/contextMenu';
import VideoOrImage from '../../components/PublicUserComponent/videoOrImageMap';
import SingleButtonAlert from '../../components/GlobalComponent/singleButtonAlert';
import WaitAlert from '../../components/GlobalComponent/waitingAlertComponent';
import InputTextComponent from '../../components/GlobalComponent/inputComponent';
import scrapDataUpload from '../../Functions/Global/uploadListOfFiles';
import {useIsFocused} from '@react-navigation/native';
import HeaderText from '../../components/GlobalComponent/headerText';
import imageContainer from '../../Functions/Global/MediaFunctions/imagePicker';
import videoContainer from '../../Functions/Global/MediaFunctions/videoPicker';
//import auth from '@react-native-firebase/auth';

const screen = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const [alertFlag, setAlertFlag] = useState(false);
  const [alertText, setAlertText] = useState('User Can Only Upload 5 Pictures');
  const [waitingAlertFlag, setWaitingAlertFlag] = useState(false);
  const [videoFlag, setVideoFlag] = useState(false);
  const [alertWithAction, setAlertWithAction] = useState(false);
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [menuFlag, setMenuFlag] = useState(false);
  const [VideoOrImageSourceArray, setVideoORImageSourceArray] = useState([
    {path: ''},
  ]);
  const {catagory} = route.params;
  //const catagory = 'test';
  function alertHandler() {
    setAlertFlag(false);
  }

  function alertHandlerWithAction() {
    setAlertWithAction(false);
    navigation.navigate('PublicUser');
  }

  function selectImage(resonces, index) {
    setMenuFlag(false);
    console.log('asad', VideoOrImageSourceArray);
    setTimeout(() => {
      if (index <= 1) {
        imageContainer(
          resonces,
          setVideoORImageSourceArray,
          VideoOrImageSourceArray,
        );
      } else {
        if (!videoFlag) {
          videoContainer(
            resonces,
            setVideoORImageSourceArray,
            VideoOrImageSourceArray,
          );
          setVideoFlag(true);
        } else {
          setAlertText('User can Only Upload One Video');
          setAlertFlag(true);
        }
      }
    }, 500);
  }

  function closeMenu() {
    setMenuFlag(false);
  }

  async function uploadImage() {
    if (title == '') {
      setAlertText('Please Enter Title');
      setAlertFlag(true);
      return;
    } else if (detail.length < 5) {
      setAlertText('Please Enter Detail');
      setAlertFlag(true);
      return;
    } else {
      setWaitingAlertFlag(true);
      const responce = await scrapDataUpload(
        global.id,
        catagory,
        title,
        detail,
        VideoOrImageSourceArray,
      );
      setWaitingAlertFlag(false);
      setAlertText(responce);
      setAlertWithAction(true);
      console.log(responce);
    }
  }
  useEffect(() => {
    if (isFocused) {
      setVideoORImageSourceArray([{path: ''}]);
    }
  }, [isFocused]);
  return (
    <View style={styles.mainContainer}>
      <VideoOrImage
        Array={VideoOrImageSourceArray}
        onPress={() => {
          if (VideoOrImageSourceArray.length > 5) {
            setAlertText('User can only Upload 5 pictures and video');
            setAlertFlag(true);
          } else setMenuFlag(true);
        }}
      />
      <HeaderText
        heading="Add upto 5 pictures and video"
        style={{marginTop: 20}}
      />
      <HeaderText heading="Enter Title" style={{marginTop: 20}} />
      <InputTextComponent
        placeHolder="Enter Title"
        value={title}
        style={{marginTop: 10, justifyContent: 'center'}}
        style1={{textAlign: 'left'}}
        textHandler={s => setTitle(s)}
      />
      <HeaderText
        heading="Enter Detail"
        style={{marginTop: 20, marginBottom: 40}}
      />
      <InputTextComponent
        placeHolder="Detail"
        numberOfLines={5}
        text={detail}
        flag={true}
        multiLine={true}
        style={{justifyContent: 'center', marginTop: 20}}
        style1={{marginTop: 10, height: 150, textAlign: 'left'}}
        textHandler={s => setDetail(s)}
      />
      <WaitAlert visible={waitingAlertFlag} />
      <SingleButtonAlert
        visible={alertFlag}
        text={alertText}
        onPress={alertHandler}
      />
      <SingleButtonAlert
        visible={alertWithAction}
        text={alertText}
        onPress={alertHandlerWithAction}
      />
      <ContextMenu
        visible={menuFlag}
        array={[
          'Take Photo',
          'Choose From Gallery',
          'Record Video',
          'Select video',
        ]}
        heading="Select Pictures & Videos"
        itemPressed={selectImage}
        closeMenu={closeMenu}
      />
      <View style={{flex: 1}}></View>
      <ButtonComponent
        text="Next"
        style={{width: 250, marginBottom: 40}}
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
