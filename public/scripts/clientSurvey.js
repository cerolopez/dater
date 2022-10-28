function ClientSurvey() {
    const userSideContent = document.querySelector('span#currentUserSide');
    const dateSideContent = document.querySelector('span#dateSide');

    let currentUser = null;

    // this makes the response show up in view-date.html
    function renderSurvey(responses) {
        userSideContent.style.display = 'none';
        userSideContent.innerHTML = `Testing`;
        dateSideContent.style.display = 'none';
        dateSideContent.innerHTML = `Testing`;

    }

    async function getSurvey(dateID) {
        const divContent = document.querySelector('#newDateContent');
        divContent.innerHTML = ``;

        try {
            res = await fetch('./getSurveyResponses');
            const responses = await res.json();
            renderSurvey(responses);
        } catch (err) {
            console.log(err);
        }
    }

}

export default ClientSurvey();