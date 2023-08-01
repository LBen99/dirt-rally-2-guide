//* PAGE *//
const wrapper = document.getElementById("wrapper");

//* SEARCH BUTTON *//
const searchBtn = document.getElementById("btn-search");
const searchInput = document.getElementById("search-input");

//*FILTER BUTTON *//
const filterBtn = document.getElementById("btn-filter");
const filterIcon = document.getElementById("filter-icon");
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
const vehicleTiles = document.querySelectorAll(".vehicle-tile");
const tileOpen = document.querySelectorAll(".tile[open]");
const detailsBtn = document.querySelectorAll(".btn-details");
const tileImg = document.querySelectorAll(".tile-img");
const tileSummary = document.querySelectorAll(".tile li");
const tileCloseBtn = document.querySelectorAll(".btn-red-xmark");
const modals = document.querySelectorAll(".modal");

//* VISUAL SPECS *//
const svgs = document.querySelectorAll("svg");
const svgBox = document.querySelectorAll(".box");
const percentageBox = document.querySelectorAll(".percentage");
const numberDiv = document.querySelectorAll(".number");
const percentageText = document.querySelectorAll(".text");
const visualSpecs = document.querySelectorAll(".visual-specs");
const svgCircles = document.querySelectorAll("circle");
const powerBox = document.querySelectorAll(".power-box");
const engineBox = document.querySelectorAll(".engine-box");
const weightBox = document.querySelectorAll(".weight-box");

//* CAROUSEL *//
const tileCarousel = document.querySelectorAll(".dlc-tile-items");
const dlcTiles = document.querySelectorAll(".dlc-slider-tile");
const prevBtn = document.querySelectorAll(".prev-btn");
const nextBtn = document.querySelectorAll(".next-btn");
const blurDivs = document.querySelectorAll(".background-blur");
const textList = document.querySelectorAll(".dlc-text-list");
let xDown = null;


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

function searchOpen() {
    searchBtn.classList.add("search-open");
    closeModal();
}

function searchClosed() {
    searchBtn.classList.remove("search-open");
}

function searchItems(e) {
    tiles.forEach(tile => {
        let input = e.target.value.toLowerCase();
        let id = tile.id;
        if (id.includes(input)) {
            tile.classList.remove("hide");
            return;
        }
        tile.classList.add("hide");
    });
}

function filterOpen() {
    filterBtn.classList.add("filter-open");
    filterList.classList.add("open");
    filterIcon.classList.remove("show");
    closeModal();
}

