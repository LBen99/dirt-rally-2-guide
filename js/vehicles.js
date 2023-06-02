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

export {
    filterPowerRange,
    filterPowerInput,
    filterWeightRange,
    filterWeightInput,
    filterEngineRange,
    filterEngineInput
}