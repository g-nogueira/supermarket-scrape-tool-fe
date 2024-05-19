import * as Either from "fp-ts/lib/Either";
import { pipe } from "fp-ts/function";
import * as Array from "fp-ts/Array";
import type { PriceHistoryDto, ProductDto, SourceDto } from "../clients/ProductDto";
import { sequenceT } from "fp-ts/Apply";
import { sourceName, type SourceName } from "./SourceName";

export enum ProductPriceUnit {
    Kg,
    Unit,
    Liter,
    Rolls
}

const productPriceUnit = {
    ofString: (priceUnitString: string): Either.Either<string, ProductPriceUnit> => {
        switch (priceUnitString) {
            case "kg":
                return Either.right(ProductPriceUnit.Kg);
            case "unit":
            case "un":
                return Either.right(ProductPriceUnit.Unit);
            case "ltr":
                return Either.right(ProductPriceUnit.Liter);
            case "ro":
                return Either.right(ProductPriceUnit.Rolls);
            default:
                return Either.left(`Unexpected PriceUnit. Expected "kg", "unit", "ltr", "ro". Got ${priceUnitString}.`);
        }
    },
    toString: (priceUnit: ProductPriceUnit) => {
        switch (priceUnit) {
            case ProductPriceUnit.Kg:
                return "kg";
            case ProductPriceUnit.Unit:
                return "unit";
        }
    }
};

export type ProductSource = {
    productId: string;
    name: SourceName;
    productUrl: string;
    productImageUrl: string;
};

const productSource = {
    ofDto: (sourceDto: SourceDto): Either.Either<string, ProductSource> => {
        const name: Either.Either<string, SourceName> = sourceName.ofString(sourceDto.name);

        const mkProductSource = (name: SourceName): ProductSource => ({
            productId: sourceDto.productId,
            name: name,
            productUrl: sourceDto.productUrl,
            productImageUrl: sourceDto.productImageUrl
        });

        return pipe(
            name,
            Either.map(name => mkProductSource(name))
        );
    }
};

export type ProductPriceHistory = {
    date: Date;
    price: number;
    priceUnit: ProductPriceUnit;
    source: ProductSource;
};

const productPriceHistory = {
    ofDto: (priceHistoryDto: PriceHistoryDto): Either.Either<string, ProductPriceHistory> => {

        const priceUnit = productPriceUnit.ofString(priceHistoryDto.priceUnit);

        const source = productSource.ofDto(priceHistoryDto.source);

        return pipe(
            sequenceT(Either.Apply)(priceUnit, source),
            Either.map(([priceUnit, source]) => ({
                date: new Date(priceHistoryDto.date),
                price: priceHistoryDto.price,
                priceUnit: priceUnit,
                source: source
            }))
        );
    }
};


export type ProductDetail = {
    id: string;
    name: string;
    brand: string;
    priceHistory: ProductPriceHistory[];
    sources: ProductSource[];
    ean: string;
};

export const productDetail = {
    ofDto: (productDto: ProductDto): Either.Either<string, ProductDetail> => {
        const mkProductDetail = (dto: ProductDto, priceHistory: ProductPriceHistory[], sources: ProductSource[]): ProductDetail => ({
            id: dto.id,
            name: dto.name,
            brand: dto.brand,
            priceHistory: priceHistory,
            sources: sources,
            ean: dto.ean
        });

        const sources = pipe(
            productDto.sources,
            Array.map(source => productSource.ofDto(source)),
            Array.sequence(Either.Applicative));

        const priceHistory = pipe(
            productDto.priceHistory,
            Array.map(priceHistoryDto => productPriceHistory.ofDto(priceHistoryDto)),
            Array.sequence(Either.Applicative));

        return pipe(
            sequenceT(Either.Apply)(priceHistory, sources),
            Either.map(([a, b]) => mkProductDetail(productDto, a, b))
        );
    }
};