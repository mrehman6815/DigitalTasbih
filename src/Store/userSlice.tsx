import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    isOnBoarding: false,
    isLogin: false,
    hasCompletedOnboarding: false,
    user: {
      dailyStreak: 0,
      lastAppOpenDate: null,
    },
    token: "",
  },
  reducers: {
    updateIsOnBoarding: (state, action) => {
      state.isOnBoarding = action.payload;
    },
    updateIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
    },
    updateDailyStreak: (state, action) => {
      state.user.dailyStreak = action.payload;
    },
    updateLastAppOpenDate: (state, action) => {
      state.user.lastAppOpenDate = action.payload;
    },
    setOnboardingCompleted: (state, action) => {
      state.hasCompletedOnboarding = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateIsOnBoarding, updateIsLogin, updateUser, updateToken, updateDailyStreak, updateLastAppOpenDate, setOnboardingCompleted } =
  userSlice.actions;

export default userSlice.reducer;
