// fonction pour arrondir un chiffre à X décimales
export function round(value, précision) {
    const multiplier = Math.pow(10, précision || 0);
    return Math.round(value * multiplier) / multiplier;
}