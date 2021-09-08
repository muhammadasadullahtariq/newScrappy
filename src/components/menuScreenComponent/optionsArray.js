//Return Array of options available

import transfer from '../../icons/MainMenu/transfer.png';
import requestMoneyTransfer from '../../icons/MainMenu/requestMoneyTransfer.png';
import manageGroupOfFriends from '../../icons/MainMenu/manageGroupOfFriends.png';
import orderFoodOnline from '../../icons/MainMenu/orderFood.png';
import giveGift from '../../icons/MainMenu/giveGifts.png';
import payBills from '../../icons/MainMenu/payBills.png';
import buyMovieTickets from '../../icons/MainMenu/buyMovieTicket.png';
import allServices from '../../icons/MainMenu/allServises.png';
import consumerLoan from '../../icons/MainMenu/consumerLoan.png';
import deposit from '../../icons/MainMenu/deposit.png';
import withdraw from '../../icons/MainMenu/withdraw.png';
import payCode from '../../icons/MainMenu/payCode.png';
import scanCode from '../../icons/MainMenu/scanCode.png';
export default arr = [
  {text: 'Transfer', image: transfer, Key: '0'},
  {text: 'Request Money Transfer', image: requestMoneyTransfer, Key: '1'},
  {text: 'Manage Group Of Friends', image: manageGroupOfFriends, Key: '2'},
  {text: 'Order Food Online', image: orderFoodOnline, Key: '3'},
  {text: 'Give Gift', image: giveGift, Key: '4'},
  {text: 'Pay Bills', image: payBills, Key: '5'},
  {text: 'Buy Movie Tickets', image: buyMovieTickets, Key: '6'},
  {text: 'Consumer Loan', image: consumerLoan, Key: '7'},
  {text: 'All Services', image: allServices, Key: '8'},
];

const cardOptionArray = [
  {text: 'Deposit', image: deposit, Key: '0'},
  {text: 'Withdrawel', image: withdraw, Key: '1'},
  {text: 'Pay Code', image: payCode, Key: '2'},
  {text: 'Scan Code', image: scanCode, Key: '3'},
];
export {cardOptionArray};
