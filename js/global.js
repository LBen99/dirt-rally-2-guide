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
const valueRemaining = [0];

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
        if (modal.id.includes(id)) {
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
    let thisPower = parseInt(thisModal.getElementsByTagName("h2").item(1).innerText.replace("bhp", ""));
    let thisEngine = parseInt(thisModal.getElementsByTagName("h2").item(5).innerText.replace("cc", ""));
    let thisWeight = parseInt(thisModal.getElementsByTagName("h2").item(3).innerText.replace("kg", ""));
    let power = []
    let engine = [];
    let weight = [];

    modals.forEach(modal => {
        power.push(parseInt(modal.getElementsByTagName("h2").item(1).innerText.replace("bhp", "")));
        engine.push(parseInt(modal.getElementsByTagName("h2").item(5).innerText.replace("cc", "")));
        weight.push(parseInt(modal.getElementsByTagName("h2").item(3).innerText.replace("kg", "")));
    });

    let powerBarColour;
    let powerRange = thisPower / Math.max(...power) * 100;
    let lowPower = Math.max(...power) / 3;
    let medPower = Math.max(...power) / 1.5;
    if (thisPower < lowPower) {
        powerBarColour = red;
    }
    if (thisPower >= lowPower && thisPower < medPower) {
        powerBarColour = orange;
    }
    if (thisPower >= medPower) {
        powerBarColour = green;
    }

    let engineBarColour;
    let engineRange = thisEngine / Math.max(...engine) * 100;
    let lowEngine = Math.max(...engine) / 3;
    let medEngine = Math.max(...engine) / 1.5;
    if (thisEngine < lowEngine) {
        engineBarColour = red;
    }
    if (thisEngine >= lowEngine && thisEngine < medEngine) {
        engineBarColour = orange;
    }
    if (thisEngine >= medEngine) {
        engineBarColour = green;
    }

    let weightBarColour;
    let weightRange = thisWeight / Math.max(...weight) * 100;
    let lowWeight = Math.max(...weight) / 3;
    let medWeight = Math.max(...weight) / 1.5;
    if (thisWeight < lowWeight) {
        weightBarColour = green;
    }
    if (thisWeight >= lowWeight && thisWeight < medWeight) {
        weightBarColour = orange;
    }
    if (thisWeight >= medWeight) {
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

    for (let i = 0; i < 82; i++) {
        if (thisModal.contains(powerBox[i])) {
            let circle = powerBox[i].getElementsByTagName("circle")[1];
            const strokeIncrement = powerRange / thisPower;
            circle.style.setProperty("stroke-dashoffset", circleLength - (circleLength * powerRange) / 100);
            circle.style.setProperty("stroke", powerBarColour);
            animateCircle(valueRemaining, powerRange, circle.style, circleLength, strokeIncrement);
            const interval = setInterval(() => animateCircle(valueRemaining, powerRange, circle.style, circleLength, strokeIncrement, thisPower, interval), 1);
            valueRemaining[0] = 0;
        }
        if (thisModal.contains(engineBox[i])) {
            let circle = engineBox[i].getElementsByTagName("circle")[1];
            const strokeIncrement = engineRange / thisEngine;
            circle.style.setProperty("stroke-dashoffset", circleLength - (circleLength * engineRange) / 100);
            circle.style.setProperty("stroke", engineBarColour);
            animateCircle(valueRemaining, engineRange, circle.style, circleLength, strokeIncrement);
            const interval = setInterval(() => animateCircle(valueRemaining, engineRange, circle.style, circleLength, strokeIncrement, thisEngine, interval), 1);
            valueRemaining[0] = 0;
        }
        if (thisModal.contains(weightBox[i])) {
            let circle = weightBox[i].getElementsByTagName("circle")[1];
            const strokeIncrement = weightRange / thisWeight;
            circle.style.setProperty("stroke-dashoffset", circleLength - (circleLength * weightRange) / 100);
            circle.style.setProperty("stroke", weightBarColour);
            animateCircle(valueRemaining, weightRange, circle.style, circleLength, strokeIncrement);
            const interval = setInterval(() => animateCircle(valueRemaining, weightRange, circle.style, circleLength, strokeIncrement, thisWeight, interval), 1);
            valueRemaining[0] = 0;
        }
    }  
}

const textValue = [0];
function animateCircle(valueRemaining, range, circle, circleLength, strokeIncrement, text, interval) {
    circle.setProperty("--stroke-increment", strokeIncrement);
    if (valueRemaining[0] < range) {
        circle.setProperty("stroke-dashoffset", circleLength - (circleLength * valueRemaining[0]) / 100);
        let newValue = valueRemaining.pop();
        newValue += strokeIncrement
        valueRemaining[0] = newValue;
        let newText = textValue.pop();
        newText += 1;
        textValue[0] = newText;
        return;
    } 
    circle.setProperty("stroke-dashoffset", circleLength - (circleLength * range) / 100);
    clearInterval(interval);
    return;
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
    function filterPowerRange(e, powerRangeMin, selectedPower, powerRange, powerInput) {
        let minRange = parseInt(powerRange[0].value) - 100;
        let maxRange = parseInt(powerRange[1].value) - 100;
    
        if (maxRange - minRange < powerRangeMin) {
            if (e.target.className === "min") {
                powerRange[0].value = (maxRange + 100) - powerRangeMin;
            } else {
                powerRange[1].value = (minRange + 100) + powerRangeMin;
            }
        } else {
            powerInput[0].value = minRange + 100;
            powerInput[1].value = maxRange + 100;
            selectedPower.style.left = (minRange / (powerRange[0].max - 100)) * 100 + "%";
            selectedPower.style.right = 100 - (maxRange / (powerRange[1].max - 100)) * 100 + "%";
        }
    }
    
    function filterPowerInput(e, powerRangeMin, selectedPower, powerRange, powerInput) {
        let minPower = parseInt(powerInput[0].value) - 100;
        let maxPower = parseInt(powerInput[1].value) - 100;
    
        if (maxPower - minPower >= powerRangeMin && maxPower <= (powerRange[1].max - 100)) {
            if (e.target.className === "min") {
                powerRange[0].value = minPower + 100;
                selectedPower.style.left = (minPower / (powerRange[0].max - 100)) * 100 + "%";
            } else {
                powerRange[1].value = maxPower + 100;
                selectedPower.style.right = 100 - (maxPower / (powerRange[1].max - 100)) * 100 + "%";
            }
        }
    }
    
    function filterWeightRange(e, weightRangeMin, selectedWeight, weightRange, weightInput) {
        let minRange = parseInt(weightRange[0].value) - 312;
        let maxRange = parseInt(weightRange[1].value) - 312;
    
        if (maxRange - minRange < weightRangeMin) {
            if (e.target.className === "min") {
                weightRange[0].value = (maxRange + 312) - weightRangeMin;
            } else {
                weightRange[1].value = (minRange + 312) + weightRangeMin;
            }
        } else {
            weightInput[0].value = minRange + 312;
            weightInput[1].value = maxRange + 312;
            selectedWeight.style.left = (minRange / (weightRange[0].max - 312)) * 100 + "%";
            selectedWeight.style.right = 100 - (maxRange / (weightRange[1].max - 312)) * 100 + "%";
        }
    }
    
    function filterWeightInput(e, weightRangeMin, selectedWeight, weightRange, weightInput) {
        let minWeight = parseInt(weightInput[0].value) - 312;
        let maxWeight = parseInt(weightInput[1].value) - 312;
    
        if (maxWeight - minWeight >= weightRangeMin && maxWeight <= (weightRange[1].max - 312)) {
            if (e.target.className === "min") {
                weightRange[0].value = minWeight + 312;
                selectedWeight.style.left = (minWeight / (weightRange[0].max - 312)) * 100 + "%";
            } else {
                weightRange[1].value = maxWeight + 312;
                selectedWeight.style.right = 100 - (maxWeight / (weightRange[1].max - 312)) * 100 + "%";
            }
        }
    }
    
    function filterEngineRange(e, engineRangeMin, selectedEngine, engineRange, engineInput) {
        let minRange = parseInt(engineRange[0].value) - 750;
        let maxRange = parseInt(engineRange[1].value) - 750;
    
        if (maxRange - minRange < engineRangeMin) {
            if (e.target.className === "min") {
                engineRange[0].value = (maxRange + 750) - engineRangeMin;
            } else {
                engineRange[1].value = (minRange + 750) + engineRangeMin;
            }
        } else {
            engineInput[0].value = minRange + 750;
            engineInput[1].value = maxRange + 750;
            selectedEngine.style.left = (minRange / (engineRange[0].max - 750)) * 100 + "%";
            selectedEngine.style.right = 100 - (maxRange / (engineRange[1].max - 750)) * 100 + "%";
        }
    }
    
    function filterEngineInput(e, engineRangeMin, selectedEngine, engineRange, engineInput) {
        let minEngine = parseInt(engineInput[0].value) - 750;
        let maxEngine = parseInt(engineInput[1].value) - 750;
    
        if (maxEngine - minEngine >= engineRangeMin && maxEngine <= (engineRange[1].max - 750)) {
            if (e.target.className === "min") {
                engineRange[0].value = minEngine + 750;
                selectedEngine.style.left = (minEngine / (engineRange[0].max - 750)) * 100 + "%";
            } else {
                engineRange[1].value = maxEngine + 750;
                selectedEngine.style.right = 100 - (maxEngine / (engineRange[1].max - 750)) * 100 + "%";
            }
        }
    }

    //* FILTER POWER *//
    powerRange.forEach((input) => input.addEventListener("input", (e) => filterPowerRange(e, powerRangeMin, selectedPower, powerRange, powerInput)));
    powerInput.forEach((input) => input.addEventListener("input", (e) => filterPowerInput(e, powerRangeMin, selectedPower, powerRange, powerInput)));
    
    //* FILTER WEIGHT *//
    weightRange.forEach((input) => input.addEventListener("input", (e) => filterWeightRange(e, weightRangeMin, selectedWeight, weightRange, weightInput)));
    weightInput.forEach((input) => input.addEventListener("input", (e) => filterWeightInput(e, weightRangeMin, selectedWeight, weightRange, weightInput)));
    
    //* FILTER ENGINE *//
    engineRange.forEach((input) => input.addEventListener("input", (e) => filterEngineRange(e, engineRangeMin, selectedEngine, engineRange, engineInput)));
    engineInput.forEach((input) => input.addEventListener("input", (e) => filterEngineInput(e, engineRangeMin, selectedEngine, engineRange, engineInput)));

    // detailsBtn.forEach(btn => btn.addEventListener("click", () => {
    //     openModal().then(scaleText());
    // }))
    // scaleText();
    // numberDiv.forEach(div => {
    //     console.log(div.offsetWidth, div.naturalWidth);
    // })
}

if (window.location.pathname.includes("dlc.html")) {
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
}