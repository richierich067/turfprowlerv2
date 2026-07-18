const pages = {
    welcome: { id: "#welcome", hook: () => { } },
    chooseArea: {
        id: "#chooseArea",
        hook: () => {
            const suburb = getSuburb();
            const postCode = getPostCode();

            if (suburb && postCode) {
                document.querySelector("#setSuburb").value = suburb;
                document.querySelector("#setPostCode").value = postCode;
            }
        }
    },
    editStreets: { id: "#editStreets", hook: renderEditableStreets },
    streetView: {
        id: "#streetView",
        hook: () => {
            renderArea();
            renderStreets();
            renderHouses();
        }
    },
    editHouse: {
        id: "#editHouse",
        hook: () => {
            renderAddress();
            renderInfo();
            renderNotes();
        }
    }
};

let currentPage = getSuburb() && getPostCode()
    ? getStreets().length !== 0 ? pages.streetView : pages.editStreets
    : pages.welcome;

const loadPage = (page) => {
    Object.values(pages).forEach(
        (_page) => {
            if (_page.id !== page.id)
                document.querySelector(_page.id).classList.add("hidden");
        }
    );

    document.querySelector(page.id).classList.remove("hidden");
    currentPage = page;
    page.hook();
};

loadPage(currentPage);