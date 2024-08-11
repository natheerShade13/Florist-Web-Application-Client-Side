export interface Customer {
    customerId: number | null,
    firstName: string | undefined | null,
    lastName: string | undefined | null,
    email: string | undefined | null,
    password: string | undefined | null,
    mobileNumber: string| null,
    dateOfBirth: string | null
};