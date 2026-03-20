export interface AffirmationUser {
    id: string | undefined;
    uid: string;
    name: string;
    email: string;
    first: string;
    last: string;
}

export const AffirmationUserMap = (data: any, id: string): AffirmationUser => {
    return {
        id: id,
        uid: data.uid,
        name: data.name,
        first: data.first,
        last: data.last,
        email: data.email,
    };
}