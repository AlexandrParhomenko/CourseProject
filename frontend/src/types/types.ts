export interface User {
    user_id: number
    fullname: string
    login: string
    token: string
}

export interface Registration {
    login: string
    fullname: string
    hash_password: string
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

export interface Object {
    "object_id": number
    "contract_id": number
    "number_object": string
    "abbreve_name_object": string | null
    "full_name_object": string
    "create_row_user_id": number | null
    "create_row_datetime": string | null
    "deleted": boolean
    "contract": {
        "number_contract": string
    }
    "create_row_user": string | null
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

export interface Contract {
    contract_id: number
    number_contract: string
    create_row_user_id: number
    create_row_datetime: Date | string
    last_correct_user_id?: number | null
    last_correct_datetime?: Date | string | null
    last_correct_columns_name?: string | null
    deleted: boolean
    deletion_user_id?: number | null
    deletion_datetime?: Date | string | null
    create_row_user?: {
        fullname: string
    }
    lastCorrectUser?: {
        fullname: string
    }
    deletionUser?: {
        fullname: string
    }
}

export interface Specialist {
    specialist_id: number
    contract_id: number
    fullname: string
    post_specialist: string
    phone_number: string
    number_doc: number
    date_doc: Date | string
    create_row_user_id: number
    create_row_datetime: Date | string
    deleted: boolean
    type_work?: string
    contract?: {
        number_contract: string
    }
    create_row_user?: {
        fullname: string
    }
}

export interface VisitSheet {
    visit_sheet_id: number
    contract_id: number
    specialist_id: number
    date_arrival: Date | string
    date_departure: Date | string
    create_row_user_id: number
    create_row_datetime: Date | string
    visit_sheet_ocps: {
        organization_contact_person_id: number
        organization_contact_person: {
            fullname: string
        }
    }[]
    deleted: boolean
    contract?: {
        number_contract: string
    }
    specialist?: Specialist
    create_row_user?: {
        fullname: string
    }
}

export interface Consultation {
    consultation_id: number
    contract_id: number
    date_cons: Date | string
    content_cons: string
    result_cons: string
    create_row_user_id: number
    create_row_datetime: Date | string
    deleted: boolean
    contract?: {
        number_contract: string
    }
    create_row_user?: {
        fullname: string
    }
}

export interface Block {
    block_id: number
    contract_id: number
    designation_block: string
    name_block: string
    note_block?: string | null
    create_row_user_id: number
    create_row_datetime: Date | string
    deleted: boolean
    contract?: {
        number_contract: string
    }
    create_row_user?: {
        fullname: string
    }
}

export interface Organization {
    organization_id: number
    organization: string
    create_row_user_id: number
    create_row_datetime: Date | string
    deleted: boolean
    contract_id: number
    contract?: {
        number_contract: string
    }
    create_row_user?: {
        fullname: string
    }
}

export interface OrganizationContact {
    organization_contact_person_id: number
    contract_id: number
    organization_id: number
    project_participants: string
    fullname: string
    post: string
    department: string
    phone_number: string
    organization: string
    create_row_user_id: number
    create_row_datetime: Date | string
    deleted: boolean
    contract?: {
        number_contract: string
    }
    create_row_user?: {
        fullname: string
    }
}

export interface Defect {
    importance_defect_id: number
    importance_defect: string
    create_row_user_id: number
    create_row_datetime: Date | string
    deleted: boolean
    create_row_user?: {
        fullname: string
    }
}

export interface TypeDoc {
    type_doc_id: number
    type_doc: string
    create_row_user_id: number
    create_row_datetime: Date | string
    deleted: boolean
    create_row_user?: {
        fullname: string
    }
}

export interface Discipline {
    discipline_id: number
    discipline: string
    create_row_user_id: number
    create_row_datetime: Date | string
    deleted: boolean
    create_row_user?: {
        fullname: string
    }
}

export interface Brand {
    brand_id: number
    contract_id: number
    object_id: number
    title: string
    discipline_id: number
    abbreve_brand_id?: number | null
    sections?: string | null
    subsection?: string | null
    full_brand_code?: string | null
    name_brand?: string | null
    note?: string | null
    block_id?: number | null
    create_row_user_id: number
    create_row_datetime: Date | string
    deleted: boolean
    full_brand_code_name?: string | null
    contract?: {
        number_contract: string
    }
    object?: Object
    discipline?: Discipline
    block?: {
        block_id: number
        designation_block: string
    }
    create_row_user?: {
        fullname: string
    }
}

export interface TypeWork {
    type_work_id: number
    category_work: string
    type_work: string
    name_work: string
    create_row_user_id: number
    create_row_datetime: Date | string
    deleted: boolean
    create_row_user?: {
        fullname: string
    }
}

export interface AbbreveBrand {
    abbreve_brand_id: number
    abbreve_brand: string
    direction_e_violation: string
    create_row_user_id: number
    create_row_datetime: Date | string
    deleted: boolean
    create_row_user?: {
        fullname: string
    }
}

export interface MainJournal {
    main_journal_id: number
    contract_id: number
    date_supervision: Date | string
    brand_id: number
    defects: string
    instructions: string
    importance_defect_id: number
    visit_sheet_id: number
    deadline_eliminate: string
    elimination: boolean
    updated_elimination_at_true: Date | string
    path_to_drawing: string
    create_row_user_id: number
    create_row_datetime: Date | string
    deleted: boolean
    brand: {
        discipline: {
            discipline: string
        }
        object: {
            abbreve_name_object: string
            number_object: string
        }
        name_brand: string
        sections: string
        subsection: string
        title: string
    }
    contract?: {
        number_contract: string
    }
    create_row_user?: {
        fullname: string
    }
}

export interface TechnicalRegistry {
    registry_technical_solution_id: number
    contract_id: number
    date_solution: Date | string
    main_journal_id: number
    full_brand_code: string
    reason_change: string
    path_photo_sol: string
    status_compliance: string
    note: string
    create_row_user_id: number
    create_row_datetime: Date | string
    deleted: boolean
    contract?: {
        number_contract: string
    }
    create_row_user?: {
        fullname: string
    }
}

export interface Registry {
    registry_id: number
    contract_id: number
    brand_id: number
    type_work: string
    type_doc_id: number
    date_of_review?: Date | string | null
    date_signing_doc?: Date | string | null
    path_to_doc_signed?: string | null
    path_to_doc_with_note?: string | null
    create_row_user_id: number
    create_row_datetime: Date | string
    deleted: boolean
    contract?: {
        number_contract: string
    }
    create_row_user?: {
        fullname: string
    }
}