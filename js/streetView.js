const renderStreets = () => {
    const target = document.querySelector("#selectStreet");
    const streets = getStreets();

    if (streets.length === 0) {
        target.replaceChildren("No streets");
    } else {
        let currentBtn;

        const btns = streets.map((street) => {
            const btn = document.createElement("button");

            btn.innerText = street;

            if (street === getCurrentStreet())
                currentBtn = btn;

            btn.addEventListener("click", (_event) => {
                setCurrentStreet(street);
                renderStreets();
                renderHouses();
            });

            return btn;
        });

        target.replaceChildren(...btns);

        currentBtn.classList.add("currentStreet");
        currentBtn.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
};

const houseStatusCode = (house) => {
    if (house.booked)
        return "B";

    if (house.reknock)
        return "RK";

    if (house.qualified)
        return "Q";

    if (house.contacts > 0)
        return "NQ";

    if (house.knocks > 0)
        return "K";

    return "?";
};

const houseStatusCodes = {
    "B": "house-booked",
    "RK": "house-reknock",
    "Q": "house-qualified",
    "NQ": "house-nonqualified",
    "K": "house-knock",
    "?": "house-unknocked",
};

let frame = 0;
const frameWidth = 25;

const renderHouses = () => {
    const target = document.querySelector("#houses");
    const btns = [];

    for (let i = frame; i < frame + frameWidth; ++i) {
        const no = i + 1;
        const btn = document.createElement("button");
        const lab = document.createElement("div");
        const stat = document.createElement("div")
        const code = houseStatusCode(getHouse(getCurrentStreet(), no))

        lab.innerText = no;
        stat.innerText = code;

        btn.append(lab, stat);
        btn.classList.add(houseStatusCodes[code]);

        btn.addEventListener("dbclick", (_event) => {
            console.log("Knock");
            const house = getHouse(getCurrentStreet(), no);
            house.knocks += 1;
            setHouse(getCurrentStreet(), no, house);
        });

        btn.addEventListener("click", (_event) => {
            setCurrentHouse(no);
            loadPage(pages.editHouse);
        });

        btns.push(btn);
    }

    target.replaceChildren(...btns);
};

const nextHouseFrame = () => {
    frame += frameWidth;
    renderHouses();
};

const previousHouseFrame = () => {
    frame = frame === 0 ? frame : frame - frameWidth;
    renderHouses();
};