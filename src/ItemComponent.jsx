import React, { Component } from "react";
import { observer } from "mobx-react";

// class ItemComponent extends Component {
//   render() {
//     const { item } = this.props;

//     return (
//       <li>
//         {item.name}: ${item.price.toFixed(2)} * {item.quantity} ={" "}
//         {item.total().toFixed(2)}
//         <button onClick={item.decrement}>-</button>
//         <button onClick={item.increment}>+</button>
//       </li>
//     );
//   }
// }

const ItemComponent = ({ item }) => (
  <li>
    {item.name}: ${item.price.toFixed(2)} * {item.quantity} ={" "}
    {item.total().toFixed(2)}
    <button onClick={item.decrement}>-</button>
    <button onClick={item.increment}>+</button>
  </li>
);

export default observer(ItemComponent);
