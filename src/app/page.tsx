"use client"

import { CartItemEvent } from "@/__generated__/graphql";
import { NotificationDrawer } from "@/components/notification-drawer";
import { ProductsTable } from "@/components/products-table";
import { SkeletonTable } from "@/components/skeleton-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CART_ITEM_SUBSCRIPTION, GET_CART, GET_PRODUCTS } from "@/queries";
import { useQuery, useSubscription } from "@apollo/client";
import { useEffect } from "react";

export default function Home() {
  const { loading: productsLoading, data: productsData } = useQuery(GET_PRODUCTS);
  const { loading: cartLoading, data: cartData } = useQuery(GET_CART)

  const { data: subscriptionData, loading: subscriptionLoading } = useSubscription(CART_ITEM_SUBSCRIPTION, {
    onData: ({ data, client }) => {
      if (!data?.data?.cartItemUpdate) {
        return
      }

      const affectedItem = data.data.cartItemUpdate.payload
      const affectedProduct = data.data.cartItemUpdate.payload.product
      const eventType = data.data.cartItemUpdate.event

      client.cache.updateQuery({ query: GET_PRODUCTS }, (getProductsQueryData) => {
        if (!getProductsQueryData) {
          return getProductsQueryData
        }

        const products = getProductsQueryData.getProducts.products
        const affectedProductIndex = products.findIndex(({ _id }) => _id === affectedProduct._id)

        const newData = {
          ...getProductsQueryData,
          getProducts: {
            ...getProductsQueryData.getProducts,
            products: [
              ...products.slice(0, affectedProductIndex),
              {
                ...products[affectedProductIndex],
                availableQuantity: eventType === CartItemEvent.ItemOutOfStock ? 0 : affectedProduct.availableQuantity
              },
              ...products.slice(affectedProductIndex + 1)
            ]
          }
        }

        console.log('PRODUCTS_UPDATED_BY_SUBSCRIPTION', { prevData: getProductsQueryData, newData })

        return newData
      })

      client.cache.updateQuery({ query: GET_CART }, (getCartQueryData) => {
        if (!getCartQueryData) {
          return getCartQueryData
        }

        const items = getCartQueryData.getCart.items
        const affectedItemIndex = items.findIndex(({ _id }) => _id === affectedItem._id)

        const newData = {
          ...getCartQueryData,
          getCart: {
            ...getCartQueryData.getCart,
            items: eventType === CartItemEvent.ItemOutOfStock
              ? items.filter(({ _id }) => _id !== affectedItem._id)
              : [
                ...items.slice(0, affectedItemIndex),
                affectedItem,
                ...items.slice(affectedItemIndex + 1)
              ]
          }
        }

        console.log('ITEMS_UPDATED_BY_SUBSCRIPTION', { prevData: getCartQueryData, newData })

        return newData
      })
    }
  })

  useEffect(() => {
    if (cartData) {
      console.log('CART_DATA', cartData)
    }
  }, [cartData])

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        {
          productsLoading || !productsData?.getProducts?.products
            ? <SkeletonTable />
            : <Tabs defaultValue="products">
              <TabsList>
                <TabsTrigger value="products">All Products</TabsTrigger>
                <TabsTrigger value="cart">Cart</TabsTrigger>
              </TabsList>
              <TabsContent value="products">
                <ProductsTable data={productsData?.getProducts?.products} />
              </TabsContent>
              <TabsContent value="cart">
                <ProductsTable data={productsData?.getProducts?.products} />
              </TabsContent>
            </Tabs>
        }

        <NotificationDrawer cartItemUpdate={subscriptionData?.cartItemUpdate} />

      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        Made by Kote Kutalia &#169; {(new Date()).getFullYear()}
      </footer>
    </div>
  );
}
