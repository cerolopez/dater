// Made by Tim
import clientUtil from "./clientUtilities.js";

function ClientDashboard() {
    const clientDash = {};
    const msg = document.querySelector("div#msg");
    const element = document.querySelector("a#sign-out");

    
    clientDash.getCurrentUser = clientUtil.getCurrentUser;
    // TEST
    clientDash.setupSignOut = clientUtil.setupSignOut;

    clientDash.setupSignOut = async () => {
        let res;
        element.addEventListener("click", async (evt) => {
            evt.preventDefault();
            try {
                res = await fetch ("/sign-out", {
                    method: "GET"
                });
                const result = await res.json();
                if (result.isSuccessful) {
                    clientUtil.showMessage(msg, "You have signed out successfully.")
                    setTimeout(() => clientUtil.redirect("index"), 2000);
                    
                } else {
                    clientUtil.showMessage(msg, result.errMsg);
                }
            } catch (err) {
                console.log(err);
            }
        });
    }
    return clientDash;
}

export default ClientDashboard();