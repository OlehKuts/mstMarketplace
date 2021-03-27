import { types as t } from "mobx-state-tree";
import { Item } from "./Item";

export const ItemList = t
  .model("ItemList", {
    items: t.array(Item)
  })
  .views((self) => ({
    allArticlesTotal() {
      return self.items.reduce((sum, item) => sum + item.total(), 0);
    },
    totalToPay() {
      return self.items.reduce((sum, item) => sum + item.totalPreordered(), 0);
    },
    showPreOrderedList() {
      return self.items.filter((i) => i.preOrdered > 0);
    }
  }))
  .actions((self) => ({
    add(item) {
      return self.items.unshift(item);
    },
    remove(item) {
      self.items.splice(self.items.indexOf(item), 1);
    },
    makePayment() {
      return self.items.map((i) => {
        if (i.preOrdered > 0) {
          i.quantity = i.quantity - i.preOrdered;
          i.preOrdered = 0;
        }
        return i;
      });
    }
  }));
