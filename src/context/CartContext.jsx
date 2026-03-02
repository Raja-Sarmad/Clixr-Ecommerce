import React, { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  // each item: { ...product, qty }
  const [cart, setCart] = useState([]);

  // last placed order (for Success page)
  const [lastOrder, setLastOrder] = useState(null);

  // ✅ Add to cart (same item again => qty++)
  const addToCart = (product) => {
    if (!product?._id) return;

    setCart((prev) => {
      const exists = prev.find((item) => item._id === product._id);

      if (exists) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, qty: (item.qty || 1) + 1 }
            : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  // ✅ Remove item completely
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  // ✅ Increase qty
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, qty: (item.qty || 1) + 1 } : item
      )
    );
  };

  // ✅ Decrease qty (qty 0 => remove)
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === id ? { ...item, qty: (item.qty || 1) - 1 } : item
        )
        .filter((item) => (item.qty || 1) > 0)
    );
  };

  // ✅ Clear cart
  const clearCart = () => setCart([]);

  // ✅ Total items in cart (sum of qty)
  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  }, [cart]);

  // ✅ Subtotal (sum price * qty)
  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const price = Number(item.price) || 0;
      return sum + price * (item.qty || 1);
    }, 0);
  }, [cart]);

  /**
   * ✅ Place order (front-end only)
   * payload example:
   * {
   *  customer: { name, phone, address, city, ... },
   *  payment: { method: "cod" | "card" | "bank", status: "requested" },
   *  totals: { subtotal, shipping, total }
   * }
   */
  const placeOrder = (payload = {}) => {
    if (!cart.length) return null;

    const order = {
      id: typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : String(Date.now()),
      createdAt: new Date().toISOString(),
      items: cart,
      subtotal,
      ...payload,
    };

    setLastOrder(order);
    clearCart(); // order placed => empty cart
    return order;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        cartCount,
        subtotal,
        lastOrder,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);