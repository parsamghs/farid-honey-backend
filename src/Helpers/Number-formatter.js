function formatNumber(value, withGrouping = true) {
    if (!value) return "۰";

    const num = Number(value);

    if (withGrouping) {
        return num.toLocaleString('fa-IR');
    } else {
        return num.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
    }
}

function formatNumbersintext(text) {
    if (!text) return text;
    return text.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
}


export { formatNumber, formatNumbersintext };
