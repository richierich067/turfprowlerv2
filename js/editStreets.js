const renderArea = () => {
    document.querySelector("#area").innerText = `${getSuburb()}, ${getPostCode()}`;
};

const renderEditableStreets = () => {
    const target = document.querySelector("#editStreets ul");
    const streets = getStreets();

    console.log(target);

    if (streets.length === 0) {
        target.replaceChildren("No Streets");
    } else {
        const lis = streets.map((street) => {
            console.log(street);
            const li = document.createElement("li");
            const name = document.createElement("span");
            const remove = document.createElement("button");

            name.innerText = street;
            remove.innerHTML = "&#x2715;";

            remove.addEventListener("click", (_event) => {
                setStreets(getStreets().filter((_street) => _street !== street));
                renderEditableStreets();
            });

            li.append(name, remove);

            return li;
        });

        target.replaceChildren(...lis);
    }
};