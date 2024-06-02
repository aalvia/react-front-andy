export interface Resenia {
    _id: string,
    iduser?: string,
    detalle?: string,
    estrellas?: string,
    idmovie?: string,
    namemovie?: string,
    userDetails?: any,
    createdAt: Date;
    updatedAt: Date;
}

export type CreateResenia = Omit<Resenia, '_id' | 'createdAt' | 'updatedAt'>;