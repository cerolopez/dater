function ClientSurvey() {
    const clientSurvey = {};

    function getCurrentDateID () {
        const queryString = window.location.search;
        console.log(queryString);
        const urlParams = new URLSearchParams(queryString);
        const currentDateID = urlParams.get('id');
        console.log("current date ID: ", currentDateID);

        return currentDateID;
    }

    clientSurvey.setupSurvey = () => {
    const dateID = getCurrentDateID();
    
      console.log("Submitting survey...");
      const form = document.querySelector("form#survey-form");
      //let res;
    
      form.addEventListener("submit", async (evt) => {
        evt.preventDefault();
        console.log("Attempting to post form responses");
    
        let res = await fetch('/postSurvey');
        let resDate = await res.json();
        // try {
        //   res = await fetch(`/postSurvey?id=${dateID}`);
        //   const resSurvey = await res.json();
          // if (resSurvey.isCreated) {
          //   window.location.replace(`view-date.html/?id=${dateID}`);
          // } else {
          //   showMessage("An error occurred. Redirecting you to dashboard.");
          //   setTimeout(() => clientUtil.redirect("dashboard"), 2000);
          // }
        // } catch (err) {
        //   console.log(err);
        // }
      });
    }

    return clientSurvey;
}

export default ClientSurvey();