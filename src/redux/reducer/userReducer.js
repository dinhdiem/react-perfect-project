import {
  FETCH_USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
} from "../action/userAction";

const INITIAL_STATE = {
  account: {
    access_token: "",
    refresh_token: "",
    userInfo: {
      username: "",
      role: "",
      email: "",
      image: "",
    },
    isAuthenticate: false,
  },
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN_SUCCESS:
      const { access_token, refresh_token, role, email, image, username } =
        action.payload.DT;
      return {
        ...state,
        account: {
          access_token,
          refresh_token,
          userInfo: {
            username,
            role,
            email,
            image,
          },
          isAuthenticate: true,
        },
      };
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        account: {
          access_token: "",
          refresh_token: "",
          userInfo: {
            username: "",
            role: "",
            email: "",
            image: "",
          },
          isAuthenticate: false,
        },
      };
    default:
      return state;
  }
};

export default userReducer;
