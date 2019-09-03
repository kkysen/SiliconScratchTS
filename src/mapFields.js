export const mapFields = function (obj, mapper) {
    const mapped = {};
    for (const [key, value] of Object.entries(obj)) {
        mapped[key] = mapper(value);
    }
    return mapped;
};
export const mapFieldsIndexed = function (obj, mapper) {
    const mapped = {};
    let i = 0;
    for (const [key, value] of Object.entries(obj)) {
        mapped[key] = mapper(value, i++);
    }
    return mapped;
};
