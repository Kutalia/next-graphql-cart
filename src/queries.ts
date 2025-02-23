import { gql } from "./__generated__"

export const GET_PRODUCTS = gql(`
  query GetProducts {
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

export const REGISTER_VISITOR = gql(`
  mutation RegisterVisitor {
      register {
        token
        isActive
      }
    }
`)

export const ADD_ITEM = gql(`
  mutation AddItem($addItemArgs: AddItemArgs!) {
    addItem(input: $addItemArgs) {
      _id
      items {
        _id
        cartId
        product {
          _id
          title
          cost
          availableQuantity
          isArchived
          createdAt
          updatedAt
        }
        quantity
        updatedAt
        addedAt
      }
      createdAt
      updatedAt
    }
  }
`)