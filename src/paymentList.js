import { types as t } from "mobx-state-tree";
import { PaymentItem } from "./paymentItem";

export const PaymentList = t
  .model("ItemList", {
    items: t.array(PaymentItem)
  })
  .views((self) => ({
    earnedTotal() {
      return self.items.reduce((sum, item) => sum + item.moneyEarned, 0);
    }
  }));
