import dlcData from "../data/dlc/dlc.json" assert { type: "json" };

const dlcPacks = dlcData.dlcPacks;
const dlcList = document.getElementById("dlc-list");

const packs = [];
const dlcVehicles = [];
const dlcLocations = [];
const deluxePack = [];
const deluxeContent = [];
const deluxeUpgrade = [];

export async function findDLCKeyData() {
    dlcPacks.forEach((pack) => {
        if (!pack.content) {
            packs.push(pack.name);
        }
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
            deluxePack.push(pack.name)
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
    packs.forEach((pack) => {
        let packId = pack;
        packId = packId.replace(/ /g, "-").toLowerCase();
        dlcList.insertAdjacentHTML(
            "beforeend",
            `<li id="dlc-${ packId }" class="dlc-collection tile">
                <h2>${ pack }</h2>
                <ul id="dlc-items-${ packId }"></ul>
                <aside id="dlc-modal-${ packId }" class="modal hide">
                    <ul id="modal-list-${ packId }" class="modal-list">
                        <li id="modal-vehicles-${ packId }" class="modal-vehicles"></li>
                        <li id="modal-locations-${ packId }" class="modal-locations"></li>
                    </ul>
                </aside>
            </li>`
        );
    });
    dlcPacks.forEach(dlcPack => {
        let packId = dlcPack.name.replace(/ /g, "-").toLowerCase();
        const dlcCollection = document.getElementById("dlc-items-" + packId);
        const modalVehicles = document.getElementById("modal-vehicles-" + packId);
        const modalLocations = document.getElementById("modal-locations-" + packId);
        for (const value of Object.values(dlcPack)) {
            dlcVehicles.forEach(dlcVehicle => {
                let vehicleId = dlcVehicle.manufacturer + " " + dlcVehicle.model;
                vehicleId = vehicleId.replace(/ /g, "-").toLowerCase();
                if (dlcCollection && value.includes(dlcVehicle)) {
                    let img = dlcVehicle.manufacturer + "-" + dlcVehicle.model
                    img = img.replace(/ /g, "-").replace(/\//g, "").toLowerCase();
                    if (!document.getElementById(vehicleId)) {
                        dlcCollection.insertAdjacentHTML(
                            "beforeend",
                            `<li id="${ vehicleId }" class="dlc-content">
                                <h2 class="tile-name vehicle-manufacturer">${ dlcVehicle.manufacturer }</h2>
                                <h3 class="tile-name vehicle-model">${ dlcVehicle.model }</h3>
                            </li>`
                        );
                        modalVehicles.insertAdjacentHTML(
                            "beforeend",
                            `<li class="modal-content">
                                <img src="images/vehicles/${ img }.jpg" alt="" class="vehicle-img tile-img">
                                <h2 class="tile-name vehicle-manufacturer">${ dlcVehicle.manufacturer }</h2>
                                <h3 class="tile-name vehicle-model">${ dlcVehicle.model }</h3>
                            </li>`
                        );
                    }
                }
            });
            dlcLocations.forEach(dlcLocation => {
                let locationId = dlcLocation.name + " " + dlcLocation.country;
                locationId = locationId.replace(/ /g, "-").toLowerCase();
                if (value.includes(dlcLocation)) {
                    let img = dlcLocation.name + "-" + dlcLocation.country
                    img = img.replace(/ /g, "-").replace(/\//g, "").toLowerCase();
                    if (!document.getElementById(locationId)) {
                        dlcCollection.insertAdjacentHTML(
                            "beforeend",
                            `<li id="${ locationId }" class="dlc-content">
                                <h2 class="tile-name location-name">${ dlcLocation.name }</h2>
                                <h3 class="tile-name location-country">${ dlcLocation.country }</h3>
                            </li>`
                        );
                        modalLocations.insertAdjacentHTML(
                            "beforeend",
                            `<li class="modal-content">
                                <img src="images/locations/${ img }.jpg" alt="" class="location-img tile-img">
                                <h2 class="tile-name location-name">${ dlcLocation.name }</h2>
                                <h3 class="tile-name location-country">${ dlcLocation.country }</h3>
                            </li>`
                        );
                    }
                }
            });
            
        }
    });
    const dPackId = deluxePack[0].replace(/ /g, "-").toLowerCase();
    dlcList.insertAdjacentHTML(
        "beforeend",
        `<li id="dlc-${ dPackId }" class="tile dlc-collection">
            <h2>${ deluxePack[0] }</h2>
            <ul id="dlc-items-${ dPackId }"></ul>
        </li>`
    );

    deluxeContent.forEach(item => {
        const dlcCollection = document.getElementById("dlc-items-" + dPackId);
        let dcpPackId = item.name.replace(/ /g, "-").toLowerCase();
        dlcCollection.insertAdjacentHTML(
            "beforeend",
            `<li id="dlcdcp-${ dcpPackId }" class="tile dlcdcp-tile">
                <h3>${ item.name }</h3>
                <ul id="dlcdcp-items-${ dcpPackId }"></ul>
                <aside id="dlcdcp-modal-${ dcpPackId }" class="modal dlcdcp-modal hide">
                    <ul id="dlcdcp-modal-list-${ dcpPackId }" class="modal-list">
                        <li id="dlcdcp-modal-vehicles-${ dcpPackId }" class="modal-vehicles"></li>
                        <li id="dlcdcp-modal-locations-${ dcpPackId }" class="modal-locations"></li>
                    </ul>
                </aside>
            </li>`
        );
        
        const dcpCollection = document.getElementById("dlcdcp-items-" + dcpPackId);
        const modalVehicles = document.getElementById("dlcdcp-modal-vehicles-" + dcpPackId);
        const modalLocations = document.getElementById("dlcdcp-modal-locations-" + dcpPackId);
        if (item.vehicles) {
            for (let i = 0; i < item.vehicles.length; i++) {
                let vehicleId = item.vehicles[i].manufacturer + " " + item.vehicles[i].model;
                vehicleId = vehicleId.replace(/ /g, "-").toLowerCase();
                let img = item.vehicles[i].manufacturer + "-" + item.vehicles[i].model
                img = img.replace(/ /g, "-").replace(/\//g, "").toLowerCase();
                dcpCollection.insertAdjacentHTML(
                    "beforeend",
                    `<li id="dlcdcp-item-${ vehicleId }" class="dlc-content">
                        <h2 class="tile-name vehicle-manufacturer">${ item.vehicles[i].manufacturer }</h2>
                        <h3 class="tile-name vehicle-model">${ item.vehicles[i].model }</h3>
                    </li>`
                );
                modalVehicles.insertAdjacentHTML(
                    "beforeend",
                    `<li class="modal-content">
                        <img src="images/vehicles/${ img }.jpg" alt="" class="vehicle-img tile-img">
                        <h2 class="tile-name vehicle-manufacturer">${ item.vehicles[i].manufacturer }</h2>
                        <h3 class="tile-name vehicle-model">${ item.vehicles[i].model }</h3>
                    </li>`
                );
            }
        }
        if (item.locations) {
            for (let i = 0; i < item.locations.length; i++) {
                let locationId = item.locations[i].name + " " + item.locations[i].country;
                locationId = locationId.replace(/ /g, "-").toLowerCase();
                let img = item.locations[i].name + "-" + item.locations[i].country
                img = img.replace(/ /g, "-").replace(/\//g, "").toLowerCase();
                dcpCollection.insertAdjacentHTML(
                    "beforeend",
                    `<li id="dlcdcp-item-${ locationId }" class="dlc-content">
                        <h2 class="tile-name location-name">${ item.locations[i].name }</h2>
                        <h3 class="tile-name location-country">${ item.locations[i].country }</h3>
                    </li>`
                );
                modalLocations.insertAdjacentHTML(
                    "beforeend",
                    `<li class="modal-content">
                        <img src="images/locations/${ img }.jpg" alt="" class="location-img tile-img">
                        <h2 class="tile-name location-name">${ item.locations[i].name }</h2>
                        <h3 class="tile-name location-country">${ item.locations[i].country }</h3>
                    </li>`
                );
            }
        }
    });

    deluxeUpgrade.forEach(item => {
        const dlcCollection = document.getElementById("dlc-items-deluxe-content-packs");
        let collectionName = item.name  == "Season 1" || item.name == "Season 2" ? "Deluxe Upgrade" : "Deluxe Upgrade 2.0";
        let collectionId = "delupg-" + collectionName.replace(/ /g, "-").toLowerCase();
        let dcpPackId = item.name.replace(/ /g, "-").toLowerCase();
        if (!document.getElementById(collectionId)) {
            dlcCollection.insertAdjacentHTML(
                "beforeend",
                `<li id="${ collectionId }" class="tile">
                    <h3>${ collectionName }</h3>
                </li>`
            );
        }

        const dcpCollection = document.getElementById(collectionId);
        dcpCollection.insertAdjacentHTML(
            "beforeend",
            `<ul id="delupg-${ dcpPackId }" class="delupg-tile">
                <h4>${ item.name }</h4>
            </ul>
            <aside id="delupg-modal-${ dcpPackId }" class="modal delupg-modal hide">
                <ul id="delupg-modal-list-${ dcpPackId }" class="modal-list">
                    <li class="modal-season">
                        <h4>${ item.name }</h4>
                        <ul  id="delupg-content-${ dcpPackId }">
                            <li id="delupg-modal-vehicles-${ dcpPackId }" class="modal-vehicles"></li>
                            <li id="delupg-modal-locations-${ dcpPackId }" class="modal-locations"></li>
                        </ul>
                    </li>
                </ul>
            </aside>`
        )

        const delUpgCollection = document.getElementById("delupg-content-" + dcpPackId);
        const modalVehicles = document.getElementById("delupg-modal-vehicles-" + dcpPackId);
        const modalLocations = document.getElementById("delupg-modal-locations-" + dcpPackId);
        if (item.vehicles) {
            for (let i = 0; i < item.vehicles.length; i++) {
                let vehicleId = item.vehicles[i].manufacturer + " " + item.vehicles[i].model;
                vehicleId = vehicleId.replace(/ /g, "-").toLowerCase();
                let img = item.vehicles[i].manufacturer + "-" + item.vehicles[i].model
                img = img.replace(/ /g, "-").replace(/\//g, "").toLowerCase();
                delUpgCollection.insertAdjacentHTML(
                    "beforeend",
                    `<li id="delupg-item-${ vehicleId }" class="dlc-content">
                        <h2 class="tile-name vehicle-manufacturer">${ item.vehicles[i].manufacturer }</h2>
                        <h3 class="tile-name vehicle-model">${ item.vehicles[i].model }</h3>
                    </li>`
                );
                modalVehicles.insertAdjacentHTML(
                    "beforeend",
                    `<li class="modal-content">
                        <img src="images/vehicles/${ img }.jpg" alt="" class="vehicle-img tile-img">
                        <h2 class="tile-name vehicle-manufacturer">${ item.vehicles[i].manufacturer }</h2>
                        <h3 class="tile-name vehicle-model">${ item.vehicles[i].model }</h3>
                    </li>`
                );
            }
        }
        if (item.locations) {
            for (let i = 0; i < item.locations.length; i++) {
                let locationId = item.locations[i].name + " " + item.locations[i].country;
                locationId = locationId.replace(/ /g, "-").toLowerCase();
                let img = item.locations[i].name + "-" + item.locations[i].country
                img = img.replace(/ /g, "-").replace(/\//g, "").toLowerCase();
                delUpgCollection.insertAdjacentHTML(
                    "beforeend",
                    `<li id="dlcdcp-item-${ locationId }" class="dlc-content">
                        <img src="images/locations/${ img }.jpg" alt="" class="location-img tile-img">
                        <h2 class="tile-name location-name">${ item.locations[i].name }</h2>
                        <h3 class="tile-name location-country">${ item.locations[i].country }</h3>
                    </li>`
                );
                modalLocations.insertAdjacentHTML(
                    "beforeend",
                    `<li class="modal-content">
                        <img src="images/locations/${ img }.jpg" alt="" class="location-img tile-img">
                        <h2 class="tile-name location-name">${ item.locations[i].name }</h2>
                        <h3 class="tile-name location-country">${ item.locations[i].country }</h3>
                    </li>`
                );
            }
        }
    });
}
