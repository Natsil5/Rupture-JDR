/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
 export class ruptureActorSheet extends ActorSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
          classes: ["rupture", "sheet", "actor"],
          width: 1030, //defini la auteur et la largeurs de la fiche de perso
          height: 750,
          tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
        });
    }

    get template() {
        console.log(`rupture | Récupération du fichier html ${this.actor.type}-sheet.`);
        return `systems/rupture/templates/sheets/personnage-sheet.html`;
    }

    getData(){
        const data = super.getData();
        data.dtypes = ["String", "Number", "Boolean"];
        this._prepareCharacterItems(data);
        console.log(data);        
        return data;
    }
   
	_prepareCharacterItems(sheetData) {
        const actorData = sheetData.actor;

        // Initialize containers. Liste des différents items
        const inventaire = [];
        const sort = [];
        
        // Iterate through items, allocating to containers. Tri des différents items
        for (let i of sheetData.items) {
          let item = i.items;
          i.img = i.img || DEFAULT_TOKEN;
	       if (i.type === 'objet') {
            inventaire.push(i);
          } else if (i.type === 'magie') {
            sort.push(i);
          }
        }
        // Assign and return, assination des items
        actorData.inventaire = inventaire;
        actorData.sort = sort;
        console.log(sort)
        console.log(inventaire)
    }


    activateListeners(html){
        super.activateListeners(html);
        //edition items
        html.find('.item-edit').click(this._onItemEdit.bind(this));

        // Delete Inventory Item
        html.find('.item-delete').click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.items.get(li.data("itemId"));
            item.delete();
            li.slideUp(200, () => this.render(false));
        });
        //Jet de dés
        html.find('.dice').click(this._onRoll.bind(this));

        //total des stat
        html.find('.stat').each(function() {
            var baseInput = $(this).find('.base');
            var bonusInput = $(this).find('.bonus');
            var totalInput = $(this).find('.total');

            var baseValue = parseInt(baseInput.val()) || 0;
            var bonusValue = parseInt(bonusInput.val()) || 0;

            var total = baseValue + bonusValue;
            totalInput.val(total);
        });
    }

    getItemFromEvent = (ev) => {
        const parent = $(ev.currentTarget).parents(".item");
        //return this.actor.getOwnedItem(parent.data("itemId"));
        return this.actor.items.get(parent.data("itemId"));
    }


    _onItemEdit(event){
        const item = this.getItemFromEvent(event);
        item.sheet.render(true);
    }

    _onRoll(event){
        let name = event.target.dataset["name"];
        let base = event.target.dataset["base"];
        let bonus = event.target.dataset["bonus"];
        let stat = event.target.dataset["stat"];
        let statValue = this.actor.system.stat[stat]?.base || 0;
        let statBonus = this.actor.system.stat[stat]?.bonus || 0;
        let succes="";
        let inforesult=parseInt(base)+parseInt(bonus)+parseInt(statValue)+parseInt(statBonus);
        let r = new Roll("1d100");
        let roll=r.evaluate({"async": false});
        let retour=r.result; 
        if(retour<5){
            succes="<h4 class='result' style='background:#ff3333;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>Echec critique</h4>";
        }else if(retour>95){
            succes="<h4 class='result' style='background:#7dff33;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>Réussite critique</h4>";
        }else if(retour>=inforesult){
            succes="<h4 class='result' style='background:#78be50;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>Réussite</h4>";
        }else{
            succes="<h4 class='result' style='background:#ff5733;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>Echec</h4>";
        }
        let texte = '<span style="flex:auto"><p class="resultatp">Jet de ' + name + " : " + inforesult +'/100</p>'+succes+'</span>'
        roll.toMessage({
            speaker: ChatMessage.getSpeaker({ actor: this }),
            flavor: texte
        });

    }

}