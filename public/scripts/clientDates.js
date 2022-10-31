function ClientDates() {
    const clientDates = {};

    // TODO: FIX RENDERING OF DATES
    function renderDates (userDates) {
      const datesDiv = document.querySelector("div#newDateContent");
      datesDiv.innerHTML = '';

      console.log("current date ID: ", userDates);
      console.log("length of array: ", userDates.length)

      for (let step = 0; step < userDates.length; step++) {
        const currentDateID = userDates.at(step)._id;
        const currentDate = userDates.at(step).date;
        const dDiv = document.createElement("div");
        dDiv.innerHTML = `

        <div class="d-flex justify-content-center">
        <div class="card dash-card text-center">
          <div class="card-body">
          <h3><a href="/getDate?id=${currentDateID}">
          <p id="inverse-color">${currentDate}</p>
          </a></h3>
          </div>
          </div>
          </div>
      `;

      datesDiv.appendChild(dDiv);
      }
    }

    function redirect(page) {
        setTimeout(() => {
          window.location.replace(page + ".html");
        }, 500);
      }

    clientDates.setupLogout = function () {
        const linkLogout = document.querySelector("#linkLogout");
        let res;
        linkLogout.addEventListener("click", async (evt) => {
          evt.preventDefault();
          console.log("logging out");
          res = await fetch("/logout");
          const resLogout = await res.json();
          console.log(resLogout);
          redirect('login');
        });
      };

    async function fetchDates () {
        const res = await fetch('./getDates');
        console.log("I'm in clientDates.js", res);
        const dates = await res.json();

        renderDates(dates);
      }

      async function fetchDate () {
        const res = await fetch('./getDate');
        console.log("I'm in clientDates.js", res);
        const dates = await res.json();

        renderDate(dates);
      }
    
    clientDates.fetchDates = fetchDates;
    clientDates.fetchDate = fetchDate;
    return clientDates;
}

export default ClientDates();