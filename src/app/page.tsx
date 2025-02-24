'use client';

import { CartItemEvent } from '@/__generated__/graphql';
import { NotificationDrawer } from '@/components/notification-drawer';
import { ProductsTable } from '@/components/products-table';
import { SkeletonTable } from '@/components/skeleton-table';
import { Toaster } from '@/components/ui/sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CART_ITEM_SUBSCRIPTION, GET_CART, GET_PRODUCTS } from '@/queries';
import { useQuery, useSubscription } from '@apollo/client';
import { useEffect, useState } from 'react';

export default function Home() {
  const { loading: productsLoading, data: productsData } =
    useQuery(GET_PRODUCTS);
  const { loading: cartLoading, data: cartData } = useQuery(GET_CART);

  const [sortByCart, setSortByCart] = useState(false);

  const { data: subscriptionData } = useSubscription(CART_ITEM_SUBSCRIPTION, {
    onData: ({ data, client }) => {
      if (!data?.data?.cartItemUpdate) {
        return;
      }

      const affectedItem = data.data.cartItemUpdate.payload;
      const affectedProduct = data.data.cartItemUpdate.payload.product;
      const eventType = data.data.cartItemUpdate.event;

      client.cache.updateQuery(
        { query: GET_PRODUCTS },
        (getProductsQueryData) => {
          if (!getProductsQueryData) {
            return getProductsQueryData;
          }

          const products = getProductsQueryData.getProducts.products;
          const affectedProductIndex = products.findIndex(
            ({ _id }) => _id === affectedProduct._id,
          );

          const newData = {
            ...getProductsQueryData,
            getProducts: {
              ...getProductsQueryData.getProducts,
              products: [
                ...products.slice(0, affectedProductIndex),
                {
                  ...products[affectedProductIndex],
                  availableQuantity:
                    eventType === CartItemEvent.ItemOutOfStock
                      ? 0
                      : affectedProduct.availableQuantity,
                },
                ...products.slice(affectedProductIndex + 1),
              ],
            },
          };

          console.log('PRODUCTS_UPDATED_BY_SUBSCRIPTION', {
            prevData: getProductsQueryData,
            newData,
          });

          return newData;
        },
      );

      client.cache.updateQuery({ query: GET_CART }, (getCartQueryData) => {
        if (!getCartQueryData) {
          return getCartQueryData;
        }

        const items = getCartQueryData.getCart.items;
        const affectedItemIndex = items.findIndex(
          ({ _id }) => _id === affectedItem._id,
        );

        const newData = {
          ...getCartQueryData,
          getCart: {
            ...getCartQueryData.getCart,
            items:
              eventType === CartItemEvent.ItemOutOfStock
                ? items.filter(({ _id }) => _id !== affectedItem._id)
                : [
                    ...items.slice(0, affectedItemIndex),
                    affectedItem,
                    ...items.slice(affectedItemIndex + 1),
                  ],
          },
        };

        console.log('ITEMS_UPDATED_BY_SUBSCRIPTION', {
          prevData: getCartQueryData,
          newData,
        });

        return newData;
      });
    },
  });

  useEffect(() => {
    if (cartData) {
      console.log('CART_DATA', cartData);
    }
  }, [cartData]);

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        {productsLoading ||
        !productsData?.getProducts?.products ||
        cartLoading ? (
          <SkeletonTable />
        ) : (
          <Tabs defaultValue="products">
            <TabsList>
              <TabsTrigger
                onClick={() => setSortByCart(false)}
                value="products"
              >
                All Products
              </TabsTrigger>
              <TabsTrigger onClick={() => setSortByCart(true)} value="cart">
                Cart
              </TabsTrigger>
            </TabsList>
            <TabsContent forceMount value="products">
              <ProductsTable sortByInCart={sortByCart} />
            </TabsContent>
          </Tabs>
        )}

        <NotificationDrawer cartItemUpdate={subscriptionData?.cartItemUpdate} />
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6">
        Made by Kote Kutalia &#169; {new Date().getFullYear()}
      </footer>

      <Toaster />
    </div>
  );
}
