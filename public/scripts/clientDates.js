import clientUtil from "./clientUtilities.js";

function ClientDates() {
  const clientDates = {};
  let currentUser = null;
  const divMsg = document.querySelector("div#msg");

  // ---------------------- FRONTEND RENDER FUNCTIONS ---------------------------
  function renderDates (userDates) {
    const datesDiv = document.querySelector("div#newDateContent");
    datesDiv.innerHTML = '';

    for (let step = 0; step < userDates.length; step++) {
      const currentDateID = userDates.at(step)._id;
      const currentDate = userDates.at(step).date;
      const dDiv = document.createElement("div");
      dDiv.innerHTML = `

        <div class="d-flex justify-content-center">
        <div class="card dash-card text-center">
          <div class="card-body">
          <h3><a href="/view-date.html?id=${currentDateID}" id="viewDate">
          <p id="inverse-color">${currentDate}</p>
          </a></h3>
          </div>
          </div>
          </div>
      `;

      datesDiv.appendChild(dDiv);
    }
  }

  function renderDateStatus(dateName) {
    // add date's name to header
    const dateNameDiv = document.querySelector('div#dateName');
    dateNameDiv.innerHTML = '';
    const dateDiv = document.createElement("div");
    dateDiv.innerHTML = `
    <h1 id="dash-header"><strong>You and ${dateName}</strong></h1>
    `;
    dateNameDiv.appendChild(dateDiv);

    // add date's status
    const dateStatusDiv = document.querySelector('div#dateStatus');
    dateStatusDiv.innerHTML = '';
    const dStatDiv = document.createElement("div");
    dStatDiv.innerHTML = `
    <p>${dateName} hasn't answered their questions yet.</p>
    `;
    dateStatusDiv.appendChild(dStatDiv);
  }

  function renderDate (currentDate) {
    const clientName = currentUser.name;
    let dateName = currentDate.at(0).users.at(0).name;

    if (dateName === clientName) {
      dateName = currentDate.at(0).users.at(1).name;
    }

    renderDateStatus(dateName);

    // render client status here
    let clientSurvey = currentDate.at(0).users.at(0).formResponses;
    //let surveyStr = JSON.stringify(clientSurvey);
    console.log(clientSurvey);

    const dStatDiv = document.createElement("div");
    const dateStatusDiv = document.querySelector('div#clientStatus');
    dateStatusDiv.innerHTML = '';

    // TODO: FIGURE OUT HOW TO DISPLAY ON FRONTEND
    if (clientSurvey) {
      dStatDiv.innerHTML = `
        ${clientSurvey.form-responses}
    `;
    } else {
      dStatDiv.innerHTML = `
    <div class="btn btn-primary"><a href="/answer-questions.html" id="viewDate">Answer questions</a></div>
    `;
    }
    dateStatusDiv.appendChild(dStatDiv);
  }

  function showMessage(msg) {
    // divMsg.querySelector("#msgContent").innerHTML = msg;
    // divMsg.style.display = "block";
    console.log(msg);
  }

  // ---------------------- HELPER FUNCTIONS ---------------------------------

    function redirect(page) {
        setTimeout(() => {
          window.location.replace(page + ".html");
        }, 500);
      }

      function getCurrentDateID () {
        const queryString = window.location.search;
        console.log(queryString);
        const urlParams = new URLSearchParams(queryString);
        const currentDateID = urlParams.get('id');
        console.log("current date ID: ", currentDateID);

        return currentDateID;
    }

    // ---------------------- ROUTE FUNCTIONS ---------------------------------

      async function getCurrentUser() {
        let res;
        try {
            res = await fetch("./getUser");
            const resUser = await res.json();
        if (resUser.isLoggedIn) {
            currentUser = resUser.user;
            console.log("current user: ", currentUser);
        } else {
            currentUser = null;
            redirect('login');
        }
        } catch (err) {
            console.log(err);
        }
      }

      // RUNNING IN /PAST-DATES.HTML
    async function getDates () {
        let res;
        try {
            res = await fetch('/getDates');
            const dates = await res.json();
            renderDates(dates);
        } catch (err) {
            console.log(err);
        }
      }

      // RUNNING IN /VIEW-DATE.HTML
      async function getCurrentDate () {
        if (!currentUser) {
            showMessage("Please login in first");
        }

        let dateID = getCurrentDateID();

        if (!dateID) {
            return showMessage("No date selected");
        }

        let res = await fetch(`/getDate?id=${dateID}`, {method: 'GET'});
        let resDate = await res.json();

        // if (!isLoggedIn) {
        //     return showMessage()
        // }
        console.log("before render date: ", resDate);

        renderDate(resDate);
      }

  clientDates.getDates = getDates;
  clientDates.getCurrentUser = getCurrentUser;
  clientDates.getCurrentDate = getCurrentDate;
  return clientDates;
}

export default ClientDates();