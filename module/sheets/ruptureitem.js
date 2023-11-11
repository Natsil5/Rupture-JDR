/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Item}
 */
 export class ruptureItem extends Item {
  static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
          classes: ["rupture", "sheet", "item"],
          width: 600,
          height: 400,
        });
    }
	/** @override */
  prepareData() {
    super.prepareData();
    const itemData = this.system;
    const data = itemData;
    const flags = itemData.flags;
  }

  _prepareItemData(itemData) {
    const data = itemData.system;
  }


  prepareBaseData() {
  }

  prepareDerivedData() {
  }
}