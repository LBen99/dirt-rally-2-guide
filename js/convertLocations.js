import locationData from "../data/locations/locations.json" assert { type: "json" };

const locations = locationData.locations;
const locationContainer = document.getElementById("locationContainer");

const events = [];
const countries = [];
const surfaces = [];

const eventsContent = document.getElementById("event-dropdown-content");
const countriesContent = document.getElementById("country-dropdown-content");
const surfacesContent = document.getElementById("surface-dropdown-content");

export async function findLocationKeyData() {
    locations.forEach((location) => {
        if (!events.includes(location.type)) {
            events.push(location.type);
        }
        if (!countries.includes(location.country)) {
            countries.push(location.country);
        }
        location.track_surface.forEach((surface) => {
            if (!surfaces.includes(surface)) {
                surfaces.push(surface)
            }
        });
    });
}

export async function convertLocation() {
    locations.forEach((location) => {
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

        locationContainer.insertAdjacentHTML(
            "beforeend",
            `<ul id="${ id }" class="tile location-tile">
                <li>
                    <img src="images/locations/${ img }.jpg" alt="${ location.name } ${ location.country } image" class="tile-img location-img">
                    <h2 class="tile-name location-name">${ location.name }</h2>
                    <h3 class="tile-name location-country">${ location.country }</h3>
                    <button class="btn-details btn-primary">Details</button>
                </li>
            </ul>
            <aside id="${ id }-modal" class="modal hide">
                <ul>
                    <li>
                        <img src="images/locations/${ img }.jpg" alt="${ location.name } ${ location.country } image" class="tile-img location-img">
                        <h2 class="tile-name location-name">${ location.name }</h2>
                        <h3 class="tile-name location-country">${ location.country }</h3>
                        <button id="${ id }-close" class="btn-red-xmark fa-solid fa-xmark"></button>
                    </li>
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
            </aside>`
            )
    });
}

export async function locationFilters() {
    events.forEach((type) => {
        eventsContent.insertAdjacentHTML("beforeend",
            `<li>
                <input type="checkbox" name="event" class="dropdown-item" value="${ type }">${ type }</input>
            </li>`
        );
    });
    
    countries.forEach((country) => {
        countriesContent.insertAdjacentHTML("beforeend",
            `<li>
                <input type="checkbox" name="country" class="dropdown-item" value="${ country }">${ country }</input>
            </li>`
        );
    });
    
    surfaces.forEach((surface) => {
        surfacesContent.insertAdjacentHTML("beforeend",
            `<li>
                <input type="checkbox" name="surface" class="dropdown-item" value="${ surface }">${ surface }</input>
            </li>`
        );
    });
}