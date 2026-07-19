// Knock -> Contact -> Qualified -> Booked
//       -> Reknock                      

const getCurrentHouse = () => {
    return getHouse(getCurrentStreet(), getCurrentNo());
};

const renderAddress = () => {
    document.querySelector("#addressLine1").innerText = `${getCurrentNo()} ${getCurrentStreet()}`;
    document.querySelector("#addressLine2").innerText = `${getSuburb()}, ${getPostCode()}`;
};

const renderInfo = () => {
    const house = getCurrentHouse();

    document.querySelector("#infoKnocks").innerText = house.knocks;
    document.querySelector("#infoContacts").innerText = house.contacts;
    document.querySelector("#infoReknock").innerText = house.reknock ? "Y" : "N";
    document.querySelector("#infoQualified").innerText = house.qualified ? "Y" : "N";
    document.querySelector("#infoBooked").innerText = house.booked ? "Y" : "N";
};

const renderNotes = () => {
    const house = getCurrentHouse();

    if (house.notes !== "")
        document.querySelector("#notes").textContent = house.notes;
};

const modifyHouse = (transform) => {
    const street = getCurrentStreet();
    const no = getCurrentNo();
    const house = getHouse(street, no);

    transform(house);
    setHouse(street, no, house);
    renderInfo();
    renderActions();
};

const knock = () => {
    modifyHouse(
        (house) => house.knocks += 1
    );
};

const contact = () => {
    modifyHouse(
        (house) => house.contacts < house.knocks ? house.contacts += 1 : undefined
    );
};

const toggleReknock = () => {
    modifyHouse(
        (house) => house.reknock = !house.reknock
    );
};

const toggleQualified = () => {
    modifyHouse(
        (house) => {
            house.qualified = !house.qualified;

            if (!house.qualified)
                house.booked = false;
        }
    );
};

const toggleBooked = () => {
    modifyHouse(
        (house) => house.qualified ? house.booked = !house.booked : undefined
    );
};

const setNotes = (notes) => {
    modifyHouse(
        (house) => house.notes = notes
    );
};

let lastAction;

const actionBtns = {
    "knock": document.createElement("button"),
    "contact": document.createElement("button"),
    "reknock": document.createElement("button"),
    "qualify": document.createElement("button"),
    "book": document.createElement("button"),
};

const initActions = () => {
    lastAction = undefined;
};

actionBtns.knock.innerText = "Knock";
actionBtns.knock.addEventListener("click", (_event) => {
    lastAction = "knock";
    knock();
});

actionBtns.contact.innerText = "Contact";
actionBtns.contact.addEventListener("click", (_event) => {
    const house = getCurrentHouse();
    lastAction = house.booked ? "book" : house.qualified ? "qualify" : "contact";
    contact();
});

actionBtns.reknock.innerText = "Reknock";
actionBtns.reknock.addEventListener("click", (_event) => {
    toggleReknock();
});

actionBtns.qualify.innerText = "Qualify";
actionBtns.qualify.addEventListener("click", (_event) => {
    lastAction = getCurrentHouse().qualified ? "contact" : "qualify";
    toggleQualified();
});

actionBtns.book.innerText = "Book";
actionBtns.book.addEventListener("click", (_event) => {
    lastAction = getCurrentHouse().booked ? "qualify" : "book";
    toggleBooked();
});

const renderActions = () => {
    const target = document.querySelector("#actions");

    if (!lastAction) {
        target.replaceChildren(actionBtns["knock"]);
    } else if (lastAction === "knock") {
        target.replaceChildren(actionBtns["contact"]);
    } else if (lastAction === "contact") {
        target.replaceChildren(actionBtns["reknock"], actionBtns["qualify"]);
    } else if (lastAction === "qualify" || lastAction === "book") {
        target.replaceChildren(actionBtns["reknock"], actionBtns["book"]);
    }
};