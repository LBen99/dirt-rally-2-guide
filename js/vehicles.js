//* PAGE VARIABLES *//
const wrapper = document.getElementById("wrapper");

//* SEARCH BUTTON VARIABLES *//
const searchBtn = document.getElementById("btn-search");
const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");

//*FILTER BUTTON VARIABLES *//
const filterBtn = document.getElementById("btn-filter");
const filterIcon = document.getElementById("filter-icon");
const filterOpenIcons = document.getElementById("filter-open-icons");
const filterConfirm = document.getElementById("filter-confirm");
const filterReset = document.getElementById("filter-reset");
const filterCancel = document.getElementById("filter-cancel");
const filters = document.querySelectorAll(".filter");
const filterList = document.getElementById("filter-list");
// const mobileFilterMenu = document.getElementById("mobile-filter-menu");
// const mobileFilterList = document.getElementById("mobile-filter-list");
const dropdowns = document.querySelectorAll(".dropdown");

//* POWER FILTER VARIABLES *//
let powerRangeMin = 0;
const selectedPower = document.getElementById("power-range-selected");
const powerRange = document.querySelectorAll(".power-slider input");
const powerInput = document.querySelectorAll(".power-input input");

//* WEIGHT FILTER VARIABLES *//
let weightRangeMin = 0;
const selectedWeight = document.getElementById("weight-range-selected");
const weightRange = document.querySelectorAll(".weight-slider input");
const weightInput = document.querySelectorAll(".weight-input input");

//* ENGINE FILTER VARIABLES *//
let engineRangeMin = 0;
const selectedEngine = document.getElementById("engine-range-selected");
const engineRange = document.querySelectorAll(".engine-slider input");
const engineInput = document.querySelectorAll(".engine-input input");

//* VEHICLE VARIABLES *//
const vehicles = document.getElementById("vehicleContainer");
const tiles = document.querySelectorAll(".vehicle-tile");
const tileOpen = document.querySelectorAll(".vehicle-tile[open]");
const detailsBtn = document.querySelectorAll(".btn-details");
const vehicleImg = document.querySelectorAll(".vehicle-img");
const vehicleSummary = document.querySelectorAll(".vehicle-tile summary");
const tileCloseBtn = document.querySelectorAll(".btn-red-xmark");

//! FUNCTIONS !//
function searchOpen() {
    searchBtn.classList.add("search-open");
}

function searchClosed() {
    searchBtn.classList.remove("search-open");
}

function showIcons() {
    filterOpenIcons.classList.add("show");
    filterConfirm.classList.add("show");
    filterReset.classList.add("show");
    filterCancel.classList.add("show");
}

function hideIcons() {
    filterOpenIcons.classList.remove("show");
    filterConfirm.classList.remove("show");
    filterReset.classList.remove("show");
    filterCancel.classList.remove("show");
}

function filterOpen() {
    filterBtn.classList.add("filter-open");
    filterList.classList.add("open");
    // mobileFilterMenu.classList.add("open");
    // mobileFilterList.classList.add("open");
    filterIcon.classList.remove("show");
    filterOpenIcons.classList.add("show");
    showIcons();
}

function filterClosed() {
    filterBtn.classList.remove("filter-open");
    filterList.classList.remove("open");
    mobileFilterMenu.classList.remove("open");
    mobileFilterList.classList.remove("open");
    filterIcon.classList.add("show");
    filterOpenIcons.classList.remove("show");
    hideIcons();
}

function filterPowerRange(e) {
    let minRange = parseInt(powerRange[0].value);
    let maxRange = parseInt(powerRange[1].value);

    if (maxRange - minRange < powerRangeMin) {
        if (e.target.className === "min") {
            powerInput[0].value = maxRange - powerRangeMin;
        } else {
            powerInput[1].value = minRange + powerRangeMin;
        }
    } else {
        powerInput[0].value = minRange;
        powerInput[1].value = maxRange;
        selectedPower.style.left = (minRange / powerRange[0].max) * 100 + "%";
        selectedPower.style.right = 100 - (maxRange / powerRange[1].max) * 100 + "%";
    }
}

