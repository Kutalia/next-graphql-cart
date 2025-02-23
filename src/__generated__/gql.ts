/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetProducts {\n    getProducts {\n      products {\n        _id\n        title\n        cost\n        availableQuantity\n        isArchived\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": typeof types.GetProductsDocument,
    "\n  query GetCart {\n    getCart {\n      _id\n      items {\n        _id\n        cartId\n        product {\n          _id\n          title\n          cost\n          availableQuantity\n          isArchived\n          createdAt\n          updatedAt\n        }\n        quantity\n        updatedAt\n        addedAt\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetCartDocument,
    "\n  subscription OnCartItemUpdate {\n    cartItemUpdate {\n      event\n      payload {\n        _id\n        cartId\n        product {\n          _id\n          title\n          cost\n          availableQuantity\n          isArchived\n          createdAt\n          updatedAt\n        }\n        quantity\n        addedAt\n        updatedAt\n      }\n    }\n  }\n": typeof types.OnCartItemUpdateDocument,
    "\n  mutation RegisterVisitor {\n      register {\n        token\n        isActive\n      }\n    }\n": typeof types.RegisterVisitorDocument,
    "\n  mutation AddItem($addItemArgs: AddItemArgs!) {\n    addItem(input: $addItemArgs) {\n      _id\n      items {\n        _id\n        cartId\n        product {\n          _id\n          title\n          cost\n          availableQuantity\n          isArchived\n          createdAt\n          updatedAt\n        }\n        quantity\n        updatedAt\n        addedAt\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.AddItemDocument,
};
const documents: Documents = {
    "\n  query GetProducts {\n    getProducts {\n      products {\n        _id\n        title\n        cost\n        availableQuantity\n        isArchived\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": types.GetProductsDocument,
    "\n  query GetCart {\n    getCart {\n      _id\n      items {\n        _id\n        cartId\n        product {\n          _id\n          title\n          cost\n          availableQuantity\n          isArchived\n          createdAt\n          updatedAt\n        }\n        quantity\n        updatedAt\n        addedAt\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetCartDocument,
    "\n  subscription OnCartItemUpdate {\n    cartItemUpdate {\n      event\n      payload {\n        _id\n        cartId\n        product {\n          _id\n          title\n          cost\n          availableQuantity\n          isArchived\n          createdAt\n          updatedAt\n        }\n        quantity\n        addedAt\n        updatedAt\n      }\n    }\n  }\n": types.OnCartItemUpdateDocument,
    "\n  mutation RegisterVisitor {\n      register {\n        token\n        isActive\n      }\n    }\n": types.RegisterVisitorDocument,
    "\n  mutation AddItem($addItemArgs: AddItemArgs!) {\n    addItem(input: $addItemArgs) {\n      _id\n      items {\n        _id\n        cartId\n        product {\n          _id\n          title\n          cost\n          availableQuantity\n          isArchived\n          createdAt\n          updatedAt\n        }\n        quantity\n        updatedAt\n        addedAt\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.AddItemDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetProducts {\n    getProducts {\n      products {\n        _id\n        title\n        cost\n        availableQuantity\n        isArchived\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetProducts {\n    getProducts {\n      products {\n        _id\n        title\n        cost\n        availableQuantity\n        isArchived\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCart {\n    getCart {\n      _id\n      items {\n        _id\n        cartId\n        product {\n          _id\n          title\n          cost\n          availableQuantity\n          isArchived\n          createdAt\n          updatedAt\n        }\n        quantity\n        updatedAt\n        addedAt\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetCart {\n    getCart {\n      _id\n      items {\n        _id\n        cartId\n        product {\n          _id\n          title\n          cost\n          availableQuantity\n          isArchived\n          createdAt\n          updatedAt\n        }\n        quantity\n        updatedAt\n        addedAt\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription OnCartItemUpdate {\n    cartItemUpdate {\n      event\n      payload {\n        _id\n        cartId\n        product {\n          _id\n          title\n          cost\n          availableQuantity\n          isArchived\n          createdAt\n          updatedAt\n        }\n        quantity\n        addedAt\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription OnCartItemUpdate {\n    cartItemUpdate {\n      event\n      payload {\n        _id\n        cartId\n        product {\n          _id\n          title\n          cost\n          availableQuantity\n          isArchived\n          createdAt\n          updatedAt\n        }\n        quantity\n        addedAt\n        updatedAt\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RegisterVisitor {\n      register {\n        token\n        isActive\n      }\n    }\n"): (typeof documents)["\n  mutation RegisterVisitor {\n      register {\n        token\n        isActive\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddItem($addItemArgs: AddItemArgs!) {\n    addItem(input: $addItemArgs) {\n      _id\n      items {\n        _id\n        cartId\n        product {\n          _id\n          title\n          cost\n          availableQuantity\n          isArchived\n          createdAt\n          updatedAt\n        }\n        quantity\n        updatedAt\n        addedAt\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation AddItem($addItemArgs: AddItemArgs!) {\n    addItem(input: $addItemArgs) {\n      _id\n      items {\n        _id\n        cartId\n        product {\n          _id\n          title\n          cost\n          availableQuantity\n          isArchived\n          createdAt\n          updatedAt\n        }\n        quantity\n        updatedAt\n        addedAt\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;