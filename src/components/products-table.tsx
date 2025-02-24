'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ModifyCartDialog } from './modify-cart-dialog';
import { TableProduct } from '@/types';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CART, GET_PRODUCTS, REMOVE_ITEM } from '@/queries';
import { useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { parseError } from '@/lib/utils';
import { cartRemoveItemSchema } from '@/lib/zod-schemas';

export const columns: ColumnDef<TableProduct>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue('title')}</div>,
  },
  {
    accessorKey: 'cost',
    header: () => <div className="text-right">Cost</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('cost'));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: 'availableQuantity',
    header: () => <div className="text-right">In Stock</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {row.getValue('availableQuantity')}
        </div>
      );
    },
  },
  {
    accessorKey: 'quantity',
    header: () => <div className="text-right">In Cart</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">{row.getValue('quantity')}</div>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: function CellComp({ row }) {
      const product = row.original;

      const [removeItem] = useMutation(REMOVE_ITEM, {
        variables: {
          removeItemArgs: { cartItemId: row.original.cartItemId as string },
        },
        onCompleted: (data) => {
          console.log('REMOVE_ITEM_DATA', data);
          toast('Product has been successfully removed from your cart');
        },
        onError: (error) => {
          const errorMessage = parseError(error);
          if (errorMessage) {
            toast(errorMessage);
          }
        },
      });

      const handleRemoveItem = () => {
        const output = cartRemoveItemSchema.safeParse({
          cartItemId: row.original.cartItemId,
        });
        if (!output.success) {
          toast('Incorrect cart id');
        } else {
          removeItem();
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.productId)}
              className="cursor-pointer"
            >
              Copy product ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <ModifyCartDialog product={product} />
            </DropdownMenuItem>
            {product.cartItemId && (
              <DropdownMenuItem onClick={handleRemoveItem}>
                Remove from cart
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

interface Props {
  sortByInCart?: boolean;
}

export function ProductsTable({ sortByInCart }: Props) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  // Using apollo as a state management tool in this case, given that products should be already fetched
  const { data: productsData } = useQuery(GET_PRODUCTS, {
    fetchPolicy: 'cache-only',
  });

  // Gets automatically updated after item add/edit mutations, no manual cache management needed
  const { data: cartData } = useQuery(GET_CART, {
    fetchPolicy: 'cache-only',
  });

  const data = useMemo(() => {
    const products = productsData?.getProducts?.products;
    const cartItems = cartData?.getCart?.items;

    let mergedData: Array<TableProduct> = [];

    if (!products) {
      return mergedData;
    }

    mergedData = products.map(
      ({ _id: productId, title, cost, availableQuantity }) => ({
        productId,
        title,
        cost,
        availableQuantity,
      }),
    );

    cartItems?.forEach(
      ({ _id: cartItemId, quantity, product: { _id: productId } }) => {
        const index = products.findIndex(({ _id }) => _id === productId);
        mergedData[index] = { ...mergedData[index], quantity, cartItemId };
      },
    );

    return mergedData;
  }, [productsData, cartData]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
  });

  useEffect(() => {
    if (sortByInCart) {
      table
        .getColumn('quantity')
        ?.toggleSorting(table.getColumn('quantity')?.getIsSorted() === 'asc');
    } else {
      table.resetSorting();
    }
  }, [sortByInCart, table]);

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter products..."
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('title')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
