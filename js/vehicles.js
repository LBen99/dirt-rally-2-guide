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

export {
    filterPowerRange,
    filterPowerInput,
    filterWeightRange,
    filterWeightInput,
    filterEngineRange,
    filterEngineInput
}