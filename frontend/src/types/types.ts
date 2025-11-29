export interface User {
    user_id: number
    fullname: string
    login: string
    token: string
}

export interface UserRole {
    user_role_id: number
    contract: {
        number_contract: string
    }
    create_row_user: {
        fullname: string
    }
    user_id: number
    contract_id: number
    role_id: number
    date_start: Date
    date_end: Date
    create_row_user_id: number
    create_row_datetime: Date
    deleted: boolean
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