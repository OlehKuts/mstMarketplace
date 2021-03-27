import React, { Component } from "react";
import "./styles.css";
import { observer } from "mobx-react";
import { idGenerator } from "./utils";

class App extends Component {
  constructor(props) {
    super(props);
    this.setOwnerMode = this.setOwnerMode.bind(this);
    this.onLogOut = this.onLogOut.bind(this);
    this.state = { isOwner: false };
  }
  setOwnerMode(password) {
    if (password === "owner") {
      this.setState({ isOwner: true });
      alert("Welcome owner!");
    } else {
      alert("Password is wrong!");
    }
  }
  onLogOut() {
    this.setState({ isOwner: false });
  }
  render() {
    const { store } = this.props;
    const dateRetriever = (dateObject) => {
      let [month] = dateObject.toLocaleDateString().split("/");
      return month;
    };
    const timeRetriever = (dateObject) => {
      let [hour, minute] = dateObject
        .toLocaleTimeString()
        .slice(0, 7)
        .split(":");
      return `${hour}:${minute}`;
    };
    const onAddSubmit = (e) => {
      e.preventDefault();
      store.itemList.add({
        name: this.nameInput.value,
        price: parseFloat(this.priceInput.value, 10) * 1.5,
        quantity: parseFloat(this.quantityInput.value),
        id: idGenerator(),
        weight: this.weightInput.value,
        releaseForm: this.releaseFormInput.value,
        brand: this.brandInput.value
      });
      e.target.reset();
      this.nameInput.focus();
    };
    const onLoginSubmit = (e) => {
      e.preventDefault();
      this.setOwnerMode(this.passwordInput.value);
      e.target.reset();
    };
    const applyPayment = () => {
      store.addPayment();
      store.itemList.makePayment();
    };
    return (
      <div className="App">
        {!this.state.isOwner && (
          <>
            <form className="loginForm" onSubmit={onLoginSubmit}>
              <label htmlFor="login">
                Password ("owner")
                <input
                  type="text"
                  ref={(input) => (this.passwordInput = input)}
                  id="login"
                />
              </label>
              <button type="submit" className="bigBtn">
                Login
              </button>
            </form>
          </>
        )}
        <h4>
          Logged as {this.state.isOwner ? "owner" : "client"}{" "}
          {this.state.isOwner && (
            <>
              <button onClick={this.onLogOut} className="bigBtn">
                Log out
              </button>
            </>
          )}
        </h4>
        {this.state.isOwner && (
          <>
            <h2>Add new article</h2>
            <form className="addArticleForm" onSubmit={onAddSubmit}>
              <label htmlFor="name">
                Name
                <input
                  type="text"
                  ref={(input) => (this.nameInput = input)}
                  id="name"
                />
              </label>
              <label htmlFor="price">
                Price
                <input
                  type="string"
                  ref={(input) => (this.priceInput = input)}
                  id="price"
                />
              </label>
              <label htmlFor="quantity">
                Quantity
                <input
                  type="number"
                  ref={(input) => (this.quantityInput = input)}
                  id="quantity"
                />
              </label>
              <label htmlFor="weight">
                Weight/volume
                <input
                  type="string"
                  ref={(input) => (this.weightInput = input)}
                  id="weight"
                />
              </label>
              <label htmlFor="releaseForm">
                Release form
                <input
                  type="string"
                  ref={(input) => (this.releaseFormInput = input)}
                  id="releaseForm"
                />
              </label>
              <label htmlFor="brand">
                Brand
                <input
                  type="string"
                  ref={(input) => (this.brandInput = input)}
                  id="brand"
                />
              </label>
              <button type="submit" className="bigBtn">
                Add article
              </button>
            </form>
          </>
        )}
        <hr />
        <h2>Articles</h2>
        <table>
          <thead>
            <tr>
              <td>№</td>
              <td className="tdWide">Name</td>
              <td>Brand</td>
              <td>Release form</td>
              <td>Weight/volume</td>
              <td className="tdWide">Price</td>
              <td className="tdWide">Quantity</td>

              {this.state.isOwner && <td className="tdMiddle">Add</td>}
              {this.state.isOwner && <td className="tdMiddle">Subtract</td>}
              {!this.state.isOwner && <td className="tdMiddle">Add</td>}
              {!this.state.isOwner && <td className="tdMiddle">Subtract</td>}
              {!this.state.isOwner && (
                <td className="tdMiddle">In shopping cart</td>
              )}
              {this.state.isOwner && <td className="tdMiddle">X</td>}
            </tr>
          </thead>
          <tbody>
            {store.itemList.items.map((item, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td className="tdName">{item.name}</td>
                <td>{item.brand}</td>
                <td>{item.releaseForm}</td>
                <td>{item.weight}</td>
                <td className="tdWide">{item.price.toFixed(2)}</td>
                <td className="tdWide">{item.quantity}</td>
                {this.state.isOwner && (
                  <td className="tdMiddle">
                    <button onClick={item.increment} className="shortBtn ">
                      +
                    </button>
                  </td>
                )}
                {this.state.isOwner && (
                  <td className="tdMiddle">
                    <button
                      onClick={item.decrement}
                      className="shortBtn subtractBtn"
                    >
                      -
                    </button>
                  </td>
                )}
                {!this.state.isOwner && (
                  <td className="tdMiddle">
                    <button
                      onClick={item.incrementPreOrdered}
                      className="shortBtn"
                    >
                      +
                    </button>
                  </td>
                )}
                {!this.state.isOwner && (
                  <td className="tdMiddle">
                    <button
                      onClick={item.decrementPreOrdered}
                      className="shortBtn subtractBtn"
                    >
                      -
                    </button>
                  </td>
                )}
                {!this.state.isOwner && (
                  <td className="tdMiddle">{item.preOrdered}</td>
                )}
                {this.state.isOwner && (
                  <td className="tdMiddle">
                    <button
                      onClick={item.remove}
                      className="shortBtn removeBtn"
                    >
                      X
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {this.state.isOwner && (
          <>
            <h2>
              Total cost of available Articles :{" "}
              {store.itemList.allArticlesTotal().toFixed(2)}
              {store.currency}
            </h2>
          </>
        )}
        <hr />
        {!this.state.isOwner && <h3>Shopping cart</h3>}
        {!this.state.isOwner && (
          <div className="shoppingCart">
            <ul id="basketList">
              {store.itemList.showPreOrderedList().map((item, idx) => (
                <li key={idx}>
                  {item.name} : {item.price.toFixed(2)} * {item.preOrdered} ={" "}
                  {item.totalPreordered().toFixed(2)}UAH
                </li>
              ))}
            </ul>
            <h2>
              Total to pay : {store.itemList.totalToPay().toFixed(2)}
              {store.currency}
            </h2>
            <button className="bigBtn" onClick={applyPayment}>
              Pay
            </button>
          </div>
        )}
        <div>
          {" "}
          {/* <button onClick={() => console.log(store.paymentHistory)}>
            View store
          </button> */}
        </div>
        {this.state.isOwner && (
          <>
            <div>
              <h4>Transactions history</h4>
              <table>
                <thead>
                  <tr>
                    <td>№</td>
                    <td className="tdWide">Name</td>
                    <td>Brand</td>
                    <td>Price</td>
                    <td>Quantity</td>
                    <td className="tdWide">Earned</td>
                    <td className="tdWide">Date</td>
                    <td className="tdWide">Time</td>
                  </tr>
                </thead>
                <tbody>
                  {store.paymentHistory.items.map((item, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td className="tdName">{item.name}</td>
                      <td>{item.brand}</td>
                      <td>{item.price}UAH</td>
                      <td>{item.boughtQuantity}</td>
                      <td className="tdWide">{item.moneyEarned}UAH</td>
                      <td className="tdWide">{dateRetriever(item.date)}</td>
                      <td className="tdWide">{timeRetriever(item.date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h2>
                Total earned : {store.paymentHistory.earnedTotal().toFixed(2)}
                {store.currency}
              </h2>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default observer(App);
