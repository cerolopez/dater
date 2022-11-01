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

  function renderDateStatus(dateName, currentDate, dateIndex) {
    // add date's name to header
    const dateNameDiv = document.querySelector('div#dateName');
    dateNameDiv.innerHTML = '';
    const dateDiv = document.createElement("div");
    dateDiv.innerHTML = `
    <h1 id="dash-header"><strong>You and ${dateName}</strong></h1>
    `;
    dateNameDiv.appendChild(dateDiv);

    // add date's status
    const clientSurvey = currentDate.at(0).users.at(dateIndex).formResponses;

    const surveyQuestions = [];
    const surveyAnswers = [];

    for (const [key, value] of Object.entries(clientSurvey)) {
      surveyQuestions.push(`${key}`);
      surveyAnswers.push(`${value}`);
    }

    const dateStatusDiv = document.querySelector('div#dateStatus');
    dateStatusDiv.innerHTML = '';

    // TODO: FIGURE OUT HOW TO DISPLAY ON FRONTEND
    if (surveyQuestions[0]) {
      console.log("surveyQuestions: ", surveyQuestions);
      for (let step = 0; step < surveyQuestions.length; step++) {
        const currentQuestion = surveyQuestions[step];
        const currentResponse = surveyAnswers[step];
        const dStatDiv = document.createElement("div");
        dStatDiv.innerHTML = `
  
          <div class="d-flex justify-content-center">
          <div class="card dash-card text-center">
            <div class="card-body">
            <h3 id="inverse-color"><strong>${currentQuestion}</strong></h3>
            <p id="inverse-color">${currentResponse}</p>
            </a>
            </div>
            </div>
            </div>
        `;
  
        dateStatusDiv.appendChild(dStatDiv);
      }
    } else {
      console.log("I'm in the else statement");
      const dStatDiv = document.createElement("div");
      dStatDiv.innerHTML = `
    <p>${dateName} hasn't answered their questions yet.</p>
    `;
      dateStatusDiv.appendChild(dStatDiv);
    }
  }

  function renderDate (currentDate) {
    let clientIndex = null;
    let dateIndex = null;
    const clientName = currentUser.name;
    const firstIndexName = currentDate.at(0).users.at(0).name;

    if (clientName === firstIndexName) {
      clientIndex = 0;
      dateIndex = 1;
    } else {
      clientIndex = 1;
      dateIndex = 0;
    }

    const dateName = currentDate.at(0).users.at(dateIndex).name;

    renderDateStatus(dateName, currentDate, dateIndex);

    // render client status here
    const clientSurvey = currentDate.at(0).users.at(clientIndex).formResponses;

    const surveyQuestions = [];
    const surveyAnswers = [];

    for (const [key, value] of Object.entries(clientSurvey)) {
      surveyQuestions.push(`${key}`);
      surveyAnswers.push(`${value}`);
    }

    const dateStatusDiv = document.querySelector('div#clientStatus');
    dateStatusDiv.innerHTML = '';

    // TODO: FIGURE OUT HOW TO DISPLAY ON FRONTEND
    if (surveyQuestions[0]) {
      console.log("I'm in the if statement");
      console.log("surveyQuestions: ", surveyQuestions);
      for (let step = 0; step < surveyQuestions.length; step++) {
        const currentQuestion = surveyQuestions[step];
        const currentResponse = surveyAnswers[step];
        const dStatDiv = document.createElement("div");
        dStatDiv.innerHTML = `
  
          <div class="d-flex justify-content-center">
          <div class="card dash-card text-center">
            <div class="card-body">
            <h3 id="inverse-color"><strong>${currentQuestion}</strong></h3>
            <p id="inverse-color">${currentResponse}</p>
            </a>
            </div>
            </div>
            </div>
        `;
  
        dateStatusDiv.appendChild(dStatDiv);
      }
    } else {
      console.log("I'm in the else statement");
      const dStatDiv = document.createElement("div");
      dStatDiv.innerHTML = `
      <div class="btn btn-primary"><a href="/answer-questions.html" id="viewDate">Answer questions</a></div>
      `;
      dateStatusDiv.appendChild(dStatDiv);
    }
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