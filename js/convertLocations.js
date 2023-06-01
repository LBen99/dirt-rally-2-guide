import locationData from "../data/locations/locations.json" assert { type: "json" };

const locations = locationData.locations;
const locationContainer = document.getElementById("locationContainer");

function convertLocation(location) {
    let id = location.name
    id = id.replace(/ /g, "-").toLowerCase();
    let img = location.name + "-" + location.country
    img = img.replace(/ /g, "-").toLowerCase();
    let surfaceList = [];
    let stageForward = [];
    let stageReverse = [];

    if (location.stages) {
        let forward = location.stages.direction.forward;
        let reverse = location.stages.direction.reverse;

        forward.forEach((stage) => {
            stageForward.push( 
                `<li class="stage">
                    <p class="stage-name">${ stage.name }</p>
                    <p class="stage-distance">${ stage.distance }</p>
                </li>`
            );
        });

        reverse.forEach((stage) => {
            stageReverse.push( 
                `<li class="stage">
                    <p class="stage-name">${ stage.name }</p>
                    <p class="stage-distance">${ stage.distance }</p>
                </li>`
            );
        });
    }

    location.track_surface.forEach((surface) => {
        surfaceList.push(
            `<li class="surface">
                <p>${ surface }</p>
            </li>`
        )
    });

    locationContainer.insertAdjacentHTML("beforeend",
    `<details id="${ id }" class="location-tile">
        <summary>
            <img src="images/locations/${ img }.jpg" alt="" class="location-img">
            <h2 class="location-name">${ location.name }</h2>
            <h3 class="location-country">${ location.country }</h3>
            <button class="btn-cart btn-primary">Details</button>
            <button id="${ id }-close" class="btn-red-xmark hide fa-solid fa-xmark"></button>
        </summary>
        <ul class="surface-list">
            ${ surfaceList.toString().replace(/,/g, "") }
        </ul>
        <ul class="tab-select">
            <li class="direction-tab"><a class="forward-tab">Forward</a></li>
            <li class="direction-tab"><a class="reverse-tab">Reverse</a></li>
        </ul>
        <ul class="stages-forward-list">
            ${ stageForward.toString().replace(/,/g, "") }
        </ul>
        <ul class="stages-reverse-list hide">
            ${ stageReverse.toString().replace(/,/g, "") }
        </ul>
    </details>`)
}

locations.forEach((location) => convertLocation(location));