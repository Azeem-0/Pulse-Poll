export const generateColors = (count: number) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
        const hue = (i * 360) / count;
        colors.push(`hsl(${hue}, 60%, 70%)`);
    }
    return colors;
};