import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  describe('updateQuality', () => {
    it('should handle normal items', () => {
      const items = [
        new Item('Normal Item 1', 5, 10),
        new Item('Normal Item 2', 0, 10),
        new Item('Normal Item 3', 5, 0),
      ];
      const gildedRose = new GildedRose(items);
      const updatedItems = gildedRose.updateQuality();
      
      expect(updatedItems[0].name).toBe('Normal Item 1');
      expect(updatedItems[0].sellIn).toBe(4);
      expect(updatedItems[0].quality).toBe(9);
      
      expect(updatedItems[1].name).toBe('Normal Item 2');
      expect(updatedItems[1].sellIn).toBe(-1);
      expect(updatedItems[1].quality).toBe(8);
      
      expect(updatedItems[2].name).toBe('Normal Item 3');
      expect(updatedItems[2].sellIn).toBe(4);
      expect(updatedItems[2].quality).toBe(0);
    });
    
    it('should handle Aged Brie', () => {
      const item = new Item('Aged Brie', 5, 10);
      const gildedRose = new GildedRose([item]);
      const updatedItems = gildedRose.updateQuality();
      
      expect(updatedItems[0].name).toBe('Aged Brie');
      expect(updatedItems[0].sellIn).toBe(4);
      expect(updatedItems[0].quality).toBe(11);
    });
    
    it('should handle Backstage passes', () => {
      const item = new Item('Backstage passes to a TAFKAL80ETC concert', 11, 10);
      const gildedRose = new GildedRose([item]);
      const updatedItems = gildedRose.updateQuality();
      
      expect(updatedItems[0].name).toBe('Backstage passes to a TAFKAL80ETC concert');
      expect(updatedItems[0].sellIn).toBe(10);
      expect(updatedItems[0].quality).toBe(11);
    });
    
    it('should handle Sulfuras', () => {
      const item = new Item('Sulfuras, Hand of Ragnaros', 5, 80);
      const gildedRose = new GildedRose([item]);
      const updatedItems = gildedRose.updateQuality();
      
      expect(updatedItems[0].name).toBe('Sulfuras, Hand of Ragnaros');
      expect(updatedItems[0].sellIn).toBe(5);
      expect(updatedItems[0].quality).toBe(80);
    });
    
    it('should handle Conjured items', () => {
      const item = new Item('Conjured Item', 5, 10);
      const gildedRose = new GildedRose([item]);
      const updatedItems = gildedRose.updateQuality();
      
      expect(updatedItems[0].name).toBe('Conjured Item');
      expect(updatedItems[0].sellIn).toBe(4);
      expect(updatedItems[0].quality).toBe(8);
    });
  });
});

