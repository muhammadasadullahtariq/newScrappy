//Return Array of options available

import reNew from '../../icons/WasteCollerTabScreen/reNew.png';
import orderImage from '../../icons/WasteCollerTabScreen/postImage.png';
import sellSrap from '../../icons/WasteCollerTabScreen/sellScrap.png';

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

export default arr = [
  {
    text: 'House hold metal scrap',
    image: orderImage,
    Key: '0',
    date: today,
    higestBid: '50',
    bidCount: 2,
    status: 'Active',
  },
  {
    text: 'Paper Scrap,cardboard',
    image: orderImage,
    Key: '1',
    date: today,
    higestBid: '50',
    bidCount: 1,
    status: 'Active',
  },
  {
    text: 'Plastic waste',
    image: orderImage,
    Key: '2',
    date: today,
    higestBid: '',
    bidCount: 0,
    status: 'Active',
  },
];

const cardOptionArray = [{text: 'Sell Scrap', image: sellSrap, Key: '0'}];
export {cardOptionArray};
