import React from "react";
import ItemOrdered from "../ItemOrdered/ItemOrdered";

const ItemOrderedList = ({items}) => {

  return (
    <div>
      {items.map((item) => {
        return (
          <ItemOrdered
            key={item.id}
            id={item.id}
            productId={item.productId}
            quantity={item.quantity}
            price={item.price}
            productName={item.productName}
            productPrice={item.productPrice}
            productImage={item.productImage}
          />
        );
      })}
    </div>
  );
};

export default ItemOrderedList;
