export interface Address {
    streetNumber: number | undefined | null,
    streetName: string | undefined | null,
    suburb: string | undefined | null,
    city: string | undefined | null,
    postalCode: number | undefined | null,
    customerId?: number;
}
