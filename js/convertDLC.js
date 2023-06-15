import dlcData from "../data/dlc/dlc.json" assert { type: "json" };

const dlcPacks = dlcData.dlcPacks;
const dlcList = document.getElementById("dlc-list");

const dlcVehicles = [];
const dlcLocations = [];
const deluxeContent = [];
const deluxeUpgrade = [];
const dlcDelConImgs = [];
const dlcDelUpgImgs = [];

export async function findDLCKeyData() {
    dlcPacks.forEach((pack) => {
        if (pack.vehicles) {
            for (let i = 0; i < pack.vehicles.length; i++) {
                dlcVehicles.push(pack.vehicles[i]);
            }
        }
        if (pack.locations) {
            for (let i = 0; i < pack.locations.length; i++) {
                dlcLocations.push(pack.locations[i]);
            }
        }
        if (pack.content) {
            for (let i = 0; i < pack.content.length; i++) {
                if (pack.content[i].content) {
                    for (let j = 0; j < pack.content[i].content.length; j++) {
                        deluxeUpgrade.push(pack.content[i].content[j]);
                    }
                } else {
                    deluxeContent.push(pack.content[i]);
                }
            }
        }
    });
}

export async function convertDLC() {
    dlcPacks.forEach(dlcPack => {
        let packId = dlcPack.name.replace(/ /g, "-").toLowerCase();

        dlcList.insertAdjacentHTML(
            "beforeend",
            `<li id="dlc-${ packId }" class="dlc-collection tile">
                <h2>${ dlcPack.name }</h2>
                <ul id="dlc-items-${ packId }" class="dlc-tile-items"></ul>
                <a id="prev-btn-${ packId }" class="prev-btn fa-solid fa-chevron-left"></a>
                <a id="next-btn-${ packId }" class="next-btn fa-solid fa-chevron-right"></a>
            </li>`
        );

        const dlcItems = document.getElementById("dlc-items-" + packId);

        for (const value of Object.values(dlcPack)) {
            dlcLocations.forEach(dlcLocation => {
                let locationId = dlcLocation.name + " " + dlcLocation.country;
                locationId = locationId.replace(/ /g, "-").toLowerCase();
                if (value.includes(dlcLocation)) {
                    let img = dlcLocation.name + "-" + dlcLocation.country
                    img = img.replace(/ /g, "-").replace(/\//g, "").toLowerCase();
                    if (!document.getElementById(locationId)) {
                        dlcItems.insertAdjacentHTML(
                            "beforeend",
                            `<li id="dlc-tile-${ locationId }" class="tile dlc-slider-tile frosted-glass">
                                <div id="${ locationId }-blur" class="background-blur hide"></div>
                                <img src="images/locations/${ img }.jpg" alt="" class="location-img tile-img">
                                <ul id="dlc-text-list-${ locationId }" class="dlc-text-list hide">
                                    <li>
                                        <h2 class="dlc-location">${ dlcLocation.name }</h2>
                                        <h3 class="dlc-country">${ dlcLocation.country }</h3>
                                    </li>
                                </ul>
                            </li>`
                        );
                    }
                }
            });
            
            dlcVehicles.forEach(dlcVehicle => {
                let vehicleId = dlcVehicle.manufacturer + " " + dlcVehicle.model;
                vehicleId = vehicleId.replace(/ /g, "-").toLowerCase();
                if (value.includes(dlcVehicle)) {
                    let img = dlcVehicle.manufacturer + "-" + dlcVehicle.model
                    img = img.replace(/ /g, "-").replace(/\//g, "").toLowerCase();
                    if (!document.getElementById(vehicleId)) {
                        dlcItems.insertAdjacentHTML(
                            "beforeend",
                            `<li id="dlc-tile-${ vehicleId }" class="tile dlc-slider-tile frosted-glass">
                                <div id="${ vehicleId }-blur" class="background-blur hide"></div>
                                <img src="images/vehicles/${ img }.jpg" alt="" class="vehicle-img tile-img">
                                <ul id="dlc-text-list-${ vehicleId }" class="dlc-text-list hide">
                                    <li>
                                        <h2 class="dlc-manufacturer">${ dlcVehicle.manufacturer }</h2>
                                        <h3 class="dlc-model">${ dlcVehicle.model }</h3>
                                    </li>
                                </ul>
                            </li>`
                        );
                    }
                }
            });
        }
    });

    deluxeContent.forEach(item => {
        const delConImgs = []
        const dlcCollection = document.getElementById("dlc-items-deluxe-content-packs");
        let dcpPackId = item.name.replace(/ /g, "-").toLowerCase();
        if (item.locations) {
            for (let i = 0; i < item.locations.length; i++) {
                let img = "images/locations/" + item.locations[i].name + "-" + item.locations[i].country + ".jpg";
                img = img.replace(/ /g, "-").toLowerCase();
                delConImgs.push(img);
            }
        }
        if (item.vehicles) {
            for (let i = 0; i < item.vehicles.length; i++) {
                let img = "images/vehicles/" + item.vehicles[i].manufacturer + "-" + item.vehicles[i].model + ".jpg";
                img = img.replace(/ /g, "-").toLowerCase();
                delConImgs.push(img);
            }
        }
        dlcDelConImgs.push({name: item.name, arr: delConImgs});

        dlcCollection.insertAdjacentHTML(
            "beforeend",
            `<li id="delcon-tile-${ dcpPackId }" class="tile dlc-slider-tile frosted-glass">
                <div id="${ dcpPackId }-blur" class="background-blur hide"></div>
                <ul id="delcon-text-list-${ dcpPackId }" class="dlc-text-list hide">
                    <li class="collection-name">
                        <h1>${ item.name }</h1>
                    </li>
                    <li class="collection-includes">
                        <p>Includes</p>
                    </li>
                </ul>
            </li>`
        );
        console.log(dlcCollection);
        
        const dcpCollection = document.getElementById("delcon-text-list-" + dcpPackId);

        if (item.locations) {
            for (let i = 0; i < item.locations.length; i++) {
                let locationId = item.locations[i].name + " " + item.locations[i].country;
                locationId = locationId.replace(/ /g, "-").toLowerCase();
                let img = item.locations[i].name + "-" + item.locations[i].country;
                img = img.replace(/ /g, "-").replace(/\//g, "").toLowerCase();

                dcpCollection.insertAdjacentHTML(
                    "beforeend",
                    `<li id="dlcdcp-item-${ locationId }" class="collection-content">
                        <p>- ${ item.locations[i].name }, ${ item.locations[i].country }</p>
                    </li>`
                );
            }
        }

        if (item.vehicles) {
            for (let i = 0; i < item.vehicles.length; i++) {
                let vehicleId = item.vehicles[i].manufacturer + " " + item.vehicles[i].model;
                vehicleId = vehicleId.replace(/ /g, "-").toLowerCase();
                let img = item.vehicles[i].manufacturer + "-" + item.vehicles[i].model
                img = img.replace(/ /g, "-").replace(/\//g, "").toLowerCase();

                dcpCollection.insertAdjacentHTML(
                    "beforeend",
                    `<li id="dlcdcp-item-${ vehicleId }" class="collection-content">
                        <p>- ${ item.vehicles[i].manufacturer }, ${ item.vehicles[i].model }</p>
                    </li>`
                );
            }
        }
    });

    const delUpgImgs = [{name: "Deluxe Upgrade", arr: []}, {name: "Deluxe Upgrade 2.0", arr: []}];
    deluxeUpgrade.forEach(item => {
        const dlcCollection = document.getElementById("dlc-items-deluxe-content-packs");
        let collectionName = item.name  == "Season 1" || item.name == "Season 2" ? "Deluxe Upgrade" : "Deluxe Upgrade 2.0";
        let collectionId = collectionName.replace(/ /g, "-").toLowerCase();
        if (item.locations) {
            for (let i = 0; i < item.locations.length; i++) {
                let img = "images/locations/" + item.locations[i].name + "-" + item.locations[i].country + ".jpg";
                img = img.replace(/ /g, "-").toLowerCase();
                if (delUpgImgs[0].name === collectionName) {
                    delUpgImgs[0].arr.push(img);
                } else if (delUpgImgs[1].name === collectionName) {
                    delUpgImgs[1].arr.push(img);
                }
            }
        }
        if (item.vehicles) {
            for (let i = 0; i < item.vehicles.length; i++) {
                let img = "images/vehicles/" + item.vehicles[i].manufacturer + "-" + item.vehicles[i].model + ".jpg";
                img = img.replace(/ /g, "-").toLowerCase();
                if (delUpgImgs[0].name === collectionName) {
                    delUpgImgs[0].arr.push(img);
                } else if (delUpgImgs[1].name === collectionName) {
                    delUpgImgs[1].arr.push(img);
                }
            }
        }
        if (dlcDelUpgImgs.length < 1) {
            dlcDelUpgImgs.push(delUpgImgs);
        }
        if (!document.getElementById("delupg-tile-" + collectionId)) {
            dlcCollection.insertAdjacentHTML(
                "beforeend",
                `<li id="delupg-tile-${ collectionId }" class="tile dlc-slider-tile frosted-glass">
                    <div id="${ collectionId }-blur" class="background-blur hide"></div>
                    <ul id="delupg-text-list-${ collectionId }" class="dlc-text-list hide">
                        <li class="collection-name">
                            <h1>${ collectionName }</h1>
                        </li>
                        <li class="collection-includes">
                            <p>Includes</p>
                        </li>
                    </ul>
                </li>`
            );
        }
        const collectionList = document.getElementById("delupg-text-list-" + collectionId);
            collectionList.insertAdjacentHTML(
                "beforeend",
                `<li class="collection-content">
                    <p>- ${ item.name }</p>
                </li>`
            );
    });
}

export { dlcDelConImgs, dlcDelUpgImgs }