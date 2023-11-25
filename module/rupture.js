import { ruptureActor } from"./sheets/ruptureactor.js";
import { ruptureActorSheet } from "./sheets/ruptureactorsheet.js";
import { ruptureItem } from "./sheets/ruptureitem.js";
import { ruptureItemSheet } from "./sheets/ruptureitemsheet.js";


Hooks.once("init", async function() {
    console.log("Rupture | Initialisation du système JDR-Jr");
	CONFIG.Actor.documentClass = ruptureActor;
    CONFIG.Item.documentClass = ruptureItem;

    CONFIG.Combat.initiative = {
	    formula: "1d100",
	    decimals: 0
	};

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("rupture", ruptureItemSheet, { makeDefault: true });

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("rupture", ruptureActorSheet, { makeDefault: true });
});


Handlebars.registerHelper('getKeys', function(obj) {
    return Object.keys(obj);
});