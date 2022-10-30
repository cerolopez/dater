function ClientDates() {
    const clientDates = {};

    const datesDiv = document.querySelector("div#newDateContent");

    // TODO: FIX RENDERING OF DATES
    function renderDates (userDates) {
      // do something
      datesDiv.innerHTML = '';
      //console.log("I'm in renderDates: ", userDates);
      //console.log(`First date: ${userDates.at(0).date}`);


      const dDiv = document.createElement("div");
      dDiv.innerHTML = `

          <div class="d-flex justify-content-center">
          <div class="card dash-card text-center">
          <div class="card-body">
            <h3 id="inverse-color"><a id="inverse-hyperlink" href="">${userDates.at(0).email.at(1)}</a></h3>
            <p id="inverse-color">${userDates.at(0).date}</p>
          </div>
          </div>
          </div>

        `;

        datesDiv.appendChild(dDiv);

        /*
      for (let d of dates) {
        const dDiv = document.createElement("div");
  
        dDiv.innerHTML = `

          <div class="d-flex justify-content-center">
          <div class="card dash-card text-center">
          <div class="card-body">
            <h3 id="inverse-color"><a id="inverse-hyperlink" href="">${userDates.at(0).date}</a></h3>
            <p id="inverse-color">[date goes here]</p>
          </div>
          </div>
          </div>

        `;
  
        datesDiv.appendChild(dDiv);
      }
      */
    }

    async function fetchDates () {
        const res = await fetch('./getDates');
        console.log("I'm in clientDates.js", res);
        const dates = await res.json();

        renderDates(dates);
      }
    
    fetchDates();
    return clientDates;
}

export default ClientDates();