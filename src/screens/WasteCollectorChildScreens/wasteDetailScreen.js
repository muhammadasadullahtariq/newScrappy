import React, {useState, useEffect,useRef} from 'react';
import {ScrollView, StyleSheet, View,Dimensions} from 'react-native';
import getScrapDetail from '../../Functions/HomeUserDashBoard/wasteDetail';
import WaitingComponent from '../../components/GlobalComponent/waitingAlertComponent';
import HeaderText from '../../components/GlobalComponent/headerText';
import InfoText from '../../components/GlobalComponent/infoText';
import VideoComponent from '../../components/GlobalComponent/MediaComponent/videoComponent';
import ImageComponent from '../../components/GlobalComponent/MediaComponent/imageComponent';
import Video from 'react-native-video';
import combineVideoAndImages from '../../Functions/Global/combineImagesAndVideos';
import Carousel from 'react-native-snap-carousel';

const screen = ({navigation, route}) => {
  const {id} = route.params;
  const c=useRef()
  const [scrapDetail, setScrapDetail] = useState({
    _data: {title: '', description: '', wasteType: ''},
    image: [],
    video: [],
  });
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get('window').width,
  );
  const [imageAndVideoArr, setVideoAndImages] = useState([]);
  const [waitingFlag, setWaitingFlag] = useState(true);
  useEffect(() => {
    console.log(id, '\tid');
    getWasteDetail();
  }, [id]);
  async function getWasteDetail() {
    let val = await getScrapDetail(id);
    console.log(`val`, val);
    setScrapDetail(val);
    var data = await combineVideoAndImages(val);
    setVideoAndImages(data);
    setWaitingFlag(false);
    console.log(scrapDetail.data);
  }

  function renderData(item) {
    console.error('this is what', item);
    if (!item.item.flag) {
      return (
        <ImageComponent
          key={item.item.path.uri}
          path={item.item.path}
          flag={true}
        />
      );
    } else {
      return <VideoComponent path={item.item.path} />;
    }
  }

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <WaitingComponent visible={waitingFlag} />
      <View style={{}}>
      <Carousel
        ref={c}
        data={imageAndVideoArr}
        renderItem={renderData}
        sliderWidth={windowWidth}
        itemWidth={windowWidth - 100}
        
      />
      </View>
      <HeaderText
        heading={scrapDetail._data.title}
        style={{marginVertical: 10, fontSize: 22}}
      />
      <InfoText text={scrapDetail._data.wasteType} style={{fontSize: 17}} />
      <InfoText
        text={scrapDetail._data.description}
        style={{
          textAlign: 'left',
          marginTop: 20,
          fontSize: 15,
        }}
      />
      <View style={{marginBottom: 10}}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  backgroundVideo: {
    width: '99%',
    height: 400,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 10,
    marginRight: 10,
    backgroundColor: 'red',
  },
});

export default screen;

//'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
