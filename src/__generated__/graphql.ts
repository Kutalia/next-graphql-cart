/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type AddItemArgs = {
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};

export type Cart = {
  __typename?: 'Cart';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['String']['output'];
  hash: Scalars['String']['output'];
  items: Array<CartItem>;
  updatedAt: Scalars['String']['output'];
};

export type CartItem = {
  __typename?: 'CartItem';
  _id: Scalars['ID']['output'];
  addedAt: Scalars['String']['output'];
  cartId: Scalars['ID']['output'];
  product: Product;
  quantity: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};

export enum CartItemEvent {
  ItemOutOfStock = 'ITEM_OUT_OF_STOCK',
  ItemQuantityUpdated = 'ITEM_QUANTITY_UPDATED',
}

export type CartItemMessage = {
  __typename?: 'CartItemMessage';
  event: CartItemEvent;
  payload: CartItem;
};

export type GetProductsData = {
  __typename?: 'GetProductsData';
  products: Array<Product>;
  total: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addItem: Cart;
  register: Visitor;
  removeItem: Cart;
  updateItemQuantity: Cart;
};

export type MutationAddItemArgs = {
  input: AddItemArgs;
};

export type MutationRemoveItemArgs = {
  input: RemoveItemArgs;
};

export type MutationUpdateItemQuantityArgs = {
  input: UpdateItemQuantityArgs;
};

export type Product = {
  __typename?: 'Product';
  _id: Scalars['ID']['output'];
  availableQuantity: Scalars['Int']['output'];
  cost: Scalars['Float']['output'];
  createdAt: Scalars['String']['output'];
  isArchived: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getCart: Cart;
  getProducts: GetProductsData;
};

export type RemoveItemArgs = {
  cartItemId: Scalars['ID']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  cartItemUpdate: CartItemMessage;
};

export type UpdateItemQuantityArgs = {
  cartItemId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};

