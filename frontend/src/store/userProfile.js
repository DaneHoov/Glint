const SET_USER_PROFILE = "userProfile/SET_USER_PROFILE";

export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});

const initialState = null;

export default function userProfileReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_PROFILE:
      return action.profile;
    default:
      return state;
  }
}
