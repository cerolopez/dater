// function ClientNewDate () {
//     const clientNewDate = {};

//     const dateDiv = document.querySelector("div#newDateContent");

//     const form = document.querySelector("form#new-date-form");
    
//     form.addEventListener("submit", async (evt) => {
//         evt.preventDefault();
//         console.log("Fetching new date ID");
//         res = await fetch("/new-date", {
//             method: "GET",
//         });
//         const newDate = await res.json();
//     });

//       async function grabNewDateID () => {
//         console.log("Creating a date...");
//         const form = document.querySelector("form#new-date-form");
//         let res;
//         form.addEventListener("submit", async (evt) => {
//             evt.preventDefault();
//             console.log("Attempting to create new date");
//             try {
//                 res = await fetch("/new-date", {
//                     method: "POST",
//                     body: new URLSearchParams(new FormData(form))
//                 });
//                 const resUser = await res.json();
//                 if (resUser.isCreated) {
//                     clientUtil.redirect("dashboard");
//                 } else {
//                     clientUtil.showMessage(divMsg, resUser.err);
//                     setTimeout(() => clientUtil.redirect("signup"), 2000);
//                 }
//             } catch (err) {
//                 console.log(err);
//             }
//         });
//       }

//     return clientNewDate;
// }

// export default ClientNewDate();