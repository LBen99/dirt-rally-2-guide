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
const mobileFilterMenu = document.getElementById("mobile-filter-menu");
const mobileFilterList = document.getElementById("mobile-filter-list");
const dropdowns = document.querySelectorAll(".dropdown-content");

//* PRICE FILTER VARIABLES *//
let rangeMin = 0;
const range = document.querySelectorAll(".range-selected");
const priceRange = document.querySelectorAll(".price-range input");
const priceInput = document.querySelectorAll(".price-input input");

//* location VARIABLES *//
const locations = document.getElementById("locationContainer");
const tiles = document.querySelectorAll(".location-tile");
const tileOpen = document.querySelectorAll(".location-tile[open]");
const primaryBtn = document.querySelectorAll(".btn-primary");
const vehicleImg = document.querySelectorAll(".location-img");
const vehicleSummary = document.querySelectorAll(".location-tile summary");
const tileCloseBtn = document.querySelectorAll(".btn-red-xmark");
const forwardTab = document.querySelectorAll(".forward-tab");
const reverseTab = document.querySelectorAll(".reverse-tab");
const forwardList = document.querySelectorAll(".stages-forward-list");
const reverseList = document.querySelectorAll(".stages-reverse-list");

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
    mobileFilterMenu.classList.add("open");
    mobileFilterList.classList.add("open");
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

function filterPriceRange(e) {
    let minRange = parseInt(priceRange[0].value);
    let maxRange = parseInt(priceRange[1].value);
    let mobileMinRange = parseInt(priceRange[2].value);
    let mobileMaxRange = parseInt(priceRange[3].value);

    if (maxRange - minRange < rangeMin) {
        if (e.target.className === "min") {
            priceRange[0].value = maxRange - rangeMin;
        } else {
            priceRange[1].value = minRange + rangeMin;
        }
    } else {
        priceInput[0].value = minRange;
        priceInput[1].value = maxRange;
        range[0].style.left = (minRange / priceRange[0].max) * 100 + "%";
        range[0].style.right = 100 - (maxRange / priceRange[1].max) * 100 + "%";
    }
        
    if (mobileMaxRange - mobileMinRange < rangeMin) {
        if (e.target.className === "min") {
            priceRange[2].value = mobileMaxRange - rangeMin;
        } else {
            priceRange[3].value = mobileMinRange + rangeMin;
        }
    } else {
        priceInput[2].value = mobileMinRange;
        priceInput[3].value = mobileMaxRange;
        range[1].style.left = (mobileMinRange / priceRange[2].max) * 100 + "%";
        range[1].style.right = 100 - (mobileMaxRange / priceRange[3].max) * 100 + "%";
    }
}

function filterPriceInput(e) {
    let minPrice = priceInput[0].value;
    let maxPrice = priceInput[1].value;
    let mobileMinPrice = priceInput[0].value;
    let mobileMaxPrice = priceInput[1].value;

    if (maxPrice - minPrice >= rangeMin && maxPrice <= priceRange[1].max) {
        if (e.target.className === "min") {
            priceRange[0].value = minPrice;
            range[0].style.left = (minPrice / priceRange[0].max) * 100 + "%";
        } else {
            priceRange[1].value = maxPrice;
            range[0].style.right = 100 - (maxPrice / priceRange[1].max) * 100 + "%";
        }
    }

    if (mobileMaxPrice - mobileMinPrice >= rangeMin && mobileMaxPrice <= priceRange[3].max) {
        if (e.target.className === "min") {
            priceRange[2].value = mobileMinPrice;
            range[1].style.left = (mobileMinPrice / priceRange[2].max) * 100 + "%";
        } else {
            priceRange[3].value = mobileMaxPrice;
            range[1].style.right = 100 - (mobileMaxPrice / priceRange[3].max) * 100 + "%";
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

function hideLocations() {
    locations.classList.add("tile-open");
    tileCloseBtn.forEach((btn) => {
        btn.classList.remove("hide");
    });
    primaryBtn.forEach((btn) => {
        btn.classList.add("hide");
    });
}

function showLocations() {
    locations.classList.remove("tile-open");
    tiles.forEach((tile) => {
        tile.classList.remove("hide");
        tile.removeAttribute("open");
    });
    tileCloseBtn.forEach((btn) => {
        btn.classList.add("hide");
    });
    primaryBtn.forEach((btn) => {
        btn.classList.remove("hide");
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

function toggleForward() {
    forwardList.forEach((list) => {
        if (list.classList.value.includes("hide")) {
            list.classList.toggle("hide");
            // reverseList.classList.add("hide");
        }
    });
    reverseList.forEach((list) => {
        if (!list.classList.value.includes("hide")) {
            list.classList.toggle("hide")
            // forwardList.classList.add("hide");
        }
    });
}

function toggleReverse() {
    reverseList.forEach((list) => {
        if (list.classList.value.includes("hide")) {
            list.classList.toggle("hide")
            // forwardList.classList.add("hide");
        }
    });
    forwardList.forEach((list) => {
        if (!list.classList.value.includes("hide")) {
            list.classList.toggle("hide");
            // reverseList.classList.add("hide");
        }
    });
}

//! EVENT LISTENERS !//
window.onresize = centerImg;
window.onload = centerImg;

wrapper.addEventListener("click", function() {
    searchClosed();
    filterClosed();
    showLocations();
});

//* SEARCH BUTTON *//
searchBtn.addEventListener("click", function(e) {
    e.stopPropagation();
    if (filterBtn.classList.value.includes("filter-open")) {
        filterClosed();
    }
    if (tileOpen) {
        showLocations();
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
        showLocations();
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

mobileFilterMenu.addEventListener("click", (e) => {
    e.stopPropagation();
});

//* FILTER PRICE *//
priceRange.forEach((input) => {
    input.addEventListener("input", filterPriceRange);
});

priceInput.forEach((input) => {
    input.addEventListener("input", filterPriceInput);
});

//* location *//
tiles.forEach(tile => tile.addEventListener("click", function(e) {
    e.stopPropagation();
    e.preventDefault();
    searchClosed();
    filterClosed();
    window.onresize = vehicleImg.forEach(img => img.setAttribute("style", "left: 0"));
    hideLocations();
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
    showLocations();
    btn.parentElement.parentElement.scrollIntoView({block: "center"});
}));

primaryBtn.forEach(btn => btn.addEventListener("click", (e) => {
    e.stopPropagation();
}));

forwardTab.forEach(tab => tab.addEventListener("click", () => {
    toggleForward();
}));

reverseTab.forEach(tab => tab.addEventListener("click", () => {
    toggleReverse();
}));