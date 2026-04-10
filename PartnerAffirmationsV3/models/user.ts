export interface AffirmationUser {
    id?: string;
    uid: string;
    name: string;
    email: string;
    first: string;
    last: string;
}

export type CreateAffirmationUser = Omit<AffirmationUser, "id">;
export type UpdateAffirmationUser =
    Partial<CreateAffirmationUser> & Pick<AffirmationUser, "id">;

type AffirmationUserRaw = Omit<AffirmationUser, "id">;

export const AffirmationUserMap = (
    data: AffirmationUserRaw,
    id: string,
): AffirmationUser => {
    return {
        id,
        uid: typeof data.uid === "string" ? data.uid : "",
        name: typeof data.name === "string" ? data.name : "",
        first: typeof data.first === "string" ? data.first : "",
        last: typeof data.last === "string" ? data.last : "",
        email: typeof data.email === "string" ? data.email : "",
    };
};