function filterClosed() {
    filterBtn.classList.remove("filter-open");
    filterList.classList.remove("open");
    filterIcon.classList.add("show");
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

function showTiles() {
    containers.forEach((container) => container.classList.remove("tile-open"));
    tiles.forEach((tile) => {
        tile.classList.remove("hide");
    });
    centerImg();
    window.onresize = centerImg;
}

function closeModal() {
    modals.forEach((modal) => {
        if (!modal.classList.value.includes("hide")) {
            modal.classList.add("hide");
            if (window.location.pathname.includes("vehicles.html")) {
                originalScale();
            }
        }
    })
}

function openModal(e) {
    let id = e.target.id.replace("-details-btn", "");
    modals.forEach(modal => {
        if (modal.id === id + "-modal") {
            modal.classList.remove("hide")
            if (window.location.pathname.includes("vehicles.html")) {
                scaleViewBox();
                scaleText();
                adjustDash(id);
            }
        }
    });
}

function originalScale() {
    svgBox.forEach(box => {
        box.removeAttribute("style");
    });
    svgs.forEach(svg => {
        svg.setAttribute("viewBox", "0 0 150 150");
    });
    svgCircles.forEach(circle => {
        circle.removeAttribute("style");
    });
    numberDiv.forEach(div => {
        div.removeAttribute("style");
    });
    percentageText.forEach(item => {
        item.removeAttribute("style");
    });
}

function scaleViewBox() {
    let side;
    svgBox.forEach(box => {
        let width = parseFloat(box.offsetWidth);
        if (width > 0) {
            side = width;
            box.style.height = `${ side }px`
            box.style.width = `${ side }px`
        }
    });
    
    let viewBox = `0 0 ${ side } ${ side }`;
    svgs.forEach(svg => {
        svg.setAttribute("viewBox", viewBox);
    });
}

function scaleText() {
    let width;
    let scale;
    percentageBox.forEach(box => {
        width = box.offsetWidth;
        if (width > 0) {
            scale = (width / 150) * 100;
        }
    });

    numberDiv.forEach(div => {
        div.style.transform = `scale(${ scale }%)`;
    });

    let scalePercent = parseFloat("." + scale)
    percentageText.forEach(item => {
        if (scalePercent * 100 !== 10) {
            item.style.transform.scale = scalePercent;
            item.style.fontSize = scalePercent * 100 + "%";
        }
    });    
}

function adjustDash(id) {
    let thisModal = document.getElementById(id + "-modal");
    let modalSvgs = thisModal.getElementsByTagName("svg");
    let circleLength;
    let green = "#20fb62";
    let orange = "#ffbb00";
    let red = "var(--red-400)";
    let thisPower = thisModal.getElementsByClassName("power-text-value").item(0);
    let thisEngine = thisModal.getElementsByClassName("engine-text-value").item(0);
    let thisWeight = thisModal.getElementsByClassName("weight-text-value").item(0);
    let thisPowerInt = parseInt(thisPower.innerHTML);
    let thisEngineInt = parseInt(thisEngine.innerHTML);
    let thisWeightInt = parseInt(thisWeight.innerHTML);

    let power = []
    let engine = [];
    let weight = [];

    modals.forEach(modal => {
        power.push(parseInt(modal.querySelectorAll(".power-text-value").item(0).innerText));
        engine.push(parseInt(modal.querySelectorAll(".engine-text-value").item(0).innerText));
        weight.push(parseInt(modal.querySelectorAll(".weight-text-value").item(0).innerText));
    });

    let powerBarColour;
    let powerRange = thisPowerInt / Math.max(...power) * 100;
    let lowPower = Math.max(...power) / 3;
    let medPower = Math.max(...power) / 1.5;
    if (thisPowerInt < lowPower) {
        powerBarColour = red;
    }
    if (thisPowerInt >= lowPower && thisPowerInt < medPower) {
        powerBarColour = orange;
    }
    if (thisPowerInt >= medPower) {
        powerBarColour = green;
    }

    let engineBarColour;
    let engineRange = thisEngineInt / Math.max(...engine) * 100;
    let lowEngine = Math.max(...engine) / 3;
    let medEngine = Math.max(...engine) / 1.5;
    if (thisEngineInt < lowEngine) {
        engineBarColour = red;
    }
    if (thisEngineInt >= lowEngine && thisEngineInt < medEngine) {
        engineBarColour = orange;
    }
    if (thisEngineInt >= medEngine) {
        engineBarColour = green;
    }

    let weightBarColour;
    let weightRange = thisWeightInt / Math.max(...weight) * 100;
    let lowWeight = Math.max(...weight) / 3;
    let medWeight = Math.max(...weight) / 1.5;
    if (thisWeightInt < lowWeight) {
        weightBarColour = green;
    }
    if (thisWeightInt >= lowWeight && thisWeightInt < medWeight) {
        weightBarColour = orange;
    }
    if (thisWeightInt >= medWeight) {
        weightBarColour = red;
    }

    for (let i = 0; i < modalSvgs.length; i++) {
        let values = modalSvgs[i].getAttribute("viewBox").split(" ");
        let side = parseInt(values[values.length - 1]);
        let r = side *  .45;
        circleLength = 2 * Math.PI * r;
        modalSvgs[i].firstElementChild.style.setProperty("stroke-dasharray", circleLength);
        modalSvgs[i].lastElementChild.style.setProperty("stroke-dasharray", circleLength);
        modalSvgs[i].firstElementChild.style.setProperty("stroke-dashoffset", 0);
        modalSvgs[i].lastElementChild.style.setProperty("stroke-dashoffset", circleLength);
    }

    powerBox.forEach(box => {
        if (thisModal.contains(box)) {
            let circle = box.getElementsByTagName("circle")[1];
            const strokeIncrement = powerRange / thisPowerInt;
            const progressStartValue = [0];
            const progressEndValue = thisPowerInt;
            circle.style.setProperty("stroke-dashoffset", circleLength - (circleLength * powerRange) / 100);
            circle.style.setProperty("stroke", powerBarColour);

            const interval = setInterval(() => {
                animateCircle(progressStartValue, progressEndValue, circle.style, circleLength, strokeIncrement, thisPower, interval);
            }, 1);
        }
    });

    engineBox.forEach(box => {
        if (thisModal.contains(box)) {
            let circle = box.getElementsByTagName("circle")[1];
            const strokeIncrement = engineRange / thisEngineInt;
            const progressStartValue = [0];
            const progressEndValue = thisEngineInt;
            circle.style.setProperty("stroke-dashoffset", circleLength - (circleLength * engineRange) / 100);
            circle.style.setProperty("stroke", engineBarColour);

            const interval = setInterval(() => {
                animateCircle(progressStartValue, progressEndValue, circle.style, circleLength, strokeIncrement, thisEngine, interval);
            }, 1);
        }
    });

    weightBox.forEach(box => {
        if (thisModal.contains(box)) {
            let circle = box.getElementsByTagName("circle")[1];
            const strokeIncrement = weightRange / thisWeightInt;
            const progressStartValue = [0];
            const progressEndValue = thisWeightInt;
            circle.style.setProperty("stroke-dashoffset", circleLength - (circleLength * weightRange) / 100);
            circle.style.setProperty("stroke", weightBarColour);

            const interval = setInterval(() => {
                animateCircle(progressStartValue, progressEndValue, circle.style, circleLength, strokeIncrement, thisWeight, interval);
            }, 1);
        }
    });
}

function animateCircle(progressStartValue, progressEndValue, circle, circleLength, increment, text, interval) {
    if (progressStartValue[0] < progressEndValue) {
        let count = progressEndValue / 100
        progressStartValue[0] += count;
        let textValue = parseInt(progressStartValue[0])
        text.textContent = `${ textValue }`
        circle.setProperty("stroke-dashoffset", circleLength - (circleLength * (progressStartValue[0] * increment)) / 100);
        return;
    }
    clearInterval(interval);
}

window.onresize = centerImg;
window.onload = centerImg;

if (window.location.pathname.includes("locations.html") || window.location.pathname.includes("vehicles.html")) {
    wrapper.addEventListener("click", function(e) {
        searchClosed();
        filterClosed();
    });
   
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

    searchInput.addEventListener("input", (e) => searchItems(e));
    
    //* FILTERS *//
    filterBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        if (searchBtn.classList.value.includes("search-open")) {
            searchClosed();
        }
        // if (tileOpen) {
        //     showTiles();
        // }
        filterOpen();
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

    tiles.forEach(tile => tile.addEventListener("click", () => {
    searchClosed();
    filterClosed();
    window.onresize = tileImg.forEach(img => img.setAttribute("style", "left: 0"));
    }));
    
    detailsBtn.forEach(btn => btn.addEventListener("click", (e) => {
    closeModal();
    openModal(e);
    }));
    
    tileCloseBtn.forEach(btn => btn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeModal();
    btn.parentElement.parentElement.scrollIntoView({block: "center"});
    }));
}

