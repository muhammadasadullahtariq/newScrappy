import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import getScrapDetail from '../../Functions/HomeUserDashBoard/wasteDetail';
import WaitingComponent from '../../components/GlobalComponent/waitingAlertComponent';
import HeaderText from '../../components/GlobalComponent/headerText';
import InfoText from '../../components/GlobalComponent/infoText';
import VideoComponent from '../../components/GlobalComponent/MediaComponent/videoComponent';
import ImageComponent from '../../components/GlobalComponent/MediaComponent/imageComponent';
import Video from 'react-native-video';
import loadBiddingData from '../../Functions/HomeUserDashBoard/lodeBiddingData';
import BiddingComponent from '../../components/PublicUserComponent/biddingComponent';
import DisableButton from '../../components/PublicUserComponent/biddDisabledButton';

const screen = ({navigation, route}) => {
  const {id} = route.params;
  const [scrapDetail, setScrapDetail] = useState({
    _data: {title: '', description: '', wasteType: ''},
    image: [],
    video: [],
    _winner_data: {},
  });
  const [biddingData, setBiddingData] = useState([]);
  const [waitingFlag, setWaitingFlag] = useState(true);
  useEffect(() => {
    console.log(id, '\tid');
    getWasteDetail();
  }, [id]);
  async function getWasteDetail() {
    let val = await getScrapDetail(id);
    var dat = await loadBiddingData(id);
    console.log('bidding data', dat);
    setBiddingData(dat.data);
    console.error(`val`, val);
    setScrapDetail(val);
    setWaitingFlag(false);
  }
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <WaitingComponent visible={waitingFlag} />
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
      {scrapDetail.image.map((imag, index) => {
        console.log('image data', imag);
        console.log(index);
        return <ImageComponent key={imag.uri} path={imag} flag={true} />;
      })}
      {scrapDetail.video.map(video => {
        console.log('Video', video);
        return <VideoComponent path={video} />;
      })}
      {biddingData.length > 0 && (
        <View>
          <View style={{marginBottom: 30}} />
          <HeaderText heading={'Biddes'} />
        </View>
      )}
      <View style={{marginBottom: 10}} />
      {biddingData.map(item => {
        console.error(scrapDetail._winner_data, 'Asad');
        if (Object.keys(scrapDetail._winner_data).length == 0) {
          return (
            <View>
              <BiddingComponent
                key={item._id}
                id={item._id}
                bid={item.bidPrice}
              />
            </View>
          );
        } else {
          return (
            <View>
              <DisableButton key={item._id} id={item._id} bid={item.bidPrice} />
            </View>
          );
        }
      })}
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
