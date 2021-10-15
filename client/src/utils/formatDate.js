export function formatDate(d) {
    const date = new Date(d).toISOString().slice(0,10).split('.').reverse().join('-');

    return date
}