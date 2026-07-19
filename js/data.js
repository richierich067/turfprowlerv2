const clearData = () => {
    const certain = confirm("This will delete all of your data including your suburb, postcode, street names, any doors you've knocked & any notes you've taken. ARE YOU SURE?");

    if (certain) {
        localStorage.clear();
        loadPage(pages.welcome);
    }
}

const setSuburb = (suburb) => {
    localStorage.setItem("suburb", suburb);
};

const getSuburb = () => {
    return localStorage.getItem("suburb");
};

const setPostCode = (postCode) => {
    localStorage.setItem("postCode", postCode);
};

const getPostCode = () => {
    return localStorage.getItem("postCode");
};

const getStreets = () => {
    return JSON.parse(localStorage.getItem("streets") || "[]");
};

const setStreets = (streets) => {
    localStorage.setItem("streets", JSON.stringify(streets));
};

const getCurrentStreet = () => {
    return localStorage.getItem("currentStreet");
};

const setCurrentStreet = (street) => {
    localStorage.setItem("currentStreet", street);
};

const getCurrentNo = () => {
    return localStorage.getItem("currentHouse");
};

const setCurrentHouse = (no) => {
    localStorage.setItem("currentHouse", no);
};

const clearCurrentNo = () => {
    localStorage.removeItem("currentHouse");
};

const houseKey = (street, no) => {
    return `${street}.${no}`;
}

const createHouse = (
    knocks = 0,
    contacts = 0,
    reknock = false,
    qualified = false,
    booked = false,
    note = "",
) => ({
    knocks,
    contacts,
    reknock,
    qualified,
    booked,
    note,
});

const getHouse = (street, no) => {
    const key = houseKey(street, no);
    const raw = localStorage.getItem(key);

    return raw ? JSON.parse(raw) : createHouse();
};

const setHouse = (street, no, house) => {
    localStorage.setItem(houseKey(street, no), JSON.stringify(house));
};