import React, {useState, useEffect, useRef} from 'react';
import {ScrollView, StyleSheet, View, Dimensions} from 'react-native';
import getScrapDetail from '../../Functions/HomeUserDashBoard/wasteDetail';
import WaitingComponent from '../../components/GlobalComponent/waitingAlertComponent';
import HeaderText from '../../components/GlobalComponent/headerText';
import InfoText from '../../components/GlobalComponent/infoText';
import VideoComponent from '../../components/GlobalComponent/MediaComponent/videoComponent';
import ImageComponent from '../../components/GlobalComponent/MediaComponent/imageComponent';
import combineVideoAndImages from '../../Functions/Global/combineImagesAndVideos';
import Carousel from 'react-native-snap-carousel';
import ButtonComponent from '../../components/GlobalComponent/ButtonComponent';
import Alert from '../../components/GlobalComponent/singleButtonAlert';

const screen = ({navigation, route}) => {
  const {id} = route.params;
  const {yourBid} = route.params;
  const {timeLeft} = route.params;
  const {higestBid} = route.params;
  const {winner} = route.params;
  const {status} = route.params;
  const c = useRef();
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
  const [alertFlag, setAlertFlag] = useState(false);
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

  function placeAndChangeBid() {
    navigation.navigate('AddBid', {
      id: id,
      yourBid: yourBid,
      timeLeft: timeLeft,
    });
  }

  function collectScap() {
    setAlertFlag(true);
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
      <Alert
        visible={alertFlag}
        onPress={() => {
          setAlertFlag(false);
        }}
        text={'Scrap Collected'}
      />
      <HeaderText
        heading={scrapDetail._data.title}
        style={{marginVertical: 10, fontSize: 22}}
      />
      <InfoText text={scrapDetail._data.wasteType} style={{fontSize: 17}} />

      <View style={{marginBottom: 10}}></View>
      <View style={{}}>
        <Carousel
          ref={c}
          data={imageAndVideoArr}
          renderItem={renderData}
          sliderWidth={windowWidth}
          itemWidth={windowWidth - 100}
        />
      </View>
      <InfoText
        text={scrapDetail._data.description}
        style={{
          textAlign: 'left',
          marginTop: 20,
          fontSize: 15,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          marginTop: 12,
          alignSelf: 'center',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <InfoText text={'Highest'} style={{color: '#ca2a33'}} />
        <InfoText
          text={'£  ' + higestBid}
          style={{color: '#092058', paddingLeft: 0}}
        />
      </View>
      {Object.keys(winner).length == 0 && status == 'Active' && (
        <ButtonComponent
          style={{borderRadius: 10}}
          text={yourBid == 0 ? 'Place Bid' : 'Change Bid'}
          onPress={placeAndChangeBid}
        />
      )}
      {Object.keys(winner).length != 0 && (
        <ButtonComponent
          style={{borderRadius: 10}}
          text={'Collect scrap'}
          onPress={collectScap}
        />
      )}
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
