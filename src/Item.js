import { types as t, getParent } from "mobx-state-tree";

export const Item = t
  .model("Item", {
    name: t.string,
    quantity: t.number,
    price: t.number,
    weight: t.string,
    brand: t.string,
    releaseForm: t.string,
    preOrdered: t.optional(t.number, 0),
    id: t.identifier
  })
  .views((self) => ({
    total() {
      return self.price * self.quantity;
    },
    totalPreordered() {
      return self.price * self.preOrdered;
    }
  }))
  .actions((self) => ({
    increment() {
      self.quantity = self.quantity + 1;
    },
    decrement() {
      if (self.quantity === 0) return;
      self.quantity = self.quantity - 1;
    },
    incrementPreOrdered() {
      if (self.quantity === self.preOrdered) return;
      self.preOrdered = self.preOrdered + 1;
    },
    decrementPreOrdered() {
      if (self.preOrdered === 0) return;
      self.preOrdered = self.preOrdered - 1;
    },
    remove() {
      getParent(self, 2).remove(self);
    }
  }));