function filterPowerInput(e) {
    let minPrice = powerInput[0].value;
    let maxPrice = powerInput[1].value;

    if (maxPrice - minPrice >= powerRangeMin && maxPrice <= powerRange[1].max) {
        if (e.target.className === "min") {
            powerRange[0].value = minPrice;
            selectedPower.style.left = (minPrice / powerRange[0].max) * 100 + "%";
        } else {
            powerRange[1].value = maxPrice;
            selectedPower.style.right = 100 - (maxPrice / powerRange[1].max) * 100 + "%";
        }
    }
}

function filterWeightRange(e) {
    let minRange = parseInt(weightRange[0].value);
    let maxRange = parseInt(weightRange[1].value);

    if (maxRange - minRange < weightRangeMin) {
        if (e.target.className === "min") {
            weightInput[0].value = maxRange - weightRangeMin;
        } else {
            weightInput[1].value = minRange + weightRangeMin;
        }
    } else {
        weightInput[0].value = minRange;
        weightInput[1].value = maxRange;
        selectedWeight.style.left = (minRange / weightRange[0].max) * 100 + "%";
        selectedWeight.style.right = 100 - (maxRange / weightRange[1].max) * 100 + "%";
    }
}

function filterWeightInput(e) {
    let minPrice = weightInput[0].value;
    let maxPrice = weightInput[1].value;

    if (maxPrice - minPrice >= weightRangeMin && maxPrice <= weightRange[1].max) {
        if (e.target.className === "min") {
            weightRange[0].value = minPrice;
            selectedWeight.style.left = (minPrice / weightRange[0].max) * 100 + "%";
        } else {
            weightRange[1].value = maxPrice;
            selectedWeight.style.right = 100 - (maxPrice / weightRange[1].max) * 100 + "%";
        }
    }
}

function filterEngineRange(e) {
    let minRange = parseInt(engineRange[0].value);
    let maxRange = parseInt(engineRange[1].value);

    if (maxRange - minRange < engineRangeMin) {
        if (e.target.className === "min") {
            engineInput[0].value = maxRange - engineRangeMin;
        } else {
            engineInput[1].value = minRange + engineRangeMin;
        }
    } else {
        engineInput[0].value = minRange;
        engineInput[1].value = maxRange;
        selectedEngine.style.left = (minRange / engineRange[0].max) * 100 + "%";
        selectedEngine.style.right = 100 - (maxRange / engineRange[1].max) * 100 + "%";
    }
}

function filterEngineInput(e) {
    let minPrice = engineInput[0].value;
    let maxPrice = engineInput[1].value;

    if (maxPrice - minPrice >= engineRangeMin && maxPrice <= engineRange[1].max) {
        if (e.target.className === "min") {
            engineRange[0].value = minPrice;
            selectedEngine.style.left = (minPrice / engineRange[0].max) * 100 + "%";
        } else {
            engineRange[1].value = maxPrice;
            selectedEngine.style.right = 100 - (maxPrice / engineRange[1].max) * 100 + "%";
        }
    }
}

function showDropdown() {
    this.classList.add("filter-selected");
    for (let i = 0; i < dropdowns.length; i++) {
        if (dropdowns[i].id.includes(this.id + "-dropdown")) {
            dropdowns[i].classList.remove("hide");
        }
    }
}

function hideDropdown() {
    this.classList.remove("filter-selected");
    for (let i = 0; i < dropdowns.length; i++) {
        if (dropdowns[i].id.includes(this.id + "-dropdown")) {
            dropdowns[i].classList.add("hide");
        }
    }
}

function toggleDropdown(e) {
    e.stopPropagation();
    this.classList.toggle("filter-selected");
    for (let i = 0; i < dropdowns.length; i++) {
        if (dropdowns[i].id.includes(this.id + "-dropdown")) {
            dropdowns[i].classList.toggle("hide")
        }
    }
}

function hideVehicles() {
    vehicles.classList.add("tile-open");
    tileCloseBtn.forEach((btn) => {
        btn.classList.remove("hide");
    });
}

