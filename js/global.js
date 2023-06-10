//* IMPORTS *//
import { filterPowerRange, filterPowerInput, filterWeightRange, filterWeightInput, filterEngineRange, filterEngineInput } from "./vehicles.js";
import { toggleForward, toggleReverse } from "./locations.js";
import { findVehicleKeyData, convertVehicle, vehicleFilters } from "./convertVehicles.js";
import { findLocationKeyData, convertLocation, locationFilters } from "./convertLocations.js";

if (window.location.pathname.includes("/vehicles.html")) {
    await findVehicleKeyData();
    await convertVehicle();
    await vehicleFilters();
}

if (window.location.pathname.includes( "/locations.html")) {
    await findLocationKeyData();
    await convertLocation();
    await locationFilters();
}

//* PAGE *//
const wrapper = document.getElementById("wrapper");

//* SEARCH BUTTON *//
const searchBtn = document.getElementById("btn-search");
const searchInput = document.getElementById("search-input");

//*FILTER BUTTON *//
const filterBtn = document.getElementById("btn-filter");
const filterIcon = document.getElementById("filter-icon");
const filterOpenIcons = document.getElementById("filter-open-icons");
const filterConfirm = document.getElementById("filter-confirm");
const filterReset = document.getElementById("filter-reset");
const filterCancel = document.getElementById("filter-cancel");
const filters = document.querySelectorAll(".filter");
const filterList = document.getElementById("filter-list");
const dropdowns = document.querySelectorAll(".dropdown");
const dropdownItems = document.querySelectorAll(".dropdown-item");

//* POWER FILTER *//
let powerRangeMin = 0;
const selectedPower = document.getElementById("power-range-selected");
const powerRange = document.querySelectorAll(".power-slider input");
const powerInput = document.querySelectorAll(".power-input input");

//* WEIGHT FILTER *//
let weightRangeMin = 0;
const selectedWeight = document.getElementById("weight-range-selected");
const weightRange = document.querySelectorAll(".weight-slider input");
const weightInput = document.querySelectorAll(".weight-input input");

//* ENGINE FILTER *//
let engineRangeMin = 0;
const selectedEngine = document.getElementById("engine-range-selected");
const engineRange = document.querySelectorAll(".engine-slider input");
const engineInput = document.querySelectorAll(".engine-input input");

//* TILE *//
const containers = document.querySelectorAll(".container")
const tiles = document.querySelectorAll(".tile");
const tileOpen = document.querySelectorAll(".tile[open]");
const detailsBtn = document.querySelectorAll(".btn-details");
const tileImg = document.querySelectorAll(".tile-img");
const tileSummary = document.querySelectorAll(".tile li");
const tileCloseBtn = document.querySelectorAll(".btn-red-xmark");
const modals = document.querySelectorAll(".modal");

//* LOCATION *//
const forwardTab = document.querySelectorAll(".forward-tab");
const reverseTab = document.querySelectorAll(".reverse-tab");

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
    filterIcon.classList.remove("show");
    filterOpenIcons.classList.add("show");
    showIcons();
}

function filterClosed() {
    filterBtn.classList.remove("filter-open");
    filterList.classList.remove("open");
    filterIcon.classList.add("show");
    filterOpenIcons.classList.remove("show");
    hideIcons();
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

function centerImg() {
    let imgCenter;
    let tileCenter;

    tileSummary.forEach((tile) => {
        tileCenter = tile.offsetWidth / 2;
    });

    tileImg.forEach((img) => {
        imgCenter = img.naturalWidth / 2;
    });

    let posLeft = tileCenter - imgCenter;
    tileImg.forEach(img => img.setAttribute("style", "left: " + posLeft + "px"));
}

function hideTiles() {
    containers.forEach((container) => container.classList.add("tile-open"));
    tileCloseBtn.forEach((btn) => {
        btn.classList.remove("hide");
    });
}

function showTiles() {
    containers.forEach((container) => container.classList.remove("tile-open"));
    tiles.forEach((tile) => {
        tile.classList.remove("hide");
        // tile.removeAttribute("open");
    });
    // tileCloseBtn.forEach((btn) => {
    //     btn.classList.add("hide");
    // });
    centerImg();
    window.onresize = centerImg;
}

function closeModal() {
    modals.forEach((modal) => {
        if (!modal.classList.value.includes("hide")) {
            modal.classList.add("hide");
        }
    })
}

//! EVENT LISTENERS !//
window.onresize = centerImg;
window.onload = centerImg;

// wrapper.addEventListener("click", function(e) {
//     searchClosed();
//     filterClosed();
//     showTiles();
// });

//* SEARCH BUTTON *//
searchBtn.addEventListener("click", function(e) {
    e.stopPropagation();
    if (filterBtn.classList.value.includes("filter-open")) {
        filterClosed();
    }
    if (tileOpen) {
        showTiles();
    }
    searchOpen();
});

searchInput.addEventListener("click", function(e) {
    e.stopPropagation();
});

//* FILTERS *//
filterBtn.addEventListener("click", function(e) {
    e.stopPropagation();
    if (searchBtn.classList.value.includes("search-open")) {
        searchClosed();
    }
    if (tileOpen) {
        showTiles();
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

//* FILTER POWER *//
powerRange.forEach((input) => input.addEventListener("input", (e) => filterPowerRange(e, powerRangeMin, selectedPower, powerRange, powerInput)));
powerInput.forEach((input) => input.addEventListener("input", (e) => filterPowerInput(e, powerRangeMin, selectedPower, powerRange, powerInput)));

//* FILTER WEIGHT *//
weightRange.forEach((input) => input.addEventListener("input", (e) => filterWeightRange(e, weightRangeMin, selectedWeight, weightRange, weightInput)));
weightInput.forEach((input) => input.addEventListener("input", (e) => filterWeightInput(e, weightRangeMin, selectedWeight, weightRange, weightInput)));

//* FILTER ENGINE *//
engineRange.forEach((input) => input.addEventListener("input", (e) => filterEngineRange(e, engineRangeMin, selectedEngine, engineRange, engineInput)));
engineInput.forEach((input) => input.addEventListener("input", (e) => filterEngineRange(e, engineRangeMin, selectedEngine, engineRange, engineInput)));

//* TILES *//
tiles.forEach(tile => tile.addEventListener("click", function(e) {
    e.stopPropagation();
    // e.preventDefault();
    // searchClosed();
    // filterClosed();
    window.onresize = tileImg.forEach(img => img.setAttribute("style", "left: 0"));

    modals.forEach((modal) => {
        if (modal.id === this.id + "-modal") {
            modal.classList.toggle("hide");
        }
    })
}));

forwardTab.forEach(tab => tab.addEventListener("click", () => {
    toggleForward();
}));

reverseTab.forEach(tab => tab.addEventListener("click", () => {
    toggleReverse();
}));

tileCloseBtn.forEach(btn => btn.addEventListener("click", function(e) {
    e.stopPropagation();
    closeModal();
    btn.parentElement.parentElement.scrollIntoView({block: "center"});
}));

detailsBtn.forEach(btn => btn.addEventListener("click", (e) => {
    e.stopPropagation();
}));