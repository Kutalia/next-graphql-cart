import { gql } from "./__generated__"

export const GET_PRODUCTS = gql(`
  query GetCart {
    getProducts {
      products {
        _id
        title
        cost
        availableQuantity
        isArchived
        createdAt
        updatedAt
      }
    }
  }
`)

export const CART_ITEM_SUBSCRIPTION = gql(`
  subscription OnCartItemUpdate {
    cartItemUpdate {
      event
      payload {
        _id
        cartId
        product {
            _id
        }
        quantity
      }
    }
  }
`)