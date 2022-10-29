import clientUtil from "./clientUtilities.js";

function ClientDashboard() {
    const clientDash = {};
    
    // testing out getCurrentUser
    clientDash.getCurrentUser = clientUtil.getCurrentUser;
    return clientDash;
}

export default ClientDashboard();