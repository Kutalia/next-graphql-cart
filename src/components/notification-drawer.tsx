"use client"

import { CartItem, CartItemEvent } from "@/__generated__/graphql"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"

interface Props {
  cartItemUpdate?: {
    event: CartItemEvent
    payload: CartItem
  } | undefined
}

export function NotificationDrawer({ cartItemUpdate }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (cartItemUpdate) {
      setIsOpen(true)
    }
  }, [cartItemUpdate])

  return <Drawer open={isOpen} onOpenChange={setIsOpen} dismissible={false}>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Item availibility data has been updated</DrawerTitle>
        <DrawerDescription>
          "{cartItemUpdate?.payload?.product?.title}" has been updated
          <br />
          {
            cartItemUpdate?.event === CartItemEvent.ItemOutOfStock
              ? 'Now it is out of stock'
              : `Stock has been changed. Now ${cartItemUpdate?.payload?.product?.availableQuantity} items are available`
          }
        </DrawerDescription>
      </DrawerHeader>
      <DrawerFooter>
        <Button onClick={() => setIsOpen(false)}>Accept</Button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
}