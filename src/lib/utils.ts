import { ApolloError } from "@apollo/client"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseError(error: ApolloError) {
  try {
    const errorMessage = JSON.parse(error.message)[0].message
    return errorMessage
  } catch (err) { }
}