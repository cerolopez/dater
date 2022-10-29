function ClientUtil() {
    const clientUtil = {};

    clientUtil.showMessage = (divMsg, msg) => {
        divMsg.querySelector("#msgContent").innerHTML = msg;
        divMsg.style.display = "block";
    }
    
    clientUtil.redirect = (page) => {
        window.location.replace(page + ".html");
    }

    clientUtil.getCurrentUser = async () => {
        let currentUser = null;
        let res;
        try {
            console.log("Before fetch");
            res = await fetch("/getUser");
            const resUser = await res.json();
            // NEW ADDITION
            console.log("ResUser: "+ resUser);
            //
            if (resUser.user.isLoggedIn) {
                currentUser = resUser.user;
                
            } else {
                currentUser = null;
            }
            // new addition
            console.log(currentUser);
        } catch (err) {
            console.log(err);
        }
    }

    return clientUtil;
}

export default ClientUtil();