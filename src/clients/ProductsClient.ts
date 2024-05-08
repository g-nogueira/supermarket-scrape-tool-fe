import type { ProductDto } from "./ProductDto";
import * as Either from "fp-ts/lib/Either";
import { pipe } from "fp-ts/function";
import * as Array from "fp-ts/Array";

// Return Either instead of throwing exceptions and use any necessary fp-ts functions
export let getProducts = async (): Promise<Either.Either<string, ProductDto[]>> => {
    try {
        let response = await fetch("http://localhost:5000/api/products/all");
        let json = await response.json();
        return Either.right(json);
    } catch (e) {
        return Either.left("Invalid JSON");
    }
}

export let getProductById = async (id: string): Promise<Either.Either<string, ProductDto>> => {
    try {
        let response = await fetch(`http://localhost:5000/api/products/${id}`);
        let json = await response.json();
        return Either.right(json);
    } catch (e) {
        return Either.left("Invalid JSON");
    }
}

export let getProductsPaginated = async (page: number, pageSize: number): Promise<Either.Either<string, ProductDto[]>> => {
    try {
        let response = await fetch(`http://localhost:5000/api/products?delegateArg0=${pageSize}&delegateArg1=${page}`);
        let json = await response.json();
        return Either.right(json);
    } catch (e) {
        return Either.left("Invalid JSON");
    }
}

