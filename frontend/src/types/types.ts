export interface ICreateUser {
    user_login: string
    user_password: string
    fio: string
}

export type ModalType = "create" | "update"