import { types as t } from "mobx-state-tree";

export const PaymentItem = t.model("PaymentItem", {
  name: t.string,
  boughtQuantity: t.number,
  price: t.number,
  weight: t.string,
  brand: t.string,
  releaseForm: t.string,
  id: t.identifier,
  date: t.Date,
  moneyEarned: t.number
});
