// Made by Tim
import clientUtil from "./clientUtilities.js";

function ClientLogin() {
    const clientLogin = {};
    const divMsg = document.querySelector("div#msg");

    let currentUser = null;

    clientLogin.getCurrentUser = async () => {
        let res;
        try {
            res = await fetch("./getCurrentUser");
            const resUser = await res.json();
            if (resUser.isLoggedIn) {
                currentUser = resUser.user;
            } else {
                currentUser = null;
                clientUtil.redirect("login");
            }
        } catch (err) {
            console.log(err);
        }
    }

    clientLogin.setupLogin = async () => {
        console.log("Setting up login");
        const form = document.querySelector("form#login-form");
        let res;
        form.addEventListener("submit", async (evt) => {
            evt.preventDefault();
            console.log("Authenticating...");
            try {
                res = await fetch("/authenticate", {
                    method: "POST",
                    body: new URLSearchParams(new FormData(form))
                });
                const resUser = await res.json();
                if (resUser.isLoggedIn) {
                    clientUtil.redirect("dashboard");
                } else {
                    clientUtil.showMessage(divMsg, resUser.err);
                }
            } catch (err) {
                console.log(err);
            }
        });

    }



    return clientLogin;
}

export default ClientLogin();