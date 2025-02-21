'use server'

interface PriceFieldResponse {
    priceFrom: ErrorResponse;
    priceTo: ErrorResponse;
}
export const validatePrice = async (prev: any, formData: FormData): Promise<PriceFieldResponse> => {
    const priceFrom = formData.get('priceFrom')?.toString() || "";
    const priceTo = formData.get('priceTo')?.toString() || "";
    const result: PriceFieldResponse = {
        priceFrom: {
            error: false,
            value: priceFrom
        },
        priceTo: {
            error: false,
            value: priceTo
        }
    }

    const isValidNumber = (value: string) => /^[0-9]+(\.[0-9]+)?$/.test(value);
    if (priceFrom !== "" && isValidNumber(priceFrom)) {
        result.priceFrom.error = true;
        result.priceFrom.message = ""
    }
    return result;
}