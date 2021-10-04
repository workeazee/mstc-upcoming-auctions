const getlastupdate = "https://www.mstcindia.co.in/stockservice/getlastupdate";
const getstockvalues = "https://www.mstcindia.co.in/stockservice/getstockvalues";

const locations = ['HO', 'BBR', 'BPL', 'BLR', 'CDG', 'ERO', 'GHY', 'HYD', 'JPR', 'LKO', 'NRO', 'RNC', 'RPR', 'SRO', 'TVC', 'VAD', 'BZA', 'VZG', 'WRO'];

const getScrollMsg = "https://www.mstcindia.co.in/mstcwebservice/Service.svc/getScrollMsg/" 

const auctionDetailsLink = "https://www.mstcindia.co.in/TenderEntry/Lot_Item_Details_AucID.aspx?ARID=";

var lastestDataIds = [];

var starredDataIds;
var openedDataIds;
var ignoredDataIds;

var usersList;
var userDetails;

var database;

var isLoggedIn;

if(!localStorage.getItem('username'))
    localStorage.setItem('username', '');
if(!localStorage.getItem('password'))
    localStorage.setItem('password', '');

var username = localStorage.getItem('username');
var password = localStorage.getItem('password');