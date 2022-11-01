import clientUtil from "./clientUtilities.js";

function ClientNewDate () {
    const clientNewDate = {};
    const divMsg = document.querySelector("div#msg");

    clientNewDate.setupCreateDate = async () => {
        console.log("I'm in setupCreateDate");
        const form = document.querySelector("form#new-date-form");
        let res;
        form.addEventListener("submit", async (evt) => {
            evt.preventDefault();
            try {
                res = await fetch("/create-date", {
                    method: "POST",
                    body: new URLSearchParams(new FormData(form))
                });
                const dateInfo = await res.json();
                if (dateInfo.datePosted) {
                    clientUtil.redirect("dashboard");
                
                } else {
                    clientUtil.showMessage(divMsg, dateInfo.err);
                    setTimeout(() => clientUtil.redirect("new-date"), 2000);
                }
            } catch (err) {
                console.log(err);
            }
        })

    }

    clientNewDate.getCurrentUser = clientUtil.getCurrentUser;

    return clientNewDate;
}

export default ClientNewDate();