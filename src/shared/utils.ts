import { Task } from "./types";

export function generateRandomPastelColor() {
    // Generate random RGB values within the pastel range (dark and legible)
    const r = Math.floor(Math.random() * 56) + 100; // 100-155
    const g = Math.floor(Math.random() * 56) + 100; // 100-155
    const b = Math.floor(Math.random() * 56) + 100; // 100-155

    // Convert RGB values to hexadecimal
    const color =
        '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
    return color;
}

export const compareDates = (t1: Task, t2: Task) => {
    const date1 = new Date(t1.createdAt || '');
    const date2 = new Date(t2.createdAt || '');
    if (date1 < date2) {
        return -1;
    } else if (date1 > date2) {
        return 1;
    }
    return 0;
};
