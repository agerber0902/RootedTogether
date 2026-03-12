export interface AffirmationUser {
    id: string | undefined;
    uid: string;
    name: string;
    first: string;
    last: string;
    displayNameForPartner: string;
}

export const AffirmationUserMap = (data: any, id: string): AffirmationUser => {
    return {
        id: id,
        uid: data.uid,
        name: data.name,
        first: data.first,
        last: data.last,
        displayNameForPartner: data.displayNameForPartner
    };
}