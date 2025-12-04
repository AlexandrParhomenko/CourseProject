import type {MessageInstance} from "antd/es/message/interface";

export const messageResponse = async (messageApi: MessageInstance, type: "info" | "success" | "error" | "warning" | "loading", message: string) => {
    await messageApi.open({
        type: type,
        content: message
    });
};

export const getAbbreName = (fullName: string) => {
    let res = "";
    const name = fullName.split(" ").filter(el => el && el !== " ");
    name.forEach((el, idx) => idx === 0 ? res = res.concat(el) : res = res.concat(` ${el[0]}.`));
    return res;
};