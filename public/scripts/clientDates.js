function ClientDates() {
    const clientDates = {};

    /*
    const datesDiv = document.querySelector("div#newDateContent");

    function renderDates() {
      // do something
      const dates = ["Reggie", "Rocky", "Bobby"];

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

    //renderDates();

    clientDates.fetchDates = async () => {
        console.log("I'm in clientDates.js");
        const res = await fetch('./getDates');
        console.log("I'm in clientDates.js", res);
      }
    return clientDates;
}

export default ClientDates();