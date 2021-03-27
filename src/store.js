import { types as t } from "mobx-state-tree";
import { PaymentList } from "./paymentList";
import { ItemList } from "./ItemList";
import { idGenerator } from "./utils";

export const Store = t
  .model("Store", {
    currency: t.string,
    id: t.identifier,
    itemList: t.optional(ItemList, { items: [] }),
    paymentHistory: t.optional(PaymentList, { items: [] })
  })
  .actions((self) => ({
    addPayment() {
      for (let i = 0; i < self.itemList.items.length; i++) {
        if (self.itemList.items[i].preOrdered > 0) {
          self.paymentHistory.items.unshift({
            name: self.itemList.items[i].name,
            boughtQuantity: self.itemList.items[i].preOrdered,
            price: self.itemList.items[i].price,
            weight: self.itemList.items[i].weight,
            brand: self.itemList.items[i].brand,
            releaseForm: self.itemList.items[i].releaseForm,
            id: idGenerator(),
            date: new Date(),
            moneyEarned: self.itemList.items[i].totalPreordered()
          });
        }
      }
    }
  }));