export type Visitor = {
  __typename?: 'Visitor';
  _id: Scalars['ID']['output'];
  cartId: Scalars['ID']['output'];
  createdAt: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  token: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type GetProductsQueryVariables = Exact<{ [key: string]: never }>;

export type GetProductsQuery = {
  __typename?: 'Query';
  getProducts: {
    __typename?: 'GetProductsData';
    products: Array<{
      __typename?: 'Product';
      _id: string;
      title: string;
      cost: number;
      availableQuantity: number;
      isArchived: boolean;
      createdAt: string;
      updatedAt: string;
    }>;
  };
};

export type GetCartQueryVariables = Exact<{ [key: string]: never }>;

export type GetCartQuery = {
  __typename?: 'Query';
  getCart: {
    __typename?: 'Cart';
    _id: string;
    createdAt: string;
    updatedAt: string;
    items: Array<{
      __typename?: 'CartItem';
      _id: string;
      cartId: string;
      quantity: number;
      updatedAt: string;
      addedAt: string;
      product: {
        __typename?: 'Product';
        _id: string;
        title: string;
        cost: number;
        availableQuantity: number;
        isArchived: boolean;
        createdAt: string;
        updatedAt: string;
      };
    }>;
  };
};

export type OnCartItemUpdateSubscriptionVariables = Exact<{
  [key: string]: never;
}>;

export type OnCartItemUpdateSubscription = {
  __typename?: 'Subscription';
  cartItemUpdate: {
    __typename?: 'CartItemMessage';
    event: CartItemEvent;
    payload: {
      __typename?: 'CartItem';
      _id: string;
      cartId: string;
      quantity: number;
      addedAt: string;
      updatedAt: string;
      product: {
        __typename?: 'Product';
        _id: string;
        title: string;
        cost: number;
        availableQuantity: number;
        isArchived: boolean;
        createdAt: string;
        updatedAt: string;
      };
    };
  };
};

export type RegisterVisitorMutationVariables = Exact<{ [key: string]: never }>;

export type RegisterVisitorMutation = {
  __typename?: 'Mutation';
  register: { __typename?: 'Visitor'; token: string; isActive: boolean };
};

export type AddItemMutationVariables = Exact<{
  addItemArgs: AddItemArgs;
}>;

export type AddItemMutation = {
  __typename?: 'Mutation';
  addItem: {
    __typename?: 'Cart';
    _id: string;
    createdAt: string;
    updatedAt: string;
    items: Array<{
      __typename?: 'CartItem';
      _id: string;
      cartId: string;
      quantity: number;
      updatedAt: string;
      addedAt: string;
      product: {
        __typename?: 'Product';
        _id: string;
        title: string;
        cost: number;
        availableQuantity: number;
        isArchived: boolean;
        createdAt: string;
        updatedAt: string;
      };
    }>;
  };
};

export type UpdateItemQuantityMutationVariables = Exact<{
  updateItemQuantityArgs: UpdateItemQuantityArgs;
}>;

export type UpdateItemQuantityMutation = {
  __typename?: 'Mutation';
  updateItemQuantity: {
    __typename?: 'Cart';
    _id: string;
    createdAt: string;
    updatedAt: string;
    items: Array<{
      __typename?: 'CartItem';
      _id: string;
      cartId: string;
      quantity: number;
      updatedAt: string;
      addedAt: string;
      product: {
        __typename?: 'Product';
        _id: string;
        title: string;
        cost: number;
        availableQuantity: number;
        isArchived: boolean;
        createdAt: string;
        updatedAt: string;
      };
    }>;
  };
};

export type RemoveItemMutationVariables = Exact<{
  removeItemArgs: RemoveItemArgs;
}>;

export type RemoveItemMutation = {
  __typename?: 'Mutation';
  removeItem: {
    __typename?: 'Cart';
    _id: string;
    createdAt: string;
    updatedAt: string;
    items: Array<{
      __typename?: 'CartItem';
      _id: string;
      cartId: string;
      quantity: number;
      updatedAt: string;
      addedAt: string;
      product: {
        __typename?: 'Product';
        _id: string;
        title: string;
        cost: number;
        availableQuantity: number;
        isArchived: boolean;
        createdAt: string;
        updatedAt: string;
      };
    }>;
  };
};

export const GetProductsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetProducts' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getProducts' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'products' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'cost' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'availableQuantity' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'isArchived' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'updatedAt' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetProductsQuery, GetProductsQueryVariables>;
export const GetCartDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCart' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getCart' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'cartId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'product' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: '_id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'title' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'cost' },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'availableQuantity',
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'isArchived' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'createdAt' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'updatedAt' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'quantity' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'updatedAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'addedAt' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCartQuery, GetCartQueryVariables>;
export const OnCartItemUpdateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'subscription',
      name: { kind: 'Name', value: 'OnCartItemUpdate' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cartItemUpdate' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'event' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'payload' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'cartId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'product' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: '_id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'title' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'cost' },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'availableQuantity',
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'isArchived' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'createdAt' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'updatedAt' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'quantity' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'addedAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'updatedAt' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  OnCartItemUpdateSubscription,
  OnCartItemUpdateSubscriptionVariables
>;
export const RegisterVisitorDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RegisterVisitor' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'register' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'token' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isActive' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RegisterVisitorMutation,
  RegisterVisitorMutationVariables
>;
export const AddItemDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AddItem' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'addItemArgs' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'AddItemArgs' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'addItem' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'addItemArgs' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'cartId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'product' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: '_id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'title' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'cost' },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'availableQuantity',
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'isArchived' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'createdAt' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'updatedAt' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'quantity' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'updatedAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'addedAt' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AddItemMutation, AddItemMutationVariables>;
export const UpdateItemQuantityDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateItemQuantity' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'updateItemQuantityArgs' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdateItemQuantityArgs' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateItemQuantity' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'updateItemQuantityArgs' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'cartId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'product' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: '_id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'title' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'cost' },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'availableQuantity',
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'isArchived' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'createdAt' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'updatedAt' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'quantity' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'updatedAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'addedAt' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateItemQuantityMutation,
  UpdateItemQuantityMutationVariables
>;
export const RemoveItemDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RemoveItem' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'removeItemArgs' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'RemoveItemArgs' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'removeItem' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'removeItemArgs' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'cartId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'product' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: '_id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'title' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'cost' },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'availableQuantity',
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'isArchived' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'createdAt' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'updatedAt' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'quantity' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'updatedAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'addedAt' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RemoveItemMutation, RemoveItemMutationVariables>;
