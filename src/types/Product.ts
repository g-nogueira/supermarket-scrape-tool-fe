import * as Either from "fp-ts/lib/Either";
import { pipe } from "fp-ts/function";
import * as Array from "fp-ts/Array";
import type { PriceHistoryDto, ProductDto } from "../clients/ProductDto";
import { sequenceT } from "fp-ts/Apply";

export type PriceRange = [number, number];

export enum SourceName {
    PingoDoce,
    Continente,
}

export const sourceName = {
    ofString: (sourceNameString: string): Either.Either<string, SourceName> => {
        switch (sourceNameString) {
            case "pingodoce":
                return Either.right(SourceName.PingoDoce);
            case "continente":
                return Either.right(SourceName.Continente);
            default:
                return Either.left(`Unexpected SourceName. Expected "pingodoce" or "continente". Got ${sourceNameString}.`);
        }
    },
    toString: (sourceName: SourceName) => {
        switch (sourceName) {
            case SourceName.PingoDoce:
                return "Pingo Doce";
            case SourceName.Continente:
                return "Continente";
        }
    },
    toColor: (sourceName: SourceName) => {
        switch (sourceName) {
            case SourceName.PingoDoce:
                return "green";
            case SourceName.Continente:
                return "red";
        }
    }
};

export type ProductListItem = {
    id: string;
    name: string;
    brand: string;
    priceRange: PriceRange;
    sources: SourceName[];
    images: string[];
};

export const productListItem = {
    ofJson: (productDto: ProductDto): Either.Either<string, ProductListItem> => {
        try {
            const mkProductListItem = (dto: ProductDto, priceRange: PriceRange, sources: SourceName[]): ProductListItem => ({
                id: dto.id,
                name: dto.name,
                brand: dto.brand,
                priceRange: priceRange,
                sources: sources,
                images: pipe(dto.sources, Array.map(source => source.productImageUrl))
            });

            const tryParseSources = (dto: ProductDto): Either.Either<string, SourceName[]> => {
                return pipe(
                    dto.sources,
                    Array.map(source => sourceName.ofString(source.name)),
                    Array.sequence(Either.Applicative),
                    Either.map(sources => sources));
            }

            const tryGetPriceRange = (dto: ProductDto): Either.Either<string, PriceRange> => {
                switch (dto.priceHistory.length) {
                    case 0:
                        return Either.left("Unexpected priceHistory length. Expected at least 1 element. Got 0.");
                    case 1:
                        return Either.right([dto.priceHistory[0].price, dto.priceHistory[0].price]);
                    default:
                        let maxPrice = pipe(
                            dto.priceHistory,
                            Array.map(priceItem => priceItem.price),
                            prices => Math.max(...prices));

                        return Either.right(
                            [dto.priceHistory[0].price, maxPrice]);
                }
            }

            const priceRange = tryGetPriceRange(productDto);
            const sources = tryParseSources(productDto);

            return pipe(
                sequenceT(Either.Apply)(priceRange, sources),
                Either.map(([a, b]) => mkProductListItem(productDto, a, b))
            );
            
        } catch (error) {
            if (error instanceof Error) {
                return Either.left(error.message);
            } else {
                return Either.left('An unknown error occurred');
            }
        }
    }
};