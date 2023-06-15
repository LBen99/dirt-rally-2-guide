import vehicleData from "../data/vehicles/vehicles.json" assert { type: "json" };

const vehicles = vehicleData.vehicles;
const vehicleContainer = document.getElementById("vehicleContainer");

const types = [];
const disciplines = [];
const manufacturers = [];
const power = [];
const transmission = [];
const weight = [];
const drivetrain = [];
const engine = [];
const cylinders = [];
const aspiration = [];

const typeDropdownContent = document.getElementById("type-dropdown-content");
const disciplineDropdownContent = document.getElementById("discipline-dropdown-content");
const manufacturerDropdownContent = document.getElementById("manufacturer-dropdown-content");
const powerDropdown = document.getElementById("power-dropdown");
const transmissionDropdownContent = document.getElementById("transmission-dropdown-content");
const weightDropdown = document.getElementById("weight-dropdown");
const drivetrainDropdownContent = document.getElementById("drivetrain-dropdown-content");
const engineDropdown = document.getElementById("engine-dropdown");
const cylindersDropdownContent = document.getElementById("cylinders-dropdown-content");
const aspirationDropdownContent = document.getElementById("aspiration-dropdown-content");

export async function findVehicleKeyData() {
    vehicles.forEach((vehicle) => {
        let specs = vehicle.specs;
        if (!types.includes(vehicle.type)) {
            types.push(vehicle.type);
        }
        if (!disciplines.includes(vehicle.discipline)) {
            disciplines.push(vehicle.discipline);
        }
        if (!manufacturers.includes(vehicle.manufacturer)) {
            manufacturers.push(vehicle.manufacturer);
        }
        if (!power.includes(specs.power)) {
            power.push(specs.power);
        }
        if (!transmission.includes(specs.transmission)) {
            transmission.push(specs.transmission);
        }
        if (!weight.includes(specs.weight)) {
            weight.push(specs.weight);
        }
        if (!drivetrain.includes(specs.drivetrain)) {
            drivetrain.push(specs.drivetrain);
        }
        if (!engine.includes(specs.engine)) {
            engine.push(specs.engine);
        }
        if (!cylinders.includes(specs.cylinders)) {
            cylinders.push(specs.cylinders);
        }
        specs.aspiration.forEach((type) => {
            if (!aspiration.includes(type)) {
                aspiration.push(type)
            }
        });
    });
}

