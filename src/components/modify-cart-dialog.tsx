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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ADD_ITEM, GET_PRODUCTS } from "@/queries"
import { Product } from "@/types"
import { useMutation, useQuery } from "@apollo/client"
import { useEffect, useMemo, useRef, useState } from "react"
import { NumberInput } from "./number-input"
import { cartAddItemSchema } from "@/lib/zod-schemas"

interface Props {
  productId: string
  isCartEdit?: boolean
}

export function ModifyCartDialog({ productId, isCartEdit }: Props) {
  const [quantity, setQuantity] = useState(1)
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState(false)

  // Using apollo as a state management tool in this case, given that products should be already fetched
  const { data: productsData } = useQuery(GET_PRODUCTS, {
    fetchPolicy: 'cache-only',
  });

  const [addItem, { loading: addItemLoading, error: addItemError, data: addItemData }] = useMutation(ADD_ITEM, {
    variables: { addItemArgs: { productId, quantity } },
    onCompleted: (data) => {
      console.log('ADD_ITEM_DATA', data)
      setIsOpen(false)
    }
  })

  useEffect(() => {
    if (!isCartEdit) {
      const output = cartAddItemSchema.safeParse({ productId: productId, quantity })
      setError(!output.success)
    }
  }, [quantity, productId, isCartEdit])

  const product = useMemo(() => {
    if (!productsData?.getProducts?.products) {
      return null
    }

    return productsData.getProducts.products.find(({ _id }) => _id === productId)
  }, [productsData, productId])

  if (!product) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="relative flex select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0 w-full">
        Add to cart
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isCartEdit ? 'Edit product in cart' : 'Add product to cart'}</DialogTitle>
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
              min={1}
              max={product.availableQuantity}
              value={quantity}
              ref={inputRef}
              onValueChange={(val) => setQuantity(val || 0)}
            />
          </div>
          {error && <p className="text-sm text-red-500">Can't save changes. Check item quantity</p>}
        </div>
        <DialogFooter>
          <Button onClick={() => addItem()} disabled={error}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
