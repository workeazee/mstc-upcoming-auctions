var allAuctions = []; // Array of all auctions retrieved from mstc endpoint
var latestAuctions = []; // Array of allAuctions minus the starred and ignored auctions
var starredAuctions = []; // Array of starred auctions
var ignoredAuctions = []; // Array of ignored auctions

var latestAuctionTable; // Ref to latestAuctionTable
var starredAuctionTable; // Ref to starredAuctionTable
var ignoredAuctionTable; // Ref to ignoredAuctionTable

// To stop the loader
function stopLoader() {
    $('#loading-screen').hide();
    $('#main').show();
}

// To update openedDataIds and add to firebase realtime database and refresh data in tables
function moveToOpened(e){
    var toastHTML = '<span>Link opened in new tab</span>';
    M.toast({html: toastHTML, classes: 'rounded blue-grey darken-2 z-depth-5', displayLength: 2000});
    var auctionId = e.getAttribute('auction-id');
    if (!openedDataIds.ids.includes(auctionId)) {
        openedDataIds.ids.push(auctionId);
        // updateOpenedDataIds();
        refreshData();
    }
}

// To update starredDataIds and add to firebase realtime database and refresh data in tables
function moveToStarred(e){
    var toastHTML = '<span>Moved to starred auctions</span>';
    M.toast({html: toastHTML, classes: 'rounded blue-grey darken-2 z-depth-5', displayLength: 2000});
    var auctionId = e.getAttribute('auction-id');
    if (!starredDataIds.ids.includes(auctionId)) {
        starredDataIds.ids.push(auctionId);
        // updateStarredDataIds();
        refreshData();
    }
}

// To update ignoredDataIds and add to firebase realtime database and refresh data in tables
function moveToIgnored(e){
    var toastHTML = '<span>Moved to ignored auctions</span>';
    M.toast({html: toastHTML, classes: 'rounded blue-grey darken-2 z-depth-5', displayLength: 2000});
    var auctionId = e.getAttribute('auction-id');
    if (!ignoredDataIds.ids.includes(auctionId)) {
        ignoredDataIds.ids.push(auctionId);
        // updateIgnoredDataIds();
        refreshData();
    }
}
        
// To update the data of all auctions as per data ids and to call to populate the tables
function refreshData(){
    latestAuctions = allAuctions.filter((auction) => !(starredDataIds.ids.includes(auction.id) || ignoredDataIds.ids.includes(auction.id)));
    starredAuctions = allAuctions.filter((auction) => starredDataIds.ids.includes(auction.id));
    ignoredAuctions = allAuctions.filter((auction) => ignoredDataIds.ids.includes(auction.id));
    stopLoader();
    populateLatestTableWithData();
    populateStarredTableWithData();
    populateIgnoredTableWithData();
}

// To populate the latest auctions table
function populateLatestTableWithData(){
    if(latestAuctionTable)
        latestAuctionTable.destroy();
    latestAuctionTable = $('#lastestDataTable').DataTable({
        data: latestAuctions,
        autoWidth: false,
        pageLength: 100,
        order: [[4, 'asc']],
        columns: [
            {
                className: 'link-to-auction',
                data: null,
                render: function(data, type, full, meta){
                    if (openedDataIds.ids.includes(data.id))
                        return '<a auction-id='+data.id+' href="'+auctionDetailsLink+data.id+'" target="_blank" onclick="moveToOpened(this);">'+data.text+'</a>';
                    else
                        return '<a auction-id='+data.id+' href="'+auctionDetailsLink+data.id+'" target="_blank" onclick="moveToOpened(this);"><i class="material-icons new-release">new_releases</i>'+data.text+'</a>';
                }
            },
            { 
                data: 'region',
                visible: false
            },
            { data: 'OFF_NAME' },
            {
                className: 'opening',
                data: null,
                render: function(data, type, full, meta){
                    return moment(data.opening.replace("::", " "), "DD/MM/YYYY hh:mm:ss").format();
                }
            },
            {
                className: 'closing-time',
                data: null,
                render: function(data, type, full, meta){
                    return moment(data.Closing.replace("::", " "), "DD/MM/YYYY hh:mm:ss").format();
                }
            },
            { data: 'id' },
            {
                className: 'star',
                data: null,
                render: function(data, type, full, meta){
                    return '<button auction-id='+data.id+' class="btn waves-effect btn-danger pull-right green darken-2" onclick="moveToStarred(this);"><i class="material-icons center">star_border</i></button>'
                }
            },
            {
                className: 'ignore',
                data: null,
                render: function(data, type, full, meta){
                    return '<button auction-id='+data.id+' class="btn waves-effect btn-danger pull-right red darken-3" onclick="moveToIgnored(this);"><i class="material-icons center">delete_sweep</button>';
                }
            }
        ]
    });
}