function showVehicles() {
    vehicles.classList.remove("tile-open");
    tiles.forEach((tile) => {
        tile.classList.remove("hide");
        tile.removeAttribute("open");
    });
    tileCloseBtn.forEach((btn) => {
        btn.classList.add("hide");
    });
    centerImg();
    window.onresize = centerImg;
}

function centerImg() {
    let imgCenter;
    let tileCenter;

    vehicleSummary.forEach((tile) => {
        tileCenter = tile.offsetWidth / 2;
    });

    vehicleImg.forEach((img) => {
        imgCenter = img.naturalWidth / 2;
    });

    let posLeft = tileCenter - imgCenter;
    vehicleImg.forEach(img => img.setAttribute("style", "left: " + posLeft + "px"));
}

//! EVENT LISTENERS !//
window.onresize = centerImg;
window.onload = centerImg;

wrapper.addEventListener("click", function() {
    searchClosed();
    filterClosed();
    showVehicles();
});

//* SEARCH BUTTON *//
searchBtn.addEventListener("click", function(e) {
    e.stopPropagation();
    if (filterBtn.classList.value.includes("filter-open")) {
        filterClosed();
    }
    if (tileOpen) {
        showVehicles();
    }
    searchOpen();
});

searchInput.addEventListener("click", function(e) {
    e.stopPropagation();
})

//* FILTERS *//
filterBtn.addEventListener("click", function(e) {
    e.stopPropagation();
    if (searchBtn.classList.value.includes("search-open")) {
        searchClosed();
    }
    if (tileOpen) {
        showVehicles();
    }
    filterOpen();
});

filterCancel.addEventListener("click", function(e) {
    e.stopPropagation();
    filterClosed();
});

filters.forEach(filter => filter.addEventListener("mouseover", showDropdown));
filters.forEach(filter => filter.addEventListener("mouseout", hideDropdown));
filters.forEach(filter => filter.addEventListener("click", toggleDropdown));

dropdowns.forEach(dropdown => dropdown.addEventListener("mouseenter", () => {
    dropdown.classList.remove("hide");
    for (let i = 0; i < filters.length; i++) {
        if (dropdown.id.includes(filters[i].id + "-dropdown")) {
            filters[i].classList.add("filter-selected");
        }
    }
}));

dropdowns.forEach(dropdown => dropdown.addEventListener("mouseleave", () => {
    dropdown.classList.add("hide");
    for (let i = 0; i < filters.length; i++) {
        if (dropdown.id.includes(filters[i].id + "-dropdown")) {
            filters[i].classList.remove("filter-selected");
        }
    }
}));

dropdowns.forEach(dropdown => dropdown.addEventListener("click", (e) => {
    e.stopPropagation();
}));

// mobileFilterMenu.addEventListener("click", (e) => {
//     e.stopPropagation();
// });

//* FILTER POWER *//
powerRange.forEach((input) => input.addEventListener("input", filterPowerRange));
powerInput.forEach((input) => input.addEventListener("input", filterPowerInput));

//* FILTER WEIGHT *//
weightRange.forEach((input) => input.addEventListener("input", filterWeightRange));
weightInput.forEach((input) => input.addEventListener("input", filterWeightInput));

//* FILTER ENGINE *//
engineRange.forEach((input) => input.addEventListener("input", filterEngineRange));
engineInput.forEach((input) => input.addEventListener("input", filterEngineInput));

//* VEHICLE *//
tiles.forEach(tile => tile.addEventListener("click", function(e) {
    e.stopPropagation();
    e.preventDefault();
    searchClosed();
    filterClosed();
    window.onresize = vehicleImg.forEach(img => img.setAttribute("style", "left: 0"));
    hideVehicles();
    window.scrollTo(top);

    if (!this.open) {
        tiles.forEach((tile) => {
            if (tile.id !== this.id) {
                tile.classList.toggle("hide");
                this.open = this.open == false ? true : false;
            }
        });
    }
}));

tileCloseBtn.forEach(btn => btn.addEventListener("click", function(e) {
    e.stopPropagation();
    showVehicles();
    btn.parentElement.parentElement.scrollIntoView({block: "center"});
}));

detailsBtn.forEach(btn => btn.addEventListener("click", (e) => {
    e.stopPropagation();
}));