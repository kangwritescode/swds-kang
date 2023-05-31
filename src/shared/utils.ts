export function generateRandomPastelColor() {
    // Generate random RGB values within the pastel range (dark and legible)
    const r = Math.floor(Math.random() * 56) + 100; // 100-155
    const g = Math.floor(Math.random() * 56) + 100; // 100-155
    const b = Math.floor(Math.random() * 56) + 100; // 100-155

    // Convert RGB values to hexadecimal
    const color = '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
    return color;
}

// Example usage: Generate a random pastel color
const randomPastelColor = generateRandomPastelColor();
console.log(randomPastelColor);
