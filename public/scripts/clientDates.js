function ClientDates() {

    let currentUser = null;

    // this makes the dates show up in past-dates.html
    function renderDates(dates) {
        const divContent = document.querySelector("#dateContent");
        divContent.innerHTML = `
        <p>html will go here</p>
        ${dates.map((d) => `<div>Name: ${d.name}</div>.join(")`)}
        `;
    }

    function renderNewDates(dateID) {
        const divContent = document.querySelector('#newDateContent');
        divContent.innerHTML = ``;
    }

    // this gets the dates and then calls renderDates
    async function getDates() {
        let res;
        try {
            res = await fetch("./getDates");
            const dates = await res.json();
            renderDates(dates);
        } catch (err) {
            console.log(err);
        }
    }

    async function createDate() {
        let res;
        try {
            res = await fetch("./createDate");
            const newDate = await res.json();
            renderNewDates(newDate.date);
        } catch (err) {
            console.log(err);
        }
    }
}

export default ClientDates();