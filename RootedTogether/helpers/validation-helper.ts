import { Timestamp } from "firebase/firestore";

export const stringExists = (input: string | undefined): boolean => {
    return (input !== undefined && input !== null && input?.length > 0);
}

export const sortStringPair = (pair: [string, string]): [string, string] => {
    return [...pair].sort((a, b) => a.localeCompare(b)) as [string, string];
}

export const hasMatchingStringPair = (
    current: [string, string],
    expected: [string, string],
): boolean => {
    const currentSorted = sortStringPair(current);
    const expectedSorted = sortStringPair(expected);

    return (
        currentSorted[0] === expectedSorted[0] &&
        currentSorted[1] === expectedSorted[1]
    );
}

export const validateDistinctStringPair = (
    pair: [string, string],
    pairName: string,
): string | undefined => {
    if (!pair[0] || !pair[1]) {
        return `${pairName} must contain two values.`;
    }

    if (pair[0] === pair[1]) {
        return `${pairName} must contain two different values.`;
    }

    return undefined;
}

export const isToday = (timestamp?: Timestamp) => {
  if (!timestamp) return false;

  const date = timestamp.toDate();
  const now = new Date();

  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
};