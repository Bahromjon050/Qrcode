import { Type } from "./Type"

export const SaveQr = (url) => {
    return{
        type: Type.addQr,
        payload: url
    }
}
export const EditQr = (url) => {
    return{
        type: Type.editQr,
        payload: url
    }
}
export const DeleteQr = (url) => {
    return{
        type: Type.deleteQr,
        payload: url
    }
}