export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality(): Item[] {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      // Update quality based on item name
      switch (item.name) {
        case 'Aged Brie':
          this.updateAgedBrie(item);
          break;
        case 'Backstage passes to a TAFKAL80ETC concert':
          this.updateBackstagePasses(item);
          break;
        case 'Sulfuras, Hand of Ragnaros':
          // Legendary item, no need to update
          break;
        default:
          if (item.name.startsWith('Conjured')) {
            this.updateConjured(item);
          } else {
            this.updateNormalItem(item);
          }
      }

      // Decrease sellIn for all items except Sulfuras
      if (item.name !== 'Sulfuras, Hand of Ragnaros') {
        item.sellIn--;
      }

      // Ensure quality stays within the valid range
      if (item.name !== 'Sulfuras, Hand of Ragnaros') {
        item.quality = Math.min(50, Math.max(0, item.quality));
      }

    }
    return this.items;
  }

  private updateNormalItem(item: Item): void {
  
    if (item.quality > 0) {
      item.quality--;
    }
    if (item.sellIn < 0 && item.quality > 0) {
      item.quality--; // Quality degrades twice as fast after expiration
    }
    if (item.name === 'Normal Item +10') {
      console.log("sellIn after update",item.sellIn)
      console.log("quality after update",item.quality)
    }
  }

  private updateAgedBrie(item: Item): void {
    if (item.quality < 50) {
      item.quality++;
    }
    if (item.sellIn < 0 && item.quality < 50) {
      item.quality++; // Quality increases even after expiration
    }
  }

  private updateBackstagePasses(item: Item): void {
    if (item.quality < 50 && item.sellIn > 0) {
      item.quality++;
      if (item.sellIn <= 10 && item.quality < 50) {
        item.quality++; // Quality increases by 2 when there are 10 days or less
      }
      if (item.sellIn <= 5 && item.quality < 50) {
        item.quality++; // Quality increases by 3 when there are 5 days or less
      }
    }
    else {
      item.quality = 0; // Quality drops to 0 after the concert
    }
  }

  private updateConjured(item: Item): void {
    if (item.quality > 0) {
      item.quality -= 2;
    }
    if (item.sellIn < 0 && item.quality > 0) {
      item.quality -= 2; // Quality degrades twice as fast after expiration
    }
  }
}
