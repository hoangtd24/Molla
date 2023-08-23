interface cartItem {
  productId: number;
  qty: number;
}
export const getCartItem = () => {
  const cartItems = localStorage.getItem("cart");
  return cartItems ? JSON.parse(cartItems) : [];
};

export const addToCart = (productId: number) => {
  const cartItems = getCartItem();
  const index = cartItems.findIndex(
    (item: cartItem) => item.productId === productId
  );
  if (index !== -1) {
    cartItems[index].qty = cartItems[index].qty + 1;
    localStorage.setItem("cart", JSON.stringify(cartItems));
  } else {
    const newCart = [
      ...cartItems,
      {
        productId,
        qty: 1,
      },
    ];
    localStorage.setItem("cart", JSON.stringify(newCart));
  }
};