// To populate the starred auctions table
function populateStarredTableWithData(){
    if(starredAuctionTable)
        starredAuctionTable.destroy();
    starredAuctionTable = $('#starredDataTable').DataTable({
        data: starredAuctions,
        autoWidth: false,
        pageLength: 100,
        order: [[4, 'asc']],
        columns: [
            {
                className: 'link-to-auction',
                data: null,
                render: function(data, type, full, meta){
                    if (openedDataIds.ids.includes(data.id))
                        return '<a auction-id='+data.id+' href="'+auctionDetailsLink+data.id+'" target="_blank" onclick="moveToOpened(this);">'+data.text+'</a>';
                    else
                        return '<a auction-id='+data.id+' href="'+auctionDetailsLink+data.id+'" target="_blank" onclick="moveToOpened(this);"><i class="material-icons new-release">new_releases</i>'+data.text+'</a>';
                }
            },
            { 
                data: 'region',
                visible: false
            },
            { data: 'OFF_NAME' },
            {
                className: 'opening',
                data: null,
                render: function(data, type, full, meta){
                    return moment(data.opening.replace("::", " "), "DD/MM/YYYY hh:mm:ss").format();
                }
            },
            {
                className: 'closing-time',
                data: null,
                render: function(data, type, full, meta){
                    return moment(data.Closing.replace("::", " "), "DD/MM/YYYY hh:mm:ss").format();
                }
            },
            { data: 'id' }
        ]
    });
}

// To populate the ignored auctions table
function populateIgnoredTableWithData(){
    if(ignoredAuctionTable)
        ignoredAuctionTable.destroy();
    ignoredAuctionTable = $('#ignoredDataTable').DataTable({
        data: ignoredAuctions,
        autoWidth: false,
        pageLength: 100,
        order: [[4, 'asc']],
        columns: [
            {
                className: 'link-to-auction',
                data: null,
                render: function(data, type, full, meta){
                    if (openedDataIds.ids.includes(data.id))
                        return '<a auction-id='+data.id+' href="'+auctionDetailsLink+data.id+'" target="_blank" onclick="moveToOpened(this);">'+data.text+'</a>';
                    else
                        return '<a auction-id='+data.id+' href="'+auctionDetailsLink+data.id+'" target="_blank" onclick="moveToOpened(this);"><i class="material-icons new-release">new_releases</i>'+data.text+'</a>';
                }
            },
            { 
                data: 'region',
                visible: false
            },
            { data: 'OFF_NAME' },
            {
                className: 'opening',
                data: null,
                render: function(data, type, full, meta){
                    return moment(data.opening.replace("::", " "), "DD/MM/YYYY hh:mm:ss").format();
                }
            },
            {
                className: 'closing-time',
                data: null,
                render: function(data, type, full, meta){
                    return moment(data.Closing.replace("::", " "), "DD/MM/YYYY hh:mm:ss").format();
                }
            },
            { data: 'id' }
        ]
    });
}

function callToFetchAllAuctions() {
    $('#modal').modal('close'); 
    $.when(fetchAllAuctions()).then(function() {
        if (lastestDataIds.length > 0) {
            openedDataIds = userDetails.openedDataIds || {ids: []};
            starredDataIds = userDetails.starredDataIds || {ids: []};
            ignoredDataIds = userDetails.ignoredDataIds || {ids: []};
    
            // Clean up firebase realtime database if id is not present in current data auctions
            openedDataIds.ids = openedDataIds.ids.filter((id) => lastestDataIds.includes(id));
            starredDataIds.ids = starredDataIds.ids.filter((id) => lastestDataIds.includes(id));
            ignoredDataIds.ids = ignoredDataIds.ids.filter((id) => lastestDataIds.includes(id));
            if (isLoggedIn) {
                // updateOpenedDataIds();
                // updateStarredDataIds();
                // updateIgnoredDataIds();
                refreshData();
            }
        }
    });
}

function validateLogin() {
    const un = $('#username').val();
    const pw = $('#password').val();
    if (usersList[un] && usersList[un]['pw']) {
        if (usersList[un]['pw'] == pw) {
            isLoggedIn = true;
            userDetails = usersList[un]
            localStorage.setItem('username', un);
            username = localStorage.getItem('username')
            localStorage.setItem('password', pw);
            password = localStorage.getItem('password')
            callToFetchAllAuctions();
        } else {
            var toastHTML = '<span>Invalid Login</span>';
            M.toast({html: toastHTML, classes: 'rounded blue-grey darken-2 z-depth-5', displayLength: 2000});
        }
    } else {
        var toastHTML = '<span>Invalid Login</span>';
        M.toast({html: toastHTML, classes: 'rounded blue-grey darken-2 z-depth-5', displayLength: 2000});
    }
}

// Call the api to get data and return it
function callApi(location){
    return $.ajax({
        type: 'GET',
        url: getScrollMsg+location,
        async: false,
    });
}

// To loop and call the api method with all locations info
function fetchAllAuctions() {
    locations.map((location) => {
        $.when(callApi(location)).done(function (data) {
            if (data && data[0].auction) {
                var newAuctions = data[0].auction;
                // Push the new auctions recieved from api to the allAuctions
                Array.prototype.push.apply(allAuctions, newAuctions);
                // Update lastestDataIds with the id of the new auctions
                newAuctions.map((newAuction) => {
                    lastestDataIds.push(newAuction.id);
                });
            }
        });
    });
}

$(document).ready(function () {
    $('.tabs').tabs(); // To call materialize tabs
    $('.modal').modal(); // To call materialize modals
    $('.modal').modal('open'); 
});