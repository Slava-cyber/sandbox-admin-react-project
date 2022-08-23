export interface eventEntity {
    title?: string,
    description?: string,
    town?: string,
    datetime?: string,
    category?: string,
    author?: string,
}

export interface eventEntityData extends eventEntity {}
export interface eventEntityClassError extends eventEntity {}
export interface eventEntityTextError extends eventEntity {}

export interface requestEntity {
    event?: string,
    request_author?: string,
    user?: string,
    status?: string,
}

export interface requestEntityData extends requestEntity {}
export interface requestEntityClassError extends requestEntity {}
export interface requestEntityTextError extends requestEntity {}


export interface userEntity {
    name?: string,
    surname?: string,
    town?: string,
    date_of_birth?: string,
    login_sign_up?: string,
    login?: string,
    sex?: string,
    password_sign_up?: string,
    password_confirm?: string,
    phone_number?: string,
    email?: string,
    interest?: string,
    description?: string,
}

export interface userEntityData extends userEntity{
    path_image?: string,
}

export interface userEntityClassError extends userEntity {}

export interface userEntityTextError extends userEntity{
    image: string,
}