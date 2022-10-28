import clientUtil from "./clientUtilities.js";

function ClientLogin() {
    const clientLogin = {};
    const divMsg = document.querySelector("div#msgBadCred");

    let currentUser = null;

    // function showMessage(msg) {
    //     divMsg.querySelector("#msgContent").innerHTML = msg;
    //     divMsg.style.display = "block";
    // }
    
    // function redirect(page) {
    //     window.location.replace(page + ".html");
    // }

    clientLogin.getCurrentUser = async () => {
        let res;
        try {
            res = await fetch("./getCurrentUser");
            const resUser = await res.json();
            if (resUser.isLoggedIn) {
                currentUser = resUser.user;
                // getPosts();
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
                    console.log("before redirect");
                    clientUtil.showMessage(divMsg, resUser.err);
                    console.log("after redirect");
                }
            } catch (err) {
                console.log(err);
            }
        });

    }



    return clientLogin;
}

export default ClientLogin();