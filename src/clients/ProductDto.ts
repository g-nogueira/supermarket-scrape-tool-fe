// dto
// {
//     "id": "2615982000000",
//     "status": "ok",
//     "name": "Banana",
//     "brand": "Continente",
//     "priceHistory": [
//     {
//         "date": "2024-04-22T20:47:10.4570147+01:00",
//         "price": 1.25,
//         "priceUnit": "kg",
//         "source": {
//         "productId": "2597619",
//         "name": "continente",
//         "productUrl": "https://www.continente.pt/https://www.continente.pt/produto/banana-continente-2597619.html",
//         "productImageUrl": "https://www.continente.pt/dw/image/v2/BDVS_PRD/on/demandware.static/-/Sites-col-master-catalog/default/dwcd554331/images/col/259/2597619-frente.jpg?sw=280&amp;sh=280"
//         }
//     }
//     ],
//     "sources": [
//     {
//         "productId": "2597619",
//         "name": "continente",
//         "productUrl": "https://www.continente.pt/https://www.continente.pt/produto/banana-continente-2597619.html",
//         "productImageUrl": "https://www.continente.pt/dw/image/v2/BDVS_PRD/on/demandware.static/-/Sites-col-master-catalog/default/dwcd554331/images/col/259/2597619-frente.jpg?sw=280&amp;sh=280"
//     }
//     ],
//     "ean": "2615982000000"
// }

export type SourceDto = {
    productId: string;
    name: string;
    productUrl: string;
    productImageUrl: string;
};

export type PriceHistoryDto = {
    date: string;
    price: number;
    priceUnit: string;
    source: SourceDto;
};

export type ProductDto = {
    id: string;
    status: string;
    name: string;
    brand: string;
    priceHistory: PriceHistoryDto[];
    sources: SourceDto[];
    ean: string;
};