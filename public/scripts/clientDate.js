// this module renders a date on the frontend when a user navigates
// to /view-date?id=[ID]

function ClientDate () {
    const clientDate = {};

    const dateDiv = document.querySelector("div#dateName");

    async function getDateID () {
        const queryString = window.location.search;
        console.log(queryString);
        const urlParams = new URLSearchParams(queryString);
        const currentDateID = urlParams.get('id');
        console.log("current date ID: ", currentDateID);

        fetchDateInfo(currentDateID);
    }

    async function fetchDateInfo(currentDateID) {
        const userDates = await fetch("/getDates");
        const dates = await userDates.json();

        const userInfo = await fetch("/getUser");
        const currUser = await userInfo.json();
        renderDate(dates, currUser, currentDateID);
    }

    // async function fetchCurrentUser(dateInfo) {
    //     const res = await fetch("/getUser");
    //     const currUser = await res.json();
    //     renderDate(dateInfo, currUser);
    // }

    function filter (dates, currentDateID) {
        for (let step = 0; step < dates.length; step++) {
            if (dates.at(step)._id === currentDateID) {
                const currentDate = dates.at(step);
                return currentDate;
            }
        }
    }

    // TODO: ADD DATE RENDERING
    function renderDate (dates, currUser, currentDateID) {

        const currentDate = filter(dates, currentDateID);

        function otherUser () {
            if (currentDate.users.at(0) === currUser) {
                return currentDate.users.at(1);
            } else {
                return currentDate.users.at(0);
            }
        }

        console.log("other user: ", otherUser);

        const dateNameDiv = document.querySelector("div#dateName");
        dateNameDiv.innerHTML = '';
        const dDiv = document.createElement("p");
        dDiv.innerHTML = `${otherUser}`;
  
    }
    
    getDateID();
    return clientDate;
}

export default ClientDate();