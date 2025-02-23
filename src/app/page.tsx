"use client"

import { ProductsTable } from "@/components/products-table";
import { SkeletonTable } from "@/components/skeleton-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CART_ITEM_SUBSCRIPTION, GET_PRODUCTS } from "@/queries";
import { useQuery, useSubscription } from "@apollo/client";

export default function Home() {
  const { loading: productsLoading, data: productsData } = useQuery(GET_PRODUCTS);
  const { data: subscriptionData, loading: subscriptionLoading } = useSubscription(CART_ITEM_SUBSCRIPTION)

  if (subscriptionData) {
    console.log('SUBSCRIPTION_DATA', subscriptionData)
  }

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

      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        Made by Kote Kutalia &#169; {(new Date()).getFullYear()}
      </footer>
    </div>
  );
}
