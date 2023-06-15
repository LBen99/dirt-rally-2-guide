//* IMPORTS *//
import { filterPowerRange, filterPowerInput, filterWeightRange, filterWeightInput, filterEngineRange, filterEngineInput } from "./vehicles.js";
import { toggleForward, toggleReverse } from "./locations.js";
import { findVehicleKeyData, convertVehicle, vehicleFilters } from "./convertVehicles.js";
import { findLocationKeyData, convertLocation, locationFilters } from "./convertLocations.js";
import { findDLCKeyData, convertDLC, dlcDelConImgs, dlcDelUpgImgs } from "./convertDLC.js";

if (window.location.pathname.includes("vehicles.html")) {
    await findVehicleKeyData();
    await convertVehicle();
    await vehicleFilters();
}

if (window.location.pathname.includes("locations.html")) {
    await findLocationKeyData();
    await convertLocation();
    await locationFilters();
}

if (window.location.pathname.includes("dlc.html")) {
    await findDLCKeyData();
    await convertDLC();
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
const tileCarousel = document.querySelectorAll(".dlc-tile-items");
const dlcTiles = document.querySelectorAll(".dlc-slider-tile");
const prevBtn = document.querySelectorAll(".prev-btn");
const nextBtn = document.querySelectorAll(".next-btn");
const blurDivs = document.querySelectorAll(".background-blur");
const textList = document.querySelectorAll(".dlc-text-list");

class Carousel {
    constructor(id, items) {
        this.id = id;
        this.items = items;
    }

    get updateArr() {
        const arr = this.tileArr();

        const middleTile = this.middleTile();
        arr[middleTile].style.left = "50%";
        arr[middleTile].style.transform = "translate(-50%)  scale(0.95, 0.95)";
        arr[middleTile].style.zIndex = "10";
        arr[middleTile].classList.add("no-before");

        const prevTiles = this.prevTiles();
        prevTiles.reverse();
        prevTiles.forEach(tile => {
            let sibling;
            if (prevTiles.indexOf(tile) === 0) {
                sibling = arr[middleTile];
            } else {
                sibling = prevTiles[prevTiles.indexOf(tile) - 1]
            }
            let scale = sibling.style.transform.split(") ")[1].split(")")[0].split("(")[1].split(", ");
            scale = parseFloat(scale[0]) - .05;
            tile.style.left = parseInt(sibling.style.left) - 20 + "%";
            tile.style.transform = `translate(-50%) scale(${ scale }, ${ scale })`;
            tile.style.zIndex = sibling.style.zIndex - 1;
            tile.classList.remove("no-before");
        });

        const nextTiles = this.nextTiles();
        nextTiles.forEach(tile => {
            let sibling;
            if (nextTiles.indexOf(tile) === 0) {
                sibling = arr[middleTile];
            } else {
                sibling = nextTiles[nextTiles.indexOf(tile) - 1]
            }
            let scale = sibling.style.transform.split(") ")[1].split(")")[0].split("(")[1].split(", ");
            scale = parseFloat(scale[0]) - .05;
            tile.style.left = parseInt(sibling.style.left) + 20 + "%";
            tile.style.transform = `translate(-50%) scale(${ scale }, ${ scale })`;
            tile.style.zIndex = sibling.style.zIndex - 1;
            tile.classList.remove("no-before");
        });

        return arr;
    }

    middleTile() {
        const arr = this.tileArr();
        const middleTile = parseInt(arr.length / 2);
        return middleTile;
    }

    prevTiles() {
        const prevTiles = [];
        const arr = this.tileArr();
        const middleTile = parseInt(arr.length / 2);
        arr.forEach(item => {
            if (arr.indexOf(item) < middleTile) {
                prevTiles.push(item);
            }
        });
        return prevTiles;
    }

    prevBtn() {
        const arr = this.tileArr();
        return arr.unshift(arr.pop());
    }

    nextTiles() {
        const nextTiles = [];
        const arr = this.tileArr();
        const middleTile = parseInt(arr.length / 2);
        arr.forEach(item => {
            if (arr.indexOf(item) > middleTile) {
                nextTiles.push(item);
            }
        });
        return nextTiles;
    }

    nextBtn() {
        const arr = this.tileArr();
        return arr.push(arr.shift());
    }

    tileArr() {
        const itemsArr = [];
        this.items.forEach(item => {
            itemsArr.push(item);
        });
        return itemsArr;
    }
}

function changeImg(imgArr, imgId) {
    let paths = imgArr;
    let img = imgId;
    let i = 0;
    setInterval(() => {
        if (i >= paths.length) {
            i = 0;
        }
        img.src = paths[i++];
    }, 3000);
}

function showDlcText(e) {
    let id = e.target.id.split("-").splice(2).toString().replace(/,/g, "-");
    blurDivs.forEach(div => {
        let divId = div.id.replace("-blur", "");
        if (id === divId) {
            div.classList.remove("hide");
        }
    });
    textList.forEach(list => {
        let listId = list.id.split("-").splice(3).toString().replace(/,/g, "-");
        if (id === listId) {
            list.classList.remove("hide");
        }
    });
}

function hideDlcText() {
    blurDivs.forEach(div => {
        if (!div.classList.value.includes("hide")) {
            div.classList.add("hide");
        }
    });
    textList.forEach(list => {
        if (!list.classList.value.includes("hide")) {
            list.classList.add("hide");
        }
    });
}

dlcTiles.forEach(tile => {
    tile.addEventListener("mouseenter", (e) => showDlcText(e));
    tile.addEventListener("mouseleave", hideDlcText);
});

tileCarousel.forEach(carousel => {
    let content = new Carousel(carousel.id, carousel.childNodes);
    content.updateArr;
    const nodes = [];
    carousel.childNodes.forEach(child => {
        nodes.push(child);
    });

    prevBtn.forEach(btn => btn.addEventListener("click", (e) => {
        if (e.target.parentElement === carousel.parentElement) {
            nodes.unshift(nodes.pop());
            content = new Carousel(carousel.id, nodes);
            content.updateArr;
        }
    }));
    
    nextBtn.forEach(btn => btn.addEventListener("click", (e) => {
        if (e.target.parentElement === carousel.parentElement) {
            nodes.push(nodes.shift());
            content = new Carousel(carousel.id, nodes)
            content.updateArr;
        }
    }));

    if (carousel.id === "dlc-items-deluxe-content-packs") {
        let tileImg = document.querySelectorAll(".tile-img");
        let delConArr = [];
        let delConImg = [];
        dlcDelConImgs.forEach(item => {
            let id = item.name.replace(/ /g, "-").toLowerCase();
            let prefix = "delcon-tile-";
            let pack = document.getElementById(prefix + id);
            pack.insertAdjacentHTML(
                "afterbegin",
                `<img src="${ item.arr[item.arr.length - 1] }" alt="" id="dlc-${ id }-img" class="dlc-img tile-img">`
            );
            if (item.arr.length > 1) {
                item.arr.map(img => {
                    delConArr.push(img);
                });
                delConImg.push(document.getElementById("dlc-" + id + "-img"));
            }
        });
        let upgArr = [];
        let upg2Arr = [];
        let packIds = [];
        let upgImg = [];
        dlcDelUpgImgs.forEach(item => {
            item.map(item => {
                let id = item.name.replace(/ /g, "-").toLowerCase();
                let prefix = "delupg-tile-";
                let pack = prefix + id;
                if (item.name === "Deluxe Upgrade") {
                    item.arr.forEach(img => upgArr.push(img));
                    if (!packIds.includes(pack)) {
                        packIds.push(pack);
                    }
                } else {
                    item.arr.forEach(img => upg2Arr.push(img));
                    if (!packIds.includes(pack)) {
                        packIds.push(pack);
                    }
                }
            });
        });
        packIds.forEach(id => {
            let pack = document.getElementById(id);
            if (pack.firstChild !== tileImg) {
                if (pack.id === packIds[0]) {
                    pack.insertAdjacentHTML(
                        "beforeend",
                        `<img src="${ upgArr[upgArr.length - 1] }" alt="" id="dlc-delupg-img" class="dlc-img tile-img img-swap no-before">`
                    );
                } else {
                    pack.insertAdjacentHTML(
                        "beforeend",
                        `<img src="${ upg2Arr[upg2Arr.length - 1] }" alt="" id="dlc-delupg2-img" class="dlc-img tile-img img-swap no-before">`
                    );
                }
            }
        });
        upgImg.push(document.getElementById("dlc-delupg-img"));
        upgImg.push(document.getElementById("dlc-delupg2-img"));
        changeImg(delConArr, delConImg[0]);
        changeImg(upgArr, upgImg[0]);
        changeImg(upg2Arr, upgImg[1]);
    }
});






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
if (window.location.pathname.includes("locations.html") || window.location.pathname.includes("vehicles.html")) {
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
}

if (window.location.pathname.includes("vehicles.html")) {
    //* FILTER POWER *//
    powerRange.forEach((input) => input.addEventListener("input", (e) => filterPowerRange(e, powerRangeMin, selectedPower, powerRange, powerInput)));
    powerInput.forEach((input) => input.addEventListener("input", (e) => filterPowerInput(e, powerRangeMin, selectedPower, powerRange, powerInput)));
    
    //* FILTER WEIGHT *//
    weightRange.forEach((input) => input.addEventListener("input", (e) => filterWeightRange(e, weightRangeMin, selectedWeight, weightRange, weightInput)));
    weightInput.forEach((input) => input.addEventListener("input", (e) => filterWeightInput(e, weightRangeMin, selectedWeight, weightRange, weightInput)));
    
    //* FILTER ENGINE *//
    engineRange.forEach((input) => input.addEventListener("input", (e) => filterEngineRange(e, engineRangeMin, selectedEngine, engineRange, engineInput)));
    engineInput.forEach((input) => input.addEventListener("input", (e) => filterEngineRange(e, engineRangeMin, selectedEngine, engineRange, engineInput)));
}

if (window.location.pathname.includes("/locations.html")) {
    forwardTab.forEach(tab => tab.addEventListener("click", () => {
        toggleForward();
    }));
    
    reverseTab.forEach(tab => tab.addEventListener("click", () => {
        toggleReverse();
    }));
}



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

tileCloseBtn.forEach(btn => btn.addEventListener("click", function(e) {
    e.stopPropagation();
    closeModal();
    btn.parentElement.parentElement.scrollIntoView({block: "center"});
}));

detailsBtn.forEach(btn => btn.addEventListener("click", (e) => {
    e.stopPropagation();
}));

// let dataFilter = { 
//     type: [],
//     manufacturer: [],
//     discipline: [],
//     specs: {
//         power: [100, 600],
//         transmission: [],
//         weight: [312, 1550],
//         drivetrain: [],
//         engine: [750, 6200],
//         cylinders: [],
//         aspiration: []
//     }
// }

// dropdownItems.forEach((item) => item.addEventListener("input", (e) => {
//     let keyName = e.target.name;
//     let keyValue = e.target.value;
//     let checked = e.target.checked;
//     let type = e.target.type;
//     if (e.target.type === "range" || e.target.type === "number") {
//         if (e.target.className === "min") {
//             if (dataFilter.specs[`${ keyName }`]) {
//                 let max = document.querySelectorAll(".max");
//                 dataFilter.specs[`${ keyName }`][0] = parseInt(keyValue);
//                 if (max.name === keyName) {
//                     dataFilter.specs[`${ keyName }`][1] = parseInt(max.value);
//                 }
//             }
//         } else {
//             if (dataFilter.specs[`${ keyName }`]) {
//                 let min = document.querySelectorAll(".min");
//                 dataFilter.specs[`${ keyName }`][1] = parseInt(keyValue);
//                 if (min.name === keyName) {
//                     dataFilter.specs[`${ keyName }`][0] = parseInt(min.value);
//                 }
//             }
//         }
//         // console.log(dataFilter.specs[`${ keyName }`]);
//         // if (dataFilter.specs[`${ keyName }`])
//         // activeFilters(keyName, keyValue, checked, type, dataFilter);
//         // return
//     } else {
//         if (keyName in dataFilter.specs) {
//             if (!dataFilter["specs"][`${ keyName }`].includes(keyValue) && checked) {
//                 dataFilter["specs"][`${ keyName }`].push(keyValue);
//             } else {
//                 dataFilter["specs"][`${ keyName }`].splice(dataFilter["specs"][`${ keyName }`].includes(keyValue), 1);
//             }
//         } else {
//             if (!dataFilter[`${ keyName }`].includes(keyValue) && checked) {
//                 dataFilter[`${ keyName }`].push(keyValue);
//             } else {
//                 dataFilter[`${ keyName }`].splice(dataFilter[`${ keyName }`].includes(keyValue), 1);
//             }
//         }
//     }
//     // console.log(dataFilter);
//     // }
//     activeFilters(keyName, keyValue, checked, type, dataFilter);
// }));