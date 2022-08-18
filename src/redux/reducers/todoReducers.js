import { Type } from "../action/Type"

const initial = {
    qrData: JSON.parse(localStorage.getItem("qrData")) || []
}

const TodoReducers = (state = initial, { type, payload }) => {
    switch (type) {
        case Type.addQr:
            localStorage.setItem('qrData', JSON.stringify([...state.qrData, { ...payload, id: new Date().getTime() }]))
            return {
                ...state,
                qrData: JSON.parse(localStorage.getItem('qrData')) || []
            }
        case Type.editQr:
            localStorage.setItem('qrData', JSON.stringify(state.qrData.map((val) => val.id === payload.id ? payload : val)))
            return {
                ...state,
                qrData: JSON.parse(localStorage.getItem('qrData')) || []
            }
        case Type.deleteQr:
            localStorage.setItem('qrData', JSON.stringify(state.qrData.filter((val) => val.id !== payload)))
            return {
                ...state,
                qrData: JSON.parse(localStorage.getItem('qrData')) || []
            }
        default: return state
    }
}
export default TodoReducers