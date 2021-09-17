import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import getScrapDetail from '../../Functions/HomeUserDashBoard/wasteDetail';
import WaitingComponent from '../../components/GlobalComponent/waitingAlertComponent';
import HeaderText from '../../components/GlobalComponent/headerText';
import InfoText from '../../components/GlobalComponent/infoText';
import VideoComponent from '../../components/GlobalComponent/MediaComponent/videoComponent';
import ImageComponent from '../../components/GlobalComponent/MediaComponent/imageComponent';

const screen = ({navigation, route}) => {
  const {id} = route.params;
  const [scrapDetail, setScrapDetail] = useState({
    data: {title: '', description: '', wasteType: ''},
    image: [],
    video: [],
  });
  const [waitingFlag, setWaitingFlag] = useState(true);
  useEffect(() => {
    console.log(id, '\tid');
    getWasteDetail();
  }, [id]);
  async function getWasteDetail() {
    let val = await getScrapDetail(id);
    console.log(`val`, val);
    setScrapDetail(val);
    setWaitingFlag(false);
    console.log(scrapDetail.data);
  }
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <WaitingComponent visible={waitingFlag} />
      <HeaderText
        heading={scrapDetail.data.title}
        style={{marginVertical: 10, fontSize: 22}}
      />
      <InfoText text={scrapDetail.data.wasteType} style={{fontSize: 17}} />
      <InfoText
        text={scrapDetail.data.description}
        style={{
          textAlign: 'left',
          marginTop: 20,
          fontSize: 15,
        }}
      />
      {scrapDetail.image.map(imag => {
        console.log('image data', imag);
        return <ImageComponent key={imag.uri} path={imag} />;
      })}
      {scrapDetail.video.map(video => {
        return <VideoComponent key={video.uri} path={video} />;
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
});

export default screen;