export async function convertVehicle() {
    vehicles.forEach((vehicle) => {
        let id = `${ vehicle.manufacturer } ${ vehicle.model } ${ vehicle.discipline }`
        id = id.replace(/ /g, "-").toLowerCase();
        let specs = vehicle.specs;
        let img = vehicle.manufacturer + "-" + vehicle.model
        img = img.replace(/ /g, "-").replace(/\//g, "").toLowerCase();
        
        vehicleContainer.insertAdjacentHTML(
            "beforeend",
            `<ul id="${ id }" class="tile vehicle-tile">
                <li>
                    <img src="images/vehicles/${ img }.jpg" alt="" class="vehicle-img tile-img">
                    <h2 class="tile-name vehicle-manufacturer">${ vehicle.manufacturer }</h2>
                    <h3 class="tile-name vehicle-model">${ vehicle.model }</h3>
                    <button class="btn-details btn-primary">Details</button>
                </li>
            </ul>
            <aside id="${ id }-modal" class="modal hide">
                <ul>
                    <li>
                        <img src="images/vehicles/${ img }.jpg" alt="" class="vehicle-img tile-img">
                        <h2 class="tile-name vehice-manufacturer">${ vehicle.manufacturer }</h2>
                        <h3 class="tile-name vehicle-model">${ vehicle.model }</h3>
                        <button id="${ id }-close" class="btn-red-xmark fa-solid fa-xmark"></button>
                    </li>
                </ul>
                <ul class="tab-select">
                    <li class="info-link"><a class="specs-tab">Specifications</a></li>
                    <li class="info-link"><a class="info-tab">Info</a></li>
                </ul>
                <ul class="specs-list">
                    <li class="spec-item power">${ specs.power } <span class="unit">bhp</span></li>
                    <li class="spec-item transmission">${ specs.transmission }</li>
                    <li class="spec-item weight">${ specs.weight } <span class="unit">kg</span></li>
                    <li class="spec-item drivetrain">${ specs.drivetrain }</li>
                    <li class="spec-item engine">${ specs.engine } <span class="unit">cc</span></li>
                    <li class="spec-item cylinders">${ specs.cylinders }</li>
                    <li class="spec-item aspiration">${ specs.aspiration }</li>
                </ul>
            </aside>`
        );
    });

}

// const filteredVehicles = [];
// const ids = [];
// export async function activeFilters(keyName, keyValue, checked, type, dataFilter) {
//     const tiles = document.querySelectorAll(".tile");
    // const filter = (vehicle, vehicleData, existingFilter) => {
                        
    //     existingFilter();

    //     for (let item of vehicleData) {
    //         let id = `${ item.manufacturer } ${ item.model } ${ item.discipline }`
    //         id = id.replace(/ /g, "-").toLowerCase();
    //         if (type === "range" || type === "number") {
    //             if (dataFilter.specs[keyName][0] <= item.specs[keyName]) {
    //                 if (dataFilter.specs[keyName][1] >= item.specs[keyName]) {
    //                     if (!filteredVehicles.includes(item)) {
    //                         filteredVehicles.push(item);
    //                         ids.push(id);
    //                     }
    //                 } else {
    //                     if (filteredVehicles.includes(item)) {
    //                         filteredVehicles.splice(filteredVehicles.indexOf(item), 1);
    //                         ids.splice(ids.indexOf(id), 1);
    //                     }
    //                 }
    //             } else if (dataFilter.specs[keyName][1] >= item.specs[keyName]) {
    //                 if (dataFilter.specs[keyName][0] <= item.specs[keyName]) {
    //                     if (!filteredVehicles.includes(item)) {
    //                         filteredVehicles.push(item);
    //                         ids.push(id);
    //                     }
    //                 } else {
    //                     if (filteredVehicles.includes(item)) {
    //                         filteredVehicles.splice(filteredVehicles.indexOf(item), 1);
    //                         ids.splice(ids.indexOf(id), 1);
    //                     }
    //                 }
    //             }
    //         } else {
    //             if (!checked) {
    //                 if (keyName in dataFilter.specs) {
    //                     if (item["specs"][`${ keyName }`].includes(keyValue) && !checked) {
    //                         if (item["specs"][`${ keyName }`] === keyValue) {
    //                             filteredVehicles.splice(filteredVehicles.indexOf(item), 1);
    //                             ids.splice(ids.indexOf(id), 1);
    //                         }
    //                     }
    //                 } else {
    //                     if (item[`${ keyName }`].includes(keyValue) && !checked) {
    //                         if (item[`${ keyName }`] === keyValue) {
    //                             filteredVehicles.splice(filteredVehicles.indexOf(item), 1);
    //                             ids.splice(ids.indexOf(id), 1);
    //                         }
    //                     }
    //                 } 
    //             } else if (vehicle(item) && !filteredVehicles.includes(item) && checked) {
    //                 filteredVehicles.push(item);
    //                 ids.push(id)
    //             }
    //         }
    //     }
    // }
    
    // const filterData = item => {
    //     if (type === "range" || type === "number") {
    //         return filteredVehicles
    //     } else {
    //         if (keyName in dataFilter.specs) {
    //             for (const [key, value] of Object.entries(dataFilter.specs)) {
    //                 for (let i = 0; i < value.length; i++) {
    //                     if (item["specs"][key] == value[i]) {
    //                         return filteredVehicles;
    //                     }
    //                 }
    //             }      
    //         } else {
    //             for (const [key, value] of Object.entries(dataFilter)) {
    //                 for (let i = 0; i < value.length; i++) {
    //                     if (item[key] == value[i]) {
    //                         return filteredVehicles;
    //                     }
    //                 }
    //             }
    //         }
    //     } 
    // }

    // const existingFilter = filter => {
    //     if (filteredVehicles.length > 0 && checked) {
    //         const newArr = filteredVehicles.filter((vehicle) => {
    //             if (keyName in dataFilter.specs) {
    //                 for (const [key, value] of Object.entries(dataFilter.specs)) {
    //                     for (let i = 0; i < dataFilter.specs[key].length; i++) {
    //                         return vehicle.specs[keyName] === value[i]
    //                     }
    //                 }
    //             } else {
    //                 for (const [key, value] of Object.entries(dataFilter)) {
    //                     for (let i = 0; i < dataFilter[key].length; i++) {
    //                         let val = () => vehicle[key] === value[i++]
    //                         const fv = filteredVehicles.some(val)
    //                         if (!fv) {
    //                             filteredVehicles.slice(filteredVehicles.indexOf(vehicle), 1)
    //                         }
    //                         return fv
    //                     }
    //                 }
    //             }
    //         });
    //         console.log(newArr)
    //     }
    // }


//     const filter = (vehicle, vehicleData) => {
//         for (let item of vehicleData) {
//             let id = `${ item.manufacturer } ${ item.model } ${ item.discipline }`
//             id = id.replace(/ /g, "-").toLowerCase();
//             if (type === "range" || type === "number") {
//                 if (dataFilter.specs[keyName][0] <= item.specs[keyName]) {
//                     if (dataFilter.specs[keyName][1] >= item.specs[keyName]) {
//                         if (!filteredVehicles.includes(item)) {
//                             filteredVehicles.push(item);
//                             ids.push(id);
//                         }
//                     } else {
//                         if (filteredVehicles.includes(item)) {
//                             filteredVehicles.splice(filteredVehicles.indexOf(item), 1);
//                             ids.splice(ids.indexOf(id), 1);
//                         }
//                     }
//                 } else if (dataFilter.specs[keyName][1] >= item.specs[keyName]) {
//                     if (dataFilter.specs[keyName][0] <= item.specs[keyName]) {
//                         if (!filteredVehicles.includes(item)) {
//                             filteredVehicles.push(item);
//                             ids.push(id);
//                         }
//                     } else {
//                         if (filteredVehicles.includes(item)) {
//                             filteredVehicles.splice(filteredVehicles.indexOf(item), 1);
//                             ids.splice(ids.indexOf(id), 1);
//                         }
//                     }
//                 }
//             } else {
//                 if (!checked) {
//                     if (keyName in dataFilter.specs) {
//                         if (item["specs"][`${ keyName }`].includes(keyValue) && !checked) {
//                             if (item["specs"][`${ keyName }`] === keyValue) {
//                                 filteredVehicles.splice(filteredVehicles.indexOf(item), 1);
//                                 ids.splice(ids.indexOf(id), 1);
//                             }
//                         }
//                     } else {
//                         if (item[`${ keyName }`].includes(keyValue) && !checked) {
//                             if (item[`${ keyName }`] === keyValue) {
//                                 filteredVehicles.splice(filteredVehicles.indexOf(item), 1);
//                                 ids.splice(ids.indexOf(id), 1);
//                             }
//                         }
//                     } 
//                 } else if (vehicle(item) && !filteredVehicles.includes(item) && checked) {
//                     filteredVehicles.push(item);
//                     ids.push(id)
//                 }
//             }
//         }
//     }

    
//     const filterData = item => {
//         if (type === "range" || type === "number") {
//             return filteredVehicles
//         } else {
//             if (keyName in dataFilter.specs) {
//                 for (const [key, value] of Object.entries(dataFilter.specs)) {
//                     for (let i = 0; i < value.length; i++) {
//                         if (item["specs"][key] == value[i]) {
//                             return filteredVehicles;
//                         }
//                     }
//                 }      
//             } else {
//                 for (const [key, value] of Object.entries(dataFilter)) {
//                     for (let i = 0; i < value.length; i++) {
//                         if (item[key] == value[i]) {
//                             return filteredVehicles;
//                         }
//                     }
//                 }
//             }
//         } 
//     }

  
//     filter(filterData, vehicles)
//     if (filteredVehicles.length === 0) {
//         filter(filterData, vehicles);
//     } else {
//         filter(existingFilter, filteredVehicles);
//     }

//     for (let i = 0; i < tiles.length; i++) {
//         if (ids.length === 0) {
//             tiles[i].classList.remove("hide")
//         } else {
//             if (ids.includes(tiles[i].id)) {
//                 tiles[i].classList.remove("hide");
//             } else {
//                 tiles[i].classList.add("hide")
//             }
//         }
//     }
// }

export async function vehicleFilters() {
    types.forEach((type) => {
        typeDropdownContent.insertAdjacentHTML("beforeend",
            `<li>
                <input type="checkbox" name="type" class="dropdown-item" value="${ type }">${ type }</input>
            </li>`
        );
    });
    
    disciplines.forEach((discipline) => {
        disciplineDropdownContent.insertAdjacentHTML("beforeend",
            `<li>
                <input type="checkbox" name="discipline" class="dropdown-item" value="${ discipline }">${ discipline }</input>
            </li>`
        );
    });
    
    manufacturers.forEach((manufacturer) => {
        manufacturerDropdownContent.insertAdjacentHTML("beforeend",
            `<li>
                <input type="checkbox" name="manufacturer" class="dropdown-item" value="${ manufacturer }">${ manufacturer }</input>
            </li>`
        );
    });

    const minPower = Math.min(...power);
    const maxPower = Math.max(...power);   
    powerDropdown.insertAdjacentHTML("beforeend",
        `<ul id="power-dropdown-content" class="dropdown-content dropdown-item">
            <li class="power-range slider">
                <span id="power-range-selected" class="range-selected"></span>
            </li>
            <li class="power-slider slider-range">
                <input type="range" name="power" class="min" min="${ minPower }" max="${ maxPower }" value="${ minPower }" step="1">
                <input type="range" name="power" class="max" min="${ minPower }" max="${ maxPower }" value="${ maxPower }" step="1">
            </li>
            <li class="power-input slider-input">
                <input type="number" name="min" class="min" value="${ minPower }">
                <label for="min">bhp</label>
                <input type="number" name="min" class="max" value="${ maxPower }">
                <label for="max">bhp</label>
            </li>
        </ul>`
    );
    
    transmission.forEach((type) => {
        transmissionDropdownContent.insertAdjacentHTML("beforeend",
            `<li>
                <input type="checkbox" name="transmission" class="dropdown-item" value="${ type }">${ type }</input>
            </li>`
        );
    });
    
    const minWeight = Math.min(...weight);
    const maxWeight = Math.max(...weight);
    weightDropdown.insertAdjacentHTML("beforeend",
        `<ul id="weight-dropdown-content" class="dropdown-content dropdown-item">
            <li class="weight-range slider">
                <span id="weight-range-selected" class="range-selected"></span>
            </li>
            <li class="weight-slider slider-range">
                <input type="range" name="weight" class="min" min="${ minWeight }" max="${ maxWeight }" value="${ minWeight }" step="1">
                <input type="range" name="weight" class="max" min="${ minWeight }" max="${ maxWeight }" value="${ maxWeight }" step="1">
            </li>
            <li class="weight-input slider-input">
                <input type="number" name="min" class="min" value="${ minWeight }">
                <label for="min">kg</label>
                <input type="number" name="min" class="max" value="${ maxWeight }">
                <label for="max">kg</label>
            </li>
        </ul>`
    );
    
    drivetrain.forEach((type) => {
        drivetrainDropdownContent.insertAdjacentHTML("beforeend",
            `<li>
                <input type="checkbox" name="drivetrain" class="dropdown-item" value="${ type }">${ type }</input>
            </li>`
        );
    });
    
    const minEngine = Math.min(...engine);
    const maxEngine = Math.max(...engine);
    engineDropdown.insertAdjacentHTML("beforeend",
        `<ul id="engine-dropdown-content" class="dropdown-content dropdown-item">
            <li class="engine-range slider">
                <span id="engine-range-selected" class="range-selected"></span>
            </li>
            <li class="engine-slider slider-range">
                <input type="range" name="engine" class="min" min="${ minEngine }" max="${ maxEngine }" value="${ minEngine }" step="1">
                <input type="range" name="engine" class="max" min="${ minEngine }" max="${ maxEngine }" value="${ maxEngine }" step="1">
            </li>
            <li class="engine-input slider-input">
                <input type="number" name="engine" class="min" value="${ minEngine }">
                <label for="min">cc</label>
                <input type="number" name="engine" class="max" value="${ maxEngine }">
                <label for="max">cc</label>
            </li>
        </ul>`
    );
    
    cylinders.forEach((value) => {
        cylindersDropdownContent.insertAdjacentHTML("beforeend",
            `<li>
                <input type="checkbox" name="cylinders" class="dropdown-item" value="${ value }">${ value }</input>
            </li>`
        );
    });
    
    aspiration.forEach((type) => {
        aspirationDropdownContent.insertAdjacentHTML("beforeend",
            `<li>
                <input type="checkbox" name="aspiration" class="dropdown-item" value="${ type }">${ type }</input>
            </li>`
        );
    });
}

export {types, disciplines, manufacturers, power, transmission, weight, drivetrain, engine, cylinders, aspiration}