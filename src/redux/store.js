import { createStore, combineReducers, applyMiddleware} from "redux";
import { profileReducer } from "./profileReducer";
import usersReducer from "./usersReducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer} from "redux-form";
import { authReducer } from "./authReducer";
import { appReducer } from "./appreducer";


let reducers = combineReducers({
    profilePage: profileReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
});


const store = createStore(reducers,applyMiddleware(thunkMiddleware));

window.store = store;

export default store;