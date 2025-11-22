import type {MessageInstance} from "antd/es/message/interface";

export const messageResponse = async (messageApi: MessageInstance, type: "info" | "success" | "error" | "warning" | "loading", message: string) => {
    await messageApi.open({
        type: type,
        content: message
    });
};