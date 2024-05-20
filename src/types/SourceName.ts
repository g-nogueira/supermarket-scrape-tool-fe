import * as Either from "fp-ts/lib/Either";

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
