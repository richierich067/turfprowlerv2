const renderAddress = () => {
    document.querySelector("#addressLine1").innerText = `${getCurrentHouse()} ${getCurrentStreet()}`;
    document.querySelector("#addressLine2").innerText = `${getSuburb()}, ${getPostCode()}`;
};

const renderInfo = () => {
    const street = getCurrentStreet();
    const no = getCurrentHouse();
    const house = getHouse(street, no);

    document.querySelector("#infoKnocks").innerText = house.knocks;
    document.querySelector("#infoContacts").innerText = house.contacts;
    document.querySelector("#infoReknock").innerText = house.reknock ? "Y" : "N";
    document.querySelector("#infoQualified").innerText = house.qualified ? "Y" : "N";
    document.querySelector("#infoBooked").innerText = house.booked ? "Y" : "N";
};

const renderNotes = () => {
    const street = getCurrentStreet();
    const no = getCurrentHouse();
    const house = getHouse(street, no);

    if (house.notes !== "")
        document.querySelector("#notes").textContent = house.notes;
};

const modifyHouse = (transform) => {
    const street = getCurrentStreet();
    const no = getCurrentHouse();
    const house = getHouse(street, no);

    transform(house);
    setHouse(street, no, house);
    renderInfo();
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