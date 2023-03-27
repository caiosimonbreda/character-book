export function getStatusIndicatorColor(status) {
    if (status === "Alive") {
        return "#4b4"
    } else if (status === "Dead") {
        return "#d55"
    } 
    return "#888"
}