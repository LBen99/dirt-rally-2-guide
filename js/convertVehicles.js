import vehicleData from "../data/vehicles/vehicles.json" assert { type: "json" };

const vehicles = vehicleData.vehicles;
const vehicleContainer = document.getElementById("vehicleContainer");

function convertVehicle(vehicle) {
    let id = vehicle.manufacturer + "-" + vehicle.model + "-" + vehicle.discipline;
    id = id.replace(/ /g, "-");
    let specs = vehicle.statistics;
    let img = vehicle.manufacturer + "-" + vehicle.model
    img = img.replace(/ /g, "-").replace(/\//g, "").toLowerCase();

    vehicleContainer.insertAdjacentHTML("beforeend",
    `<details id="${ id }" class="vehicle-tile tile">
        <summary>
            <img src="images/vehicles/${ img }.jpg" alt="" class="vehicle-img tile-img">
            <h2 class="vehicle-manufacturer">${ vehicle.manufacturer }</h2>
            <h3 class="vehicle-model">${ vehicle.model }</h3>
            <button class="btn-details btn-primary">Details</button>
            <button id="${ id }-close" class="btn-red-xmark hide fa-solid fa-xmark"></button>
        </summary>
        <ul class="tab-select">
            <li class="info-link"><a class="specs-tab">Specifications</a></li>
            <li class="info-link"><a class="info-tab">Info</a></li>
        </ul>
        <ul class="specs-list">
            <li class="spec-item max-power">${ specs.max_power } <span class="unit">bhp</span></li>
            <li class="spec-item transmission">${ specs.transmission }</li>
            <li class="spec-item max-weight">${ specs.max_weight } <span class="unit">kg</span></li>
            <li class="spec-item drivetrain">${ specs.drivetrain }</li>
            <li class="spec-item engine">${ specs.engine } <span class="unit">cc</span></li>
            <li class="spec-item cylinders">${ specs.cylinders }</li>
            <li class="spec-item aspiration">${ specs.aspiration }</li>
        </ul>
    </details>`)
}

vehicles.forEach((vehicle) => convertVehicle(vehicle));