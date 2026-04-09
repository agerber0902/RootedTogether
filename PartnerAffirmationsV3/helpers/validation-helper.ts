export const stringExists = (input: string | undefined): boolean => {
    return (input !== undefined && input !== null && input?.length > 0);
}