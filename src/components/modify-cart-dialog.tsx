"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { cartAddItemSchema, cartUpdateItemQuantitySchema } from "@/lib/zod-schemas"
import { ADD_ITEM, UPDATE_ITEM_QUANTITY } from "@/queries"
import { TableProduct } from "@/types"
import { useMutation } from "@apollo/client"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { NumberInput } from "./number-input"

interface Props {
  product: TableProduct
  cartItemId?: string | undefined
}

export function ModifyCartDialog({ product }: Props) {
  const [quantity, setQuantity] = useState(product.quantity || 1)
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState(false)

  const [addItem] = useMutation(ADD_ITEM, {
    variables: { addItemArgs: { productId: product.productId, quantity } },
    onCompleted: (data) => {
      console.log('ADD_ITEM_DATA', data)
      setIsOpen(false)
      toast('Product has been successfully added')
    },
    onError: (error) => {
      try {
        const errorMessage = JSON.parse(error.message)[0].message
        toast(errorMessage)
      } catch (err) { }
    }
  })

  const [updateItem] = useMutation(UPDATE_ITEM_QUANTITY, {
    variables: { updateItemQuantityArgs: { cartItemId: product.cartItemId as string, quantity } },
    onCompleted: (data) => {
      console.log('UPDATE_ITEM_QUANTITY_DATA', data)
      setIsOpen(false)
      toast('Cart item quantity has been successfully updated')
    },
    onError: (error) => {
      try {
        const errorMessage = JSON.parse(error.message)[0].message
        toast(errorMessage)
      } catch (err) { }
    }
  })

  useEffect(() => {
    if (!product.cartItemId) {
      const output = cartAddItemSchema.safeParse({ productId: product.productId, quantity })
      setError(!output.success)
    } else {
      const output = cartUpdateItemQuantitySchema.safeParse({ cartItemId: product.cartItemId, quantity })
      setError(!output.success)
    }
  }, [quantity, product])

  if (!product || !product.availableQuantity) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="relative flex select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0 w-full">
        {!product.cartItemId ? 'Add to cart' : 'Edit cart quantity'}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{product.cartItemId ? 'Edit product in cart' : 'Add product to cart'}</DialogTitle>
          <DialogDescription>
            Make changes to the product quantity in your cart. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <NumberInput
              id="quantity"
              min={product.availableQuantity ? 1 : 0}
              max={product.availableQuantity}
              value={quantity}
              ref={inputRef}
              onValueChange={(val) => setQuantity(val || 0)}
            />
          </div>
          {error && <p className="text-sm text-red-500">Can't save changes. Check item quantity</p>}
        </div>
        <DialogFooter>
          <Button onClick={() => product.cartItemId ? updateItem() : addItem()} disabled={error}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
