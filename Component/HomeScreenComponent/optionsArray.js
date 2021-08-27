//Return Array of options available

import transfer from '../../icons/transfer.png';
import requestMoneyTransfer from '../../icons/requestMoneyTransfer.png';
import manageGroupOfFriends from '../../icons/manageGroupOfFriends.png';
import orderFoodOnline from '../../icons/orderFood.png';
import giveGift from '../../icons/giveGifts.png';
import payBills from '../../icons/payBills.png';
import buyMovieTickets from '../../icons/buyMovieTicket.png';
import allServices from '../../icons/allServises.png';
import consumerLoan from '../../icons/consumerLoan.png';
import deposit from '../../icons/deposit.png';
import withdraw from '../../icons/withdraw.png';
import payCode from '../../icons/payCode.png';
import scanCode from '../../icons/scanCode.png';
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
