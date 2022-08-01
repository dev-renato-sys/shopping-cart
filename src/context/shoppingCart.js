import aboveJson from "./../jsons/above.json";
import React, { createContext } from "react";
import { useAuth } from "./auth";
import { reloadPage } from "helpers/page";
import { getCurrencyNumber } from "helpers/currency";

const ShoppingCartContext = createContext({});

export const ShoppingCartProvider = ({ children }) => {
  const { user } = useAuth();
  // usually this will be from the api request, i guess
  const [items, setItems] = React.useState(aboveJson?.items);
  const [shoppingCart, setShoppingCart] = React.useState(user?.shoppingCart);

  const shoppingCartTotalSpendWithoutDiscounts = React.useMemo(() => {
    return getCurrencyNumber(
      shoppingCart?.reduce((accumulator, object) => {
        return accumulator + object.price * object.quantity;
      }, 0)
    );
  }, [shoppingCart]);

  const shoppingCartTotalDiscounts = React.useMemo(() => {
    return getCurrencyNumber(
      shoppingCart?.reduce((accumulator, object) => {
        return accumulator + object.priceTags[0].value * object.quantity;
      }, 0)
    );
  }, [shoppingCart]);

  const shoppingCartTotalSpendWithDiscounts = React.useMemo(() => {
    return getCurrencyNumber(
      shoppingCart?.reduce((accumulator, object) => {
        return accumulator + object.sellingPrice * object.quantity;
      }, 0)
    );
  }, [shoppingCart]);

  const addOneItemQuantityToChart = async (item) => {
    await localStorage.setItem(
      "@App:user",
      JSON.stringify({
        ...user,
        shoppingCart: shoppingCart.map((shoppingCartItem) => {
          if (shoppingCartItem.productId === item.productId) {
            return {
              ...shoppingCartItem,
              quantity: shoppingCartItem.quantity + 1,
            };
          }

          return shoppingCartItem;
        }),
      })
    );

    reloadPage();
  };

  const removeOneItemQuantityToChart = async (item) => {
    await localStorage.setItem(
      "@App:user",
      JSON.stringify({
        ...user,
        shoppingCart: shoppingCart.map((shoppingCartItem) => {
          if (shoppingCartItem.productId === item.productId) {
            return {
              ...shoppingCartItem,
              quantity: shoppingCartItem.quantity - 1,
            };
          }

          return shoppingCartItem;
        }),
      })
    );

    reloadPage();
  };

  const addOneItemQuantity = (id) => {
    setItems((items) => {
      return items.map((item) => {
        if (item.productId === id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }

        return item;
      });
    });
  };

  const removeOneItemQuantity = (id) => {
    setItems((items) => {
      return items.map((item) => {
        if (item.productId === id) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }

        return item;
      });
    });
  };

  const resolveDuplicatedItems = (item) => {
    return JSON.stringify({
      ...user,
      shoppingCart: shoppingCart.map((shoppingCartItem) => {
        if (shoppingCartItem.productId === item.productId) {
          return {
            ...shoppingCartItem,
            quantity: shoppingCartItem.quantity + item.quantity,
          };
        }

        return shoppingCartItem;
      }),
    });
  };

  const addItemsToShoppingCart = async (item) => {
    console.log(item);
    await localStorage.setItem(
      "@App:user",
      user?.shoppingCart.filter(
        (shoppingItem) => shoppingItem.productId === item.productId
      ).length >= 1
        ? resolveDuplicatedItems(item)
        : JSON.stringify({
            ...user,
            shoppingCart: [...shoppingCart, item],
          })
    );

    reloadPage();
  };

  const removeItemsFromShoppingCart = async (item) => {
    await localStorage.setItem(
      "@App:user",
      JSON.stringify({
        ...user,
        shoppingCart: shoppingCart.filter(
          (shoppingCartItem) => shoppingCartItem !== item
        ),
      })
    );

    reloadPage();
  };

  return (
    <>
      <ShoppingCartContext.Provider
        value={{
          setShoppingCart,
          shoppingCart,
          items,
          setItems,
          addItemsToShoppingCart,
          removeItemsFromShoppingCart,
          addOneItemQuantity,
          removeOneItemQuantity,
          shoppingCartTotalSpendWithoutDiscounts,
          shoppingCartTotalDiscounts,
          shoppingCartTotalSpendWithDiscounts,
          addOneItemQuantityToChart,
          removeOneItemQuantityToChart,
        }}
      >
        {children}
      </ShoppingCartContext.Provider>
    </>
  );
};

export function useShoppingCart() {
  const context = React.useContext(ShoppingCartContext);

  return context;
}

export default ShoppingCartContext;
