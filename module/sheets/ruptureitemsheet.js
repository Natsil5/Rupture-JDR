/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Item}
 */
 export class ruptureItemSheet extends ItemSheet{
    get template(){
        console.log(`rupture | Récupération du fichier html ${this.item.type}-sheet.`);

        return `systems/rupture/templates/sheets/${this.item.type}-sheet.html`;
    }

    getData(){
        const data = super.getData();
        data.dtypes = ["String", "Number", "Boolean"];
        console.log(data);

        return data;
    }
}