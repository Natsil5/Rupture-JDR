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

        //ajout de sous compétences
        html.find('.add-sub-competence').click(this.addSubCompetence.bind(this));
        html.find('.rm-sub-competence').click(this.rmSubCompetence.bind(this));
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
        let r = new Roll("1d100 +"+inforesult);
        let roll=r.evaluate({"async": false});
        let retour=r.result; 
        
        let texte = '<span style="flex:auto"><p class="resultatp">Jet de ' + name + " : 1d100 +" + inforesult +'</p></span>'
        roll.toMessage({
            speaker: ChatMessage.getSpeaker({ actor: this }),
            flavor: texte
        });

    }

    addSubCompetence(event) {
        let id = event.target.dataset["id"];
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let randomId = '';
        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomId += characters.charAt(randomIndex);
        }
        let sousCompetences = {
            [`subcompt-${randomId}`]: [{'name':'','stat':'', 'base':'', 'bonus':''}]
        };
        //ajout de la sous compétence avec possibilité de supprimer
        let nouvelleSousCompetence = {};
        Object.keys(sousCompetences).forEach((competence) => {
            nouvelleSousCompetence[competence] = sousCompetences[competence];
        });
        // Mettre à jour l'acteur
        this.actor.update({[`system.competence.${id}.sousCompetences`]: nouvelleSousCompetence});

    }
    rmSubCompetence(event) {
        let id = event.target.dataset["id"];
        let idsub = event.target.dataset["idsub"];
        let sousComp = { ...this.actor.system.competence[id].sousCompetences };

        // Find and remove the sub-competence by ID
        delete sousComp[`${idsub}`];

        // Update the actor with the new sub-competences
        this.actor.system.competence[id].sousCompetences = sousComp;
        this.actor.render();
        this.actor.update({[`system.competence.${id}.sousCompetences`]: sousComp});

    }

}