if (window.location.pathname.includes("vehicles.html")) {
    const activeFilters = [];
    let filteredVehicles = [];
    let baseFiltered = [];
    let selectedFilters = [];

    function sliderMin(availableFilters, input, name) {
        availableFilters.map(filter => {
            if (filter.name === name) {
                if (input.classList.value.includes("min")) {
                    const values = [];
                    
                    baseFiltered.forEach(vehicle => {
                        if (!values.includes(vehicle.specs[name])) {
                            values.push(vehicle.specs[name]);
                        }
                    });

                    let filteredMinValue = Math.min(...values);
                    filteredMinValue = filteredMinValue.toString();

                    let filteredMaxValue = Math.max(...values);
                    filteredMaxValue = filteredMaxValue.toString();

                    let parseInput = parseInt(input.value);
                    let parseMin = parseInt(filteredMinValue);
                    let parseMax = parseInt(filteredMaxValue);

                    if (parseInput < parseMin) {
                        input.value = filteredMinValue;
                        filter.value[0] = parseMin;
                    } if (parseInput > parseMax) {
                        input.value = filteredMaxValue;
                        filter.value[0] = parseMax;
                    } else if (parseInput >= parseMin && parseInput <= parseMax) {
                        filter.value[0] = parseInput;
                    }
                }
            }
        });

    }

    function sliderMax(availableFilters, input, name) {
        availableFilters.map(filter => {
            if (filter.name === name) {
                if (input.classList.value.includes("max")) {
                    const values = [];
                    
                    baseFiltered.forEach(vehicle => {
                        if (!values.includes(vehicle.specs[name])) {
                            values.push(vehicle.specs[name]);
                        }
                    });

                    let filteredMinValue = Math.min(...values);
                    filteredMinValue = filteredMinValue.toString();
                    
                    let filteredMaxValue = Math.max(...values);
                    filteredMaxValue = filteredMaxValue.toString();

                    let parseInput = parseInt(input.value);
                    let parseMin = parseInt(filteredMinValue);
                    let parseMax = parseInt(filteredMaxValue);

                    if (parseInput < parseMin) {
                        input.value = filteredMinValue;
                        filter.value[1] = parseMin;
                    } if (parseInput > parseMax) {
                        input.value = filteredMaxValue;
                        filter.value[1] = parseMax;
                    } else if (parseInput >= parseMin && parseInput <= parseMax) {
                        filter.value[1] = parseInput;
                    }
                }
            }
        });
    }

    function updateSliderBar(selectedRange, availableFilters, minValue, maxValue, minRangeMax, maxRangeMax) {
        let rangeName = selectedRange.id.replace("-", " ").split(" ")[0];

        availableFilters.forEach(filter => {
            if (rangeName === filter.name) {
                selectedRange.style.left = (minValue / minRangeMax) * 100 + "%";
                selectedRange.style.right = 100 - (maxValue / maxRangeMax) * 100 + "%";
            }
        });
    }

    function adjustSliders(e, filterBy, availableFilters, input, name, secondaryVal) {
        let sliderActive = filterBy.find(filter => filter.name === "power" || filter.name === "weight" || filter.name === "engine");
        let selectedRange = document.getElementById(`${name}-range-selected`);
        let minValue;
        let maxValue;
        let minRangeMax;
        let maxRangeMax;

        let values = [];

        baseFiltered.forEach(vehicle => {
            if (!values.includes(vehicle.specs[name])) {
                values.push(vehicle.specs[name]);
            }
        });

        if (!sliderActive) {
            availableFilters.map(filter => {
                if (filter.name === name) {
                    if (input.classList.value.includes("min")) {
                        if (e.target.type === "checkbox") {
                            let val = Math.min(...values).toString();
                            input.value = val;
                        } else {
                            let val = parseInt(input.value);
                            filter.value[0] = val;
                        }
    
                        minValue = parseInt(input.value) - secondaryVal;
                        minRangeMax = parseInt(input.max) - secondaryVal;
                    } else if (input.classList.value.includes("max")) {
                        if (e.target.type === "checkbox") {
                            let val = Math.max(...values).toString();
                            input.value = val;
                        } else {
                            let val = parseInt(input.value);
                            filter.value[1] = val;
                        }
    
                        maxValue = parseInt(input.value) - secondaryVal;
                        maxRangeMax = parseInt(input.max) - secondaryVal;
                    }
                }
            });
        } else {
            filterBy.forEach(filter => {
                if (filter.name === name) {
                    if (input.classList.value.includes("min")) {
                        let val = parseInt(input.value);
                        filter.value[0][0] = val;
                    } else if (input.classList.value.includes("max")) {
                        let val = parseInt(input.value);
                        filter.value[0][1] = val;
                    }
                }
            });
        }

        updateSliderBar(selectedRange, availableFilters, minValue, maxValue, minRangeMax, maxRangeMax);
    }

    function filterRange(e, rangeMin, bar, range, number, filterBy, availableFilters, input, name) {
        let secondaryVal;
        let sliderName = bar.id.replace("-", " ").split(" ")[0];

        if (sliderName === "power") {
            secondaryVal = 100;
        } if (sliderName === "weight") {
            secondaryVal = 312;
        } else if (sliderName === "engine") {
            secondaryVal = 750;
        }

        let minRange = parseInt(range[0].value) - secondaryVal;
        let maxRange = parseInt(range[1].value) - secondaryVal;

        if (maxRange - minRange < rangeMin) {
            if (e.target.className === "min") {
                range[0].value = (maxRange + secondaryVal) - rangeMin;
            } else {
                range[1].value = (minRange + secondaryVal) + rangeMin;
            }
        } else {
            number[0].value = minRange + secondaryVal;
            number[1].value = maxRange + secondaryVal;
            bar.style.left = (minRange / (range[0].max - secondaryVal)) * 100 + "%";
            bar.style.right = 100 - (maxRange / (range[1].max - secondaryVal)) * 100 + "%";
        }
        
        sliderMin(availableFilters, input, name);
        sliderMax(availableFilters, input, name);
        adjustSliders(e, filterBy, availableFilters, input, name, secondaryVal);
    }

    function filterNumber(e, rangeMin, bar, range, number, filterBy, availableFilters, input, name) {
        let secondaryVal;
        let sliderName = bar.id.replace("-", " ").split(" ")[0];

        if (sliderName === "power") {
            secondaryVal = 100;
        } if (sliderName === "weight") {
            secondaryVal = 312;
        } else if (sliderName === "engine") {
            secondaryVal = 750;
        }

        let minPower = parseInt(number[0].value) - secondaryVal;
        let maxPower = parseInt(number[1].value) - secondaryVal;
    
        if (maxPower - minPower >= rangeMin && maxPower <= (range[1].max - secondaryVal)) {
            if (e.target.className === "min") {
                range[0].value = minPower + secondaryVal;
                bar.style.left = (minPower / (range[0].max - secondaryVal)) * 100 + "%";
            } else {
                range[1].value = maxPower + secondaryVal;
                bar.style.right = 100 - (maxPower / (range[1].max - secondaryVal)) * 100 + "%";
            }
        }

        sliderMin(availableFilters, input, name);
        sliderMax(availableFilters, input, name);
        adjustSliders(e, filterBy, availableFilters, input, name, secondaryVal);
    }

    function selectFilters(e) {
        let checked = e.target.checked;
        let value = e.target.value;
        let name = e.target.name;
        name = name.replace(/[A-Z]/, " ").split(" ")[0];

        if (name === "power" || name === "engine" || name === "weight") {
            const found = activeFilters.find(filter => filter.name === name);
            if (found) {
                const index = activeFilters.findIndex((filter => filter.name === name));
                if (e.target.classList.value === "min") {
                    activeFilters[index].value[0] = parseInt(value);
                } else {
                    activeFilters[index].value[1] = parseInt(value);
                }
            } else {
                if (e.target.classList.value === "min") {
                    activeFilters.push({name, "value": [parseInt(value), parseInt(e.target.max)]});
                } else {
                    activeFilters.push({name, "value": [parseInt(e.target.min), parseInt(value)]});
                }
            }
        } else {
            if (name === "cylinders") {
                value = parseInt(value);
            }

            if (checked) {
                activeFilters.push({name, value});
            } else {
                const index = activeFilters.findIndex((filter => filter.value === value));
                activeFilters.splice(index, 1);
            }
        }
    }

    function fVehicles(filterArr, filterBy, filterName) {
        const filterVehicles = filterArr.reduce((filtered, vehicle) => {
            filterBy.forEach(filter => {
                if (filter.name === filterName && filterArr.includes(vehicle)) {
                    if (filter.name === "power" || filter.name === "engine" || filter.name === "weight") {
                        const min = filter.value[0][0];
                        const max = filter.value[0][1];
                        const value = vehicle.specs[filter.name];
    
                        if (value < min || value > max) {
                            if (filtered.vehicles.includes(vehicle)) {
                                filtered.vehicles.splice(filtered.vehicles.indexOf(vehicle), 1);
                            }
                        } else {
                            if (!filtered.vehicles.includes(vehicle)) {
                                filtered.vehicles.push(vehicle);
                            }
                        }
                    } else {
                        if (filterName === "aspiration") {
                            let value;
                            value = [];
                            filter.value.forEach(val => {
                                if (vehicle.specs.aspiration.includes(val)) {
                                    value.push(val);
                                    if (!filtered.vehicles.includes(vehicle)) {
                                        filtered.vehicles.push(vehicle);
                                    }
                                }
                            });
                        } else {
                            const value = vehicle.specs[filter.name] || vehicle[filter.name];
                            if (filter.value.includes(value) && filter.name === filterName) {
                                if (!filtered.vehicles.includes(vehicle)) {
                                    filtered.vehicles.push(vehicle);
                                }
                            }
                        }
                    }
                }
            });
            return filtered;
        }, {"name": filterName, "vehicles": []});
        return filterVehicles;
    }

    function firstFilter(e, filterBy, name, min, max) {
        let filterArr = vehicles;
        const res = fVehicles(filterArr, filterBy, name);
        if (filterBy.length < 1) {
            filteredVehicles = [];
            baseFiltered = [];
            return;
        }

        if (filterBy[0].name === "power" || filterBy[0].name === "engine" || filterBy[0].name === "weight") {
            baseFiltered = res.vehicles;
    
            if (filterBy[0].value[0][0] === min && filterBy[0].value[0][1] === max) {
                activeFilters.splice(0, 1);
                baseFiltered = [];
                filteredVehicles = baseFiltered;
            } else {
                filteredVehicles = baseFiltered;
            }
        } else {
            res.vehicles.forEach(vehicle => {
                if (!baseFiltered.includes(vehicle)) {
                    baseFiltered.push(vehicle);
                }

                if (selectedFilters.length < 1) {
                    if (!filteredVehicles.includes(vehicle)) {
                        filteredVehicles.push(vehicle);
                    }
                }
            });
    
            if (!e.target.checked) {
                if (selectedFilters.length > 0) {
                    selectedFilters = [];
                    filteredVehicles = baseFiltered;
                } else {
                    let filterArr = baseFiltered;
                    const res = fVehicles(filterArr, filterBy, name);
    
                    baseFiltered = res.vehicles;
                    filteredVehicles = baseFiltered;
                }
            }
        }           
    }

    function updateFilter(e, filterBy) {
        selectedFilters = [];

        filterBy.forEach(filter => {
            let filterArr;
    
            if (!e.target.checked && filterBy[0].name === filter.name) {
                filterArr = vehicles;
            } else {
                if (selectedFilters.length < 1) {
                    filterArr = baseFiltered;
                } else {
                    filterArr = selectedFilters[selectedFilters.length - 1].vehicles;
                }
            }

            const res = fVehicles(filterArr, filterBy, filter.name);
            
            if (filterBy[0].name !== filter.name) {
                selectedFilters.push(res);
            } else {
                baseFiltered = res.vehicles;
            }

            return filteredVehicles = res.vehicles;
        });

        enableDisableFilters(e, filterBy)
    }

    function createEntries(vehicle) {
        let entries = Object.entries(vehicle);
        const entryArr = [];

        entries.forEach(entry => {
            let name = entry[0];
            let value = entry[1];
    
            if (name === "specs") {
                let specEntries = Object.entries(value);
                specEntries.forEach(specEntry => {
                    let specName = specEntry[0];
                    let specValue = specEntry[1];
    
                    entryArr.push({"name": specName, "value": specValue});
                });
            } else {
                entryArr.push({"name": name, "value": value});
            }
        });

        return entryArr;
    }

    function enableDisableFilters(e, filterBy) {
        const availableFilters = [];
        const sortedFilters = [];

        if (selectedFilters.length >= 1) {            
            baseFiltered.forEach(vehicle => {
                const entryArr = createEntries(vehicle);

                entryArr.map(entry => {
                    let name = entry.name;
                    let value = entry.value;
                    const found = availableFilters.find(filter => filter.name === name);

                    if (availableFilters.length > 0) {                        
                        if (found) {
                            const index = availableFilters.findIndex(filter => filter.name === name);
    
                            if (name === "aspiration") {
                                value.forEach(val => {
                                    if (!availableFilters[index].value.includes(val)) {
                                        availableFilters[index].value.push(val);
                                    }
                                });
                            } else {
                                if (!availableFilters[index].value.includes(value)) {
                                    availableFilters[index].value.push(value);
                                }
                            }
                        } else {
                            if (Array.isArray(value)) {
                                value = value.toString();
                            }
                            
                            availableFilters.push({"name": name, "value": [value]});
                        }
                    } else {
                        if (name === "aspiration") {
                            availableFilters.push({"name": name, "value": value});
                        } else {
                            availableFilters.push({"name": name, "value": [value]});
                        }
                    }
                });
            });
            
            
            activeFilters.forEach(() => {
                baseFiltered.filter(vehicle => {
                    return activeFilters.some(filter => {
                        let res = filter.value.includes(vehicle[filter.name] || vehicle.specs[filter.name]);
                        let valuesValue = vehicle[filter.name] || vehicle.specs[filter.name];

                        if (filter.name === "aspiration") {
                            filterBy.forEach(f => {
                                if (f.name === "aspiration") {
                                    f.value.forEach(val => {
                                        res = valuesValue.includes(val);
                                    });
                                }
                            });
                        }

                        if (filter.name === "power" || filter.name === "weight" || filter.name === "engine") {
                            filterBy.forEach(f => {
                                if (f.name === "power" || f.name === "weight" || f.name === "engine") {
                                    const between = (val, min, max) => {
                                        return val >= min && val <= max;
                                    }

                                    let val = valuesValue;
                                    let min = f.value[0][0];
                                    let max = f.value[0][1];

                                    if (between(val, min, max)) {
                                        res = valuesValue;
                                    }
                                }
                            });
                        }

                        if (res) {
                            const foundName = sortedFilters.find(sortedFilter => sortedFilter.name === filter.name);
                            if (foundName) {
                                const nameIndex = sortedFilters.findIndex(sortedFilter => sortedFilter.name === filter.name);
                                if (filter.name === "aspiration") {
                                    valuesValue.forEach(valsVal => {
                                        const foundAspiration = sortedFilters[nameIndex].values.find(val => val.value === valsVal);

                                        if (foundAspiration) {
                                            const valueIndex = sortedFilters[nameIndex].values.findIndex(val => val.value === valsVal);

                                            if (!sortedFilters[nameIndex].values[valueIndex].vehicles.includes(vehicle)) {
                                                sortedFilters[nameIndex].values[valueIndex].vehicles.push(vehicle);
                                            }
                                        } else {
                                            sortedFilters[nameIndex].values.push({"value": valsVal, "vehicles": [vehicle]});
                                        }
                                    });
                                } else {
                                    if (sortedFilters[nameIndex].values.find(val => val.value === valuesValue)) {
                                        const valueIndex = sortedFilters[nameIndex].values.findIndex(val => val.value === valuesValue);
        
                                        if (!sortedFilters[nameIndex].values[valueIndex].vehicles.includes(vehicle)) {
                                            sortedFilters[nameIndex].values[valueIndex].vehicles.push(vehicle);
                                        }
                                    } else {
                                        sortedFilters[nameIndex].values.push({"value": valuesValue, "vehicles": [vehicle]});
                                    }
                                }
                            } else {
                                if (filter.name === "aspiration") {
                                    sortedFilters.push({"name": filter.name, "values": [{"value": valuesValue[0], "vehicles": [vehicle]}]});
                                } else {
                                    sortedFilters.push({"name": filter.name, "values": [{"value": valuesValue, "vehicles": [vehicle]}]});
                                }
                            }
                        }
                    });
                });
            });

            const sortedVehicles = [];
            const notMatch = [];

            if (selectedFilters.length > 1) {
                baseFiltered.forEach(vehicle => {
                    filterBy.forEach(filter => {
                        if (vehicle.specs[filter.name]) {
                            if (filter.name === "aspiration") {
                                filter.value.forEach(val => {
                                    if (!vehicle.specs[filter.name].includes(val)) {
                                        notMatch.push(vehicle);
                                    }
                                })
                            } else if (filter.name === "power" || filter.name === "weight" || filter.name === "engine") {
                                const between = (val, min, max) => {
                                    return val >= min && val <= max;
                                }
            
                                let val = vehicle.specs[filter.name];
                                let min = filter.value[0][0];
                                let max = filter.value[0][1];
            
                                if (!between(val, min, max)) {
                                    notMatch.push(vehicle)
                                }
                            } else {
                                if (!filter.value.includes(vehicle.specs[filter.name])) {
                                    notMatch.push(vehicle);
                                }
                            }
                        } else if (vehicle[filter.name]) {
                            if (!filter.value.includes(vehicle[filter.name])) {
                                notMatch.push(vehicle);
                            }
                        }
                    });
                });
            }

            filteredVehicles.forEach(vehicle => {
                if (!notMatch.includes(vehicle)) {
                    if (!sortedVehicles.includes(vehicle)) {
                        sortedVehicles.push(vehicle);
                    }
                }
            });

            const matchSomeArr = [];
            sortedFilters.forEach(sortedFilter => {
                sortedFilter.values.forEach(value => {
                    let matchSome;

                    notMatch.forEach(v => {
                        if (v.specs[sortedFilter.name]) {
                            if (sortedFilter.name === "aspiration") {
                                matchSome = notMatch.find(vehicle => vehicle.specs.aspiration.includes(value.value));
                            } else {
                                matchSome = notMatch.find(vehicle => vehicle.specs[sortedFilter.name] === value.value);
                            }
                        } else if (v[sortedFilter.name]) {
                            matchSome = notMatch.find(vehicle => vehicle[sortedFilter.name] === value.value);
                        }
                    })

                    if (matchSome !== undefined) {
                        matchSomeArr.push(matchSome);
                    }

                    let uniqueElements = [...new Set(matchSomeArr)];
                    
                    let count = uniqueElements.map(element => [
                        element,
                        matchSomeArr.filter(el => el === element).length
                    ]);

                    count.forEach(vehicle => {
                        if (filterBy[filterBy.length - 1].name === "aspiration") {
                            if (vehicle[filterBy.length - 2] === filterBy.length) {
                                if (!sortedVehicles.includes(vehicle[0])) {
                                    sortedVehicles.push(vehicle[0]);
                                }
                            }
                        } 
                        if (filterBy[filterBy.length - 2].name === "power" || filterBy[filterBy.length - 2].name === "weight" || filterBy[filterBy.length - 2].name === "engine") {
                            const between = (val, min, max) => {
                                return val >= min && val <= max;
                            }
                            
                            matchSomeArr.forEach(v => {
                                let val = v.specs[filterBy[filterBy.length - 2].name];
                                let min = filterBy[filterBy.length - 2].value[0][0];
                                let max = filterBy[filterBy.length - 2].value[0][1];
    
                                if (between(val, min, max)) {
                                    sortedVehicles.push(v);
                                }
                            })
                        } 
                        else {
                            if (vehicle[filterBy.length - 2] === (filterBy.length - 1)) {
                                if (!sortedVehicles.includes(vehicle[0])) {
                                    sortedVehicles.push(vehicle[0]);
                                }
                            }
                        }
                    });
                });
            });

            const newArr = [];

            sortedVehicles.forEach(vehicle => {
                const entryArr = createEntries(vehicle);

                if (!filteredVehicles.includes(vehicle)) {
                    const unfilteredEntryArr = createEntries(vehicle);

                    if (unfilteredEntryArr !== undefined) {
                        unfilteredEntryArr.map(entry => {
                            let name = entry.name;
                            let value = entry.value;
                            const found = newArr.find(filter => filter.name === name);
        
                            if (found) {
                                const index = newArr.findIndex(filter => filter.name === name);
        
                                if (name === "aspiration") {
                                    value.forEach(val => {
                                        if (!newArr[index].value.includes(val)) {
                                            newArr[index].value.push(val);
                                        }
                                    });
                                } else {
                                    if (!newArr[index].value.includes(value)) {
                                        newArr[index].value.push(value);
                                    }
                                }
                            } else {
                                if (Array.isArray(value)) {
                                    newArr.push({"name": name, "value": [value[0]]});
                                } else {

                                    newArr.push({"name": name, "value": [value]});
                                }
    
                            }
                        });
                    }
                } else {
                    entryArr.map(entry => {
                        let name = entry.name;
                        let value = entry.value;
                        const found = newArr.find(filter => filter.name === name);
    
                        if (found) {
                            const index = newArr.findIndex(filter => filter.name === name);
    
                            if (name === "aspiration") {
                                value.forEach(val => {
                                    if (!newArr[index].value.includes(val)) {
                                        newArr[index].value.push(val);
                                    }
                                });
                            } else {
                                if (!newArr[index].value.includes(value)) {
                                    newArr[index].value.push(value);
                                }
                            }
                        } else {
                            if (name === "aspiration") {
                                newArr.push({"name": name, "value": [value[0]]});
                            } else {
                                newArr.push({"name": name, "value": [value]});
                            }
                        }
                    });
                }
            });

            newArr.forEach(newFilter => {
                const found = availableFilters.find(filter => filter === newFilter);
                const index = availableFilters.findIndex(filter => filter.name === newFilter.name);
                
                if (!found) {
                    if (selectedFilters.length > 1) {
                            availableFilters[index] = newFilter;
                    } else {
                        if (availableFilters[index] !== newFilter) {
                            if (availableFilters[index].name !== selectedFilters[0].name) {
                                availableFilters[index] = newFilter;
                            }
                        }
                    }
                }
            });

            const valuesVehicles = [];
            sortedFilters[sortedFilters.length - 1].values.forEach(value => {
                value.vehicles.forEach(vehicle => {
                    if (!valuesVehicles.includes(vehicle)) {
                        valuesVehicles.push(vehicle);
                    }
                });
            });

            valuesVehicles.forEach(vehicle => {
                filterBy.forEach(filter => {
                    let found
                    
                    if (vehicle.specs[filter.name]) {
                        if (filter.name === "aspiration") {
                            found = filter.value.find(val => vehicle.specs[filter.name].includes(val));
                        } else if (filter.name === "power" || filter.name === "weight" || filter.name === "engine") { 
                            found = filter.value.find(val => vehicle.specs[filter.name] >= val[0] && vehicle.specs[filter.name] <= val[1]);
                        } else {
                            found = filter.value.find(val => val === vehicle.specs[filter.name]);
                        }
                    } else if (vehicle[filter.name]) {
                        found = filter.value.find(val => val === vehicle[filter.name]);
                    }

                    if (!found) {
                        const foundFilter = availableFilters.find(availableFilter => availableFilter.name === filterBy[filterBy.length - 2].name);

                        if (foundFilter) {
                            const index = availableFilters.findIndex(availableFilter => availableFilter.name === filterBy[filterBy.length - 2].name);
                            if (vehicle.specs[filterBy[filterBy.length - 2].name]) {
                                if (filter.name === "aspiration") {
                                    vehicle.specs.aspiration.forEach(val => {
                                        if (!availableFilters[index].value.includes(val)) {
                                            availableFilters[index].value.push(val);
                                        }
                                    });
                                } else {
                                    if (!availableFilters[index].value.includes(vehicle.specs[filterBy[filterBy.length - 2].name])) {
                                        availableFilters[index].value.push(vehicle.specs[filterBy[filterBy.length - 2].name]);
                                    }
                                }
                            } else if (vehicle[filterBy[filterBy.length - 2].name]) {
                                if (!availableFilters[index].value.includes(vehicle[filterBy[filterBy.length - 2].name])) {
                                    availableFilters[index].value.push(vehicle[filterBy[filterBy.length - 2].name]);
                                }
                            }
                        }
                    } else {
                        const foundFilter = availableFilters.find(availableFilter => availableFilter.name === filter.name);

                        if (foundFilter) {
                            const index = availableFilters.findIndex(availableFilter => availableFilter.name === filter.name);

                            if (vehicle.specs[filter.name]) {
                                if (filter.name === "aspiration") {
                                    vehicle.specs.aspiration.forEach(val => {
                                        if (!availableFilters[index].value.includes(val)) {
                                            availableFilters[index].value.push(val);
                                        }
                                    });
                                } else {
                                    if (!availableFilters[index].value.includes(vehicle.specs[filter.name])) {
                                        availableFilters[index].value.push(vehicle.specs[filter.name]);
                                    }
                                }
                            } else if (vehicle[filter.name]) {
                                if (!availableFilters[index].value.includes(vehicle[filter.name])) {
                                    availableFilters[index].value.push(vehicle[filter.name]);
                                }
                            }
                        }
                    }
                });
            });
        } else {
            baseFiltered.forEach(vehicle => {
                const entryArr = createEntries(vehicle);

                entryArr.map(entry => {
                    let name = entry.name;
                    let value = entry.value;
    
                    if (availableFilters.length > 0) {
                        const found = availableFilters.find(filter => filter.name === name);
                        
                        if (found) {
                            const index = availableFilters.findIndex(filter => filter.name === name);
                            
                            if (name === "aspiration") {
                                value.forEach(val => {
                                    if (!availableFilters[index].value.includes(val)) {
                                        availableFilters[index].value.push(val);
                                    }
                                });
                            } else {
                                if (!availableFilters[index].value.includes(value)) {
                                    availableFilters[index].value.push(value);
                                }
                            }
                        } else {
                            if (Array.isArray(value)) {
                                value = value.toString();
                            }
                            
                            availableFilters.push({"name": name, "value": [value]});
                        }
                    } else {
                        if (name === "aspiration") {
                            availableFilters.push({"name": name, "value": value});
    
                        } else {
                            availableFilters.push({"name": name, "value": [value]});
                        }
                    }
                });
            });
        }
        
        availableFilters.forEach(filter => {
            if (e.target.type !== "checkbox") {
                let name = e.target.name.split(/[A-Z]/)[0];
                
                if (filter.name === name) {
                    let min;
                    let max;
    
                    const dropdownInput = document.getElementById(`${name}-dropdown-content`);
                    const values = [];
    
                    baseFiltered.forEach(vehicle => {
                        if (!values.includes(vehicle.specs[name])) {
                            values.push(vehicle.specs[name]);
                        }
                    });
    
                    dropdownInput.querySelectorAll("input").forEach(input => {
                        let parseInput = parseInt(input.value);
                        let mathMin = Math.min(...values);
                        let mathMax = Math.max(...values);
    
                        if (input.classList.value.includes("min")) {
                            if (parseInput < mathMin) {
                                min = mathMin;
                            } if (parseInput > mathMax) {
                                min = mathMax;
                            } else if (parseInput >= mathMin && parseInput <= mathMax) {
                                min = parseInput;
                            }
                        } else if (input.classList.value.includes("max")) {
                            if (parseInput < mathMin) {
                                max = mathMin;
                            } if (parseInput > mathMax) {
                                max = mathMax;
                            } else if (parseInput >= mathMin && parseInput <= mathMax) {
                                max = parseInput;
                            }
                        }
                    });

                    filter.value = [min, max];
                }
            } else {
                if (filter.name === "power" || filter.name === "weight" || filter.name === "engine") {
                    let min = Math.min(...filter.value);
                    let max = Math.max(...filter.value);
                    
                    filter.value = [min, max];
                }
            }

        });        
        
        dropdownItems.forEach(item => {
            let name = item.id.replace(/-/, " ").split(" ")[0];
            const dropdownInput = document.getElementById(`${name}-dropdown-content`);

            if (dropdownInput !== null) {
                dropdownInput.querySelectorAll("input").forEach(input => {
                    let inputName = input.name.split(/[A-Z]/)[0];

                    if (inputName === "power") {    
                        if (e.target.type === "checkbox") {
                            filterRange(e, powerRangeMin, selectedPower, powerRange, powerInput, filterBy, availableFilters, input, name);
                            filterNumber(e, powerRangeMin, selectedPower, powerRange, powerInput, filterBy, availableFilters, input, name)
                        } else {
                            powerRange.forEach((range) => range.addEventListener("input", () => filterRange(e, powerRangeMin, selectedPower, powerRange, powerInput, filterBy, availableFilters, input, name)));
                            powerInput.forEach((number) => number.addEventListener("input", () => filterNumber(e, powerRangeMin, selectedPower, powerRange, powerInput, filterBy, availableFilters, input, name)));
                        }
                    } else if (inputName === "weight") {    
                        if (e.target.type === "checkbox") {
                            filterRange(e, weightRangeMin, selectedWeight, weightRange, weightInput, filterBy, availableFilters, input, name);
                            filterNumber(e, weightRangeMin, selectedWeight, weightRange, weightInput, filterBy, availableFilters, input, name)
                        } else {
                            weightRange.forEach((range) => range.addEventListener("input", () => filterRange(e, weightRangeMin, selectedWeight, weightRange, weightInput, filterBy, availableFilters, input, name)));
                            weightInput.forEach((number) => number.addEventListener("input", () => filterNumber(e, weightRangeMin, selectedWeight, weightRange, weightInput, filterBy, availableFilters, input, name)));
                        }
                    } else if (inputName === "engine") {                            
                        if (e.target.type === "checkbox") {
                            filterRange(e, engineRangeMin, selectedEngine, engineRange, engineInput, filterBy, availableFilters, input, name);
                            filterNumber(e, engineRangeMin, selectedEngine, engineRange, engineInput, filterBy, availableFilters, input, name)
                        } else {
                            engineRange.forEach((range) => range.addEventListener("input", () => filterRange(e, engineRangeMin, selectedEngine, engineRange, engineInput, filterBy, availableFilters, input, name)));
                            engineInput.forEach((number) => number.addEventListener("input", () => filterNumber(e, engineRangeMin, selectedEngine, engineRange, engineInput, filterBy, availableFilters, input, name)));
                        }
                    }
                });
            }
            
            if (item.type === "checkbox") {
                availableFilters.forEach(filter => {
                    if (filter.name === item.name) {
                        if (item.name === "cylinders") {
                            if (!filter.value.includes(parseInt(item.value))) {
                                if (activeFilters[0].name !== filter.name) {
                                    item.disabled = true;
                                }
                            } else {
                                item.disabled = false;
                            }
                        } else {
                            if (!filter.value.includes(item.value)) {
                                if (activeFilters[0].name !== filter.name) {
                                    item.disabled = true;
                                }
                            } else {
                                item.disabled = false;
                            }
                        }

                    }
                });
            }
        });
    }

    function hideFiltered(filteredVehicles) {
        const ids = [];
    
        filteredVehicles.forEach(vehicle => {
            let id = `${ vehicle.manufacturer } ${ vehicle.model } ${ vehicle.discipline }`
            id = id.replace(/ /g, "-").toLowerCase();

            ids.push(id);
        });

        tiles.forEach(tile => {
            if (ids.includes(tile.id)) {
                tile.classList.remove("hide");
            } else {
                tile.classList.add("hide");
            }
        });

        if (filteredVehicles.length === 0) {
            tiles.forEach(tile => {
                tile.classList.remove("hide");
            });
        }
    }

    function filterVehicles(e) {
        let name = e.target.name;
        name = name.replace(/[A-Z]/, " ").split(" ")[0];
        const filterBy = [];
        const min = parseInt(e.target.min);
        const max = parseInt(e.target.max);
        let filterArr;

        activeFilters.forEach(filter => {
            const found = filterBy.find(item => item.name === filter.name);
            if (found) {
                const index = filterBy.findIndex((item => item.name === filter.name));
                if (!filterBy[index].value.includes(filter.value)) {
                    filterBy[index].value.push(filter.value)
                }
            } else {
                filterBy.push({"name": filter.name, "value": [filter.value]});
            }

            return filter.name;
        });

        if (filterBy.length <= 1) {
            firstFilter(e, filterBy, name);
            updateFilter(e, filterBy);
        } else {
            if (filterBy[0].name === name) {
                firstFilter(e, filterBy, name, min, max);
                updateFilter(e, filterBy);
            } else {
                if (e.target.type === "checkbox" && !e.target.checked) {
                    if (selectedFilters.length >= 1) {
                        selectedFilters.forEach(filter => {
                            if (filter.name === name) {    
                                filterArr = filter.vehicles;
                                const res = fVehicles(filterArr, filterBy, name);
    
                                filter.vehicles = res.vehicles;
    
                                if (filter.vehicles.length < 1) {
                                    selectedFilters.splice(selectedFilters.indexOf(filter), 1);
    
                                    const currFilter = selectedFilters.length - 1;
    
                                    filteredVehicles = selectedFilters[currFilter].vehicles;
                                } else {
                                    filteredVehicles = res.vehicles;
                                }
                            }
                        });

                        updateFilter(e, filterBy);
                    }
                } else if (e.target.type === "checkbox" || e.target.type !== "checkbox") {
                    selectedFilters.forEach(filter => {
                        if (filter.name === name) {
                            filterBy.forEach(filterByItem => {
                                if (e.target.type !== "checkbox") {
                                    if (filterByItem.value[0][0] === min && filterByItem.value[0][1] === max) {
                                        filterBy.splice(filterBy.indexOf(filterByItem), 1);
                                    }
                                }
                            });

                            activeFilters.forEach(activeFilter => {
                                if (e.target.type !== "checkbox") {
                                    if (activeFilter.value[0] === min && activeFilter.value[1] === max) {
                                        activeFilters.splice(activeFilters.indexOf(activeFilter), 1);
                                    }
                                }
                            });
                        }

                        if (filter.vehicles.length < 1) {
                            selectedFilters.splice(selectedFilters.indexOf(filter), 1);
                        }
                    });
    
                    if (selectedFilters.length < 1) {
                        filterArr = baseFiltered;
                        const res = fVehicles(filterArr, filterBy, name);
                        selectedFilters.push(res);
                        filteredVehicles = res.vehicles;

                        updateFilter(e, filterBy);
                    } else {
                        const found = selectedFilters.find(filter => filter.name === name);

                        if (!found) {
                            const prevFilter = selectedFilters.length - 1;
                            filterArr = selectedFilters[prevFilter].vehicles;

                            const res = fVehicles(filteredVehicles, filterBy, name);

                            selectedFilters.push(res);
                            filteredVehicles = res.vehicles;
                        }

                        updateFilter(e, filterBy);
                    }
                }
            }
        }
    }

    dropdownItems.forEach(item => item.addEventListener("input", (e) => {
        selectFilters(e);
        filterVehicles(e);
        hideFiltered(filteredVehicles);
    }));
}

function prevTile(e, carousel, nodes) {
    if (e.target.parentElement === carousel.parentElement) {
        nodes.unshift(nodes.pop());
        content = new Carousel(carousel.id, nodes);
        content.updateArr;
    }
}

function nextTile(e, carousel, nodes) {
    if (e.target.parentElement === carousel.parentElement) {
        nodes.push(nodes.shift());
        content = new Carousel(carousel.id, nodes)
        content.updateArr;
    }
}



function swipeLeft(i, nodes, carousel) {
    if (i <= 0) {
        nodes.push(nodes.shift());
        content = new Carousel(carousel.id, nodes);
        content.updateArr;
        i++;
    }
}

function swipeRight(i, nodes, carousel) {
    if (i >= 0) {
        nodes.unshift(nodes.pop());
        content = new Carousel(carousel.id, nodes)
        content.updateArr;
        i--;
    }
}

function handleSlideStart(e) {
    xDown = e.touches[0].clientX;
}

function handleSlideMove(e, nodes, carousel, i) {
    if (!xDown) {
        return;
    }

    let xUp = e.touches[0].clientX;

    let xDiff = xDown - xUp;

    if (xDiff > 0) {
        swipeLeft(i, nodes, carousel);
    } else {
        swipeRight(i, nodes, carousel);
    }

    xDown = null;
    i = 0;
}

if (window.location.pathname.includes("dlc.html")) {
    dlcTiles.forEach(tile => {
        tile.addEventListener("mouseenter", (e) => showDlcText(e));
        tile.addEventListener("mouseleave", hideDlcText);
        tile.addEventListener("touchstart", (e) => {
            showDlcText(e);
            setTimeout(hideDlcText, 5000);
        });
    });
    
    tileCarousel.forEach(carousel => {
        let content = new Carousel(carousel.id, carousel.childNodes);
        content.updateArr;
        const nodes = [];
        let i = 0;
        
        carousel.childNodes.forEach(child => {
            nodes.push(child);
        });
    
        prevBtn.forEach(btn => btn.addEventListener("click", (e) => prevTile(e, carousel, nodes)));
        nextBtn.forEach(btn => btn.addEventListener("click", (e) => nextTile(e, carousel, nodes)));
        carousel.addEventListener("touchstart", (e) => handleSlideStart(e));
        carousel.addEventListener("touchmove", (e) => handleSlideMove(e, nodes, carousel, i));
        
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
}