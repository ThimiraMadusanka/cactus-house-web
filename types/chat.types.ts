export type CreateOrUpdateChatResource = {
    description: string,
}

export type CreateOrUpdateChatResourceInputValidation = {
    description: string,
}

export type Message = {
     message_content: string,
}

export type GetMessages = {
    id: number,
    message_content: string,
    role: string,
    session_id: string,
    created_at: string,
    updated_at: string,
}
