import clientUtil from "./clientUtilities.js";

function ClientSurvey () {
    const clientSurvey = {};
    const divMsg = document.querySelector("div#msg");

    clientSurvey.setupSurvey = async () => {
        console.log("I'm in setupSurvey");
        const form = document.querySelector("form#survey-form");
        let res;
        form.addEventListener("submit", async (evt) => {
            evt.preventDefault();
            try {
                res = await fetch("/postSurvey", {
                    method: "POST",
                    body: new URLSearchParams(new FormData(form))
                });
                const survInfo = await res.json();
                if (survInfo) {
                    clientUtil.redirect("dashboard");
                
                } else {
                    clientUtil.showMessage(divMsg, survInfo.err);
                    setTimeout(() => clientUtil.redirect("dashboard"), 2000);
                }
            } catch (err) {
                console.log(err);
            }
        })

    }

    clientSurvey.getCurrentUser = clientUtil.getCurrentUser;

    return clientSurvey;
}

export default ClientSurvey();