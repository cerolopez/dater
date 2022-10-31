// this module renders a date on the frontend when a user navigates
// to /view-date?id=[ID]

function ClientDate () {
    const clientDate = {};

    const dateDiv = document.querySelector("div#newDateContent");

    async function getDateID () {
        const queryString = window.location.search;
        console.log(queryString);
        const urlParams = new URLSearchParams(queryString);
        const currentDateID = urlParams.get('id');
        console.log("current date ID: ", currentDateID);

        fetchDateInfo(currentDateID);
    }

    async function fetchDateInfo(idToQuery) {
        const res = await fetch("/get-date", {
            method: "GET",
            id: idToQuery
        });
        const dateInfo = await res.json();
        renderDate(dateInfo);
    }

    // TODO: ADD DATE RENDERING
    function renderDate (dateInfo) {
        // do something
        console.log("date info: ", dateInfo);
  
        //fetch data
        // add logic to render date on frontend
  
        }
    
    getDateID();
    return clientDate;
}

export default ClientDate();