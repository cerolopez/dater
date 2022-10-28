function ClientUtil() {
    const clientUtil = {};

    clientUtil.showMessage = (divMsg, msg) => {
        divMsg.querySelector("#msgContent").innerHTML = msg;
        divMsg.style.display = "block";
    }
    
    clientUtil.redirect = (page) => {
        window.location.replace(page + ".html");
    }

    return clientUtil;
}

export default ClientUtil();