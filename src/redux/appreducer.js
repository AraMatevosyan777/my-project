import { getAuthMe } from "./authReducer";

const INITIALIZING_SUCCESS = 'INITIALIZING_SUCCESS';

let initialState = {
    initialized: false
}


export const appReducer = (state = initialState, action) => {

    switch (action.type) {
      case INITIALIZING_SUCCESS:
          return{
              ...state,
              initialized: true
          }
        default:
            return state
    };
}

const initializingSuccess = () => ({type: INITIALIZING_SUCCESS});

export const initializeApp = () => async (dispatch) => {
    let promise = dispatch(getAuthMe());
    promise.then(() => {
        dispatch(initializingSuccess())
    })
}
