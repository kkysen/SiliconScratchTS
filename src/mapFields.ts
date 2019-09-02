export interface MapFields {
    
    <T, U>(obj: T, mapper: (field: T[keyof T]) => U[keyof U]): U;
    
    <T, U>(obj: {[field: string]: T}, mapper: (field: T) => U): {[field: string]: U};
    
}

export const mapFields: MapFields = function <T, U>(
    obj: {[field: string]: T},
    mapper: (field: T) => U,
): {[field: string]: U} {
    const mapped: {[field: string]: U} = {};
    for (const [key, value] of Object.entries(obj)) {
        mapped[key] = mapper(value);
    }
    return mapped;
};

export interface MapFieldsIndexed {
    
    <T, U>(obj: T, mapper: (field: T[keyof T], i: number) => U[keyof U]): U;
    
    <T, U>(obj: {[field: string]: T}, mapper: (field: T, i: number) => U): {[field: string]: U};
    
}

export const mapFieldsIndexed: MapFieldsIndexed = function <T, U>(
    obj: {[field: string]: T},
    mapper: (field: T, i: number) => U,
): {[field: string]: U} {
    const mapped: {[field: string]: U} = {};
    let i = 0;
    for (const [key, value] of Object.entries(obj)) {
        mapped[key] = mapper(value, i++);
    }
    return mapped;
};
