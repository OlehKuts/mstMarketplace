import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Store } from "./store";
import App from "./App";
import { idGenerator } from "./utils";

const store = Store.create({
  currency: "UAH",
  id: idGenerator(),
  paymentHistory: { items: [] },
  itemList: {
    items: [
      {
        name: "Coffee 3 in 1",
        quantity: 5,
        price: 3,
        weight: "10g",
        brand: "Nescafe",
        releaseForm: "sticks",
        id: idGenerator()
      },
      {
        name: "Milk(1%)",
        quantity: 4,
        price: 26,
        weight: "900ml",
        brand: "Ferma",
        releaseForm: "package",
        id: idGenerator()
      }
    ]
  }
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App store={store} />
  </StrictMode>,
  rootElement
);
