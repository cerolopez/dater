function ClientDates() {
    const clientDates = {};

    const datesDiv = document.querySelector("div#newDateContent");

    // TODO: FIX RENDERING OF DATES
    function renderDates () {
      // do something
      console.log("I'm in renderDates");
      const dates = fetchDates();

      const userDates = dates[0];
      console.log(userDates);
    }

      /*
      for (let step = 0; step < 7; step++) {
          userDates = dates[step];
          if (userDates !== undefined) {
              console.log(userDates);
          }
      }
    }
    
      
      datesDiv.innerHTML = "";
      console.log("render dates", dates);
      for (let d of dates) {
        const dDiv = document.createElement("div");
  
        dDiv.innerHTML = `

          <div class="d-flex justify-content-center">
          <div class="card dash-card text-center">
          <div class="card-body">
            <h3 id="inverse-color"><a id="inverse-hyperlink" href="">${d}</a></h3>
            <p id="inverse-color">[date goes here]</p>
          </div>
          </div>
          </div>

        `;
  
        datesDiv.appendChild(dDiv);
      }
    }
    */


    renderDates();

    async function fetchDates () {
        const res = await fetch('./getDates');
        console.log("I'm in clientDates.js", res);
        return res;
      }
    
    return clientDates;
}

export default ClientDates();