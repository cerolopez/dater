import clientUtil from "./clientUtilities.js";

function ClientSignUp() {
    const clientSignUp = {};
    const divMsg = document.querySelector("div#msg");

    clientSignUp.setupCreateUser = async () => {
        console.log("Setting up signup...");
        const form = document.querySelector("form#signup-form");
        let res;
        form.addEventListener("submit", async (evt) => {
            evt.preventDefault();
            console.log("Attempting to create user");
            try {
                res = await fetch("/sign-up", {
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
    return clientSignUp;
}
export default ClientSignUp();