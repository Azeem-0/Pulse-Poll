export const findMostFrequentCount = (arr: string[]): number => {
    if (arr.length === 0) return 0;

    const frequencyMap = new Map<string, number>();

    arr.forEach(str => frequencyMap.set(str, (frequencyMap.get(str) || 0) + 1));

    return Math.max(...frequencyMap.values());
};