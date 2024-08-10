export interface Customer {
    customerId: string,
    firstName: string | undefined | null,
    lastName: string | undefined | null,
    email: string | undefined | null,
    password: string | undefined | null,
    mobileNumber: string,
    dateOfBirth: string
};