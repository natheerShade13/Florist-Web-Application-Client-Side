declare module 'bcryptjs' {
    export function hash(data: string, salt: string | number): Promise<string>;
    export function compare(data: string, encrypted: string): Promise<boolean>;
    // Add other functions as needed
}
