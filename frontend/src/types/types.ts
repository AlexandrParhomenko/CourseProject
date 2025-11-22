export interface User {
    user_id: number
    fullname: string
    login: string
    token: string
}

export interface LoginDto {
    login: string
    hash_password: string
}

export interface LoginRequest {
    login: string
    password: string
}

export type ModalType = "create" | "update"