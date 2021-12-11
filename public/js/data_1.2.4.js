const getlastupdate = "https://www.mstcindia.co.in/stockservice/getlastupdate";
const getstockvalues = "https://www.mstcindia.co.in/stockservice/getstockvalues";

const locations = ['HO', 'BBR', 'BPL', 'BLR', 'CDG', 'ERO', 'GHY', 'HYD', 'JPR', 'LKO', 'NRO', 'RNC', 'RPR', 'SRO', 'TVC', 'VAD', 'BZA', 'VZG', 'WRO'];

const getScrollMsg = "https://www.mstcindia.co.in/mstcwebservice/Service.svc/getScrollMsg/" 

const auctionDetailsLink = "https://www.mstcindia.co.in/TenderEntry/Lot_Item_Details_AucID.aspx?ARID=";

var lastestDataIds = [];

var starredDataIds;
var openedDataIds;
var ignoredDataIds;

var defaultIgnoredDataIds;

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

const defaultIgnoreContents = ['FOREST',
                                'DMG',
                                'STATE ROAD TRANSPORT',
                                'BSNL',
                                'NAFED',
                                'MUNICIPAL',
                                'POLICE',
                                'UPSRTC',
                                'HOSPITAL',
                                'CENSUS OPERATIONS',
                                'DEPUTY COMMISSIONER',
                                'MINERAL DEVELOPMENT',
                                'MINERAL RESOURCES DEPARTMENT',
                                'COURT',
                                'BHARAT SANCHAR NIGAM',
                                'BHARTI AIRTEL',
                                'UNIVERSITY',
                                'POSTAL',
                                'LIVESTOCK',
                                'CANTONMENT',
                                'COBRA',
                                'ARIEL SURVEYS',
                                'LKO/UTTAR PRADESH',
                                'JPR/DEO',
                                'INDUS TOWERS',
                                'GEOLOGY AND MINING',
                                'POST',
                                'TRANPORT',
                                'PUNJAB ROADWAYS',
                                'TIMBER',
                                'TRAFFIC',
                                'FOOD CORPORATION',
                                'INSURANCE',
                                'DOORDARSHAN',
                                'VIDYALAYA',
                                'SEEDS',
                                'HEALTH',
                                'GEOLOGY',
                                'COAL',
                                'FORENSIC',
                                'SURGEON',
                                'CONSUMER',
                                'BHARAT SANCHAR'
                                ];