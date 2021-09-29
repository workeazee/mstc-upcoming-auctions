import { ref, update } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

function checkIfPreviouslyLoggedIn() {
  if(username) {
    if (usersList[username] && usersList[username]['pw']) {
      userDetails = usersList[username]
      if (usersList[username]['pw'] == password){
        callToFetchAllAuctions();
      }
    }
  }
}

function updateOpenedDataIds() {
  update(ref(database, 'users/' + username), {
    openedDataIds: openedDataIds
  });
}
function updateStarredDataIds() {
  update(ref(database, 'users/' + username), {
    starredDataIds: starredDataIds
  });
}
function updateIgnoredDataIds() {
  update(ref(database, 'users/' + username), {
    ignoredDataIds: ignoredDataIds
  });
}

window.checkIfPreviouslyLoggedIn = checkIfPreviouslyLoggedIn;
window.updateOpenedDataIds = updateOpenedDataIds;
window.updateStarredDataIds = updateStarredDataIds;
window.updateIgnoredDataIds = updateIgnoredDataIds;