import { createStore } from "redux";
import { rootRender } from "./redux/reducers";




export const Store = createStore(
    rootRender,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
