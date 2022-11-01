<<<<<<< Updated upstream
import clientUtil from "./clientUtilities.js";

function ClientNewDate () {
    const clientNewDate = {};
    const divMsg = document.querySelector("div#msg");

    // What's this? --> const dateDiv = document.querySelector("div#newDateContent");

    clientNewDate.setupCreateDate = async () => {
        console.log("I'm in setupCreateDate");
        debugger;
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
    
    // form.addEventListener("submit", async (evt) => {
    //     evt.preventDefault();
    //     console.log("Fetching new date ID");
    //     res = await fetch("/new-date", {
    //         method: "GET",
    //     });
    //     const newDate = await res.json();
    // });

    //   async function grabNewDateID () => {
    //     console.log("Creating a date...");
    //     const form = document.querySelector("form#new-date-form");
    //     let res;
    //     form.addEventListener("submit", async (evt) => {
    //         evt.preventDefault();
    //         console.log("Attempting to create new date");
    //         try {
    //             res = await fetch("/new-date", {
    //                 method: "POST",
    //                 body: new URLSearchParams(new FormData(form))
    //             });
    //             const resUser = await res.json();
    //             if (resUser.isCreated) {
    //                 clientUtil.redirect("dashboard");
    //             } else {
    //                 clientUtil.showMessage(divMsg, resUser.err);
    //                 setTimeout(() => clientUtil.redirect("signup"), 2000);
    //             }
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     });
    //   }
=======
function ClientNewDate () {
    const clientNewDate = {};

    const form = document.querySelector("form#new-date-form");
    
    form.addEventListener("submit", async (evt) => {
        evt.preventDefault();
        console.log("Fetching new date ID");
        res = await fetch("/new-date");
        const newDate = await res.json();
    });

      async function grabNewDateID () => {
        console.log("Creating a date...");
        const form = document.querySelector("form#new-date-form");
        let res;
        form.addEventListener("submit", async (evt) => {
            evt.preventDefault();
            console.log("Attempting to create new date");
            try {
                res = await fetch("/new-date", {
                    method: "POST",
                    body: new URLSearchParams(new FormData(form))
                });
                const resUser = await res.json();
                if (resUser.isCreated) {
                    clientUtil.redirect("dashboard");
                } else {
                    clientUtil.showMessage(divMsg, resUser.err);
                    setTimeout(() => clientUtil.redirect("signup"), 2000);
                }
            } catch (err) {
                console.log(err);
            }
        });
      }
>>>>>>> Stashed changes

    return clientNewDate;
}

export default ClientNewDate();