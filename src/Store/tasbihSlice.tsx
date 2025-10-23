import { createSlice } from "@reduxjs/toolkit";

interface Tasbih {
  id: string;
  name: string;
  isPredefined: boolean;
  counts: number;
  streak: number;
  lastTimeAndDate: string | null;
  dailyCount: number;
  lastDate: string | null;
}

// Predefined tasbihs that cannot be deleted
const predefinedTasbihs: Tasbih[] = [
  {
    id: 'subhanallah',
    name: 'Subhanallah',
    isPredefined: true,
    counts: 0,
    streak: 0,
    lastTimeAndDate: null,
    dailyCount: 0,
    lastDate: null,
  },
  {
    id: 'alhamdulillah',
    name: 'Alhamdulillah',
    isPredefined: true,
    counts: 0,
    streak: 0,
    lastTimeAndDate: null,
    dailyCount: 0,
    lastDate: null,
  },
  {
    id: 'allah-hu-akbar',
    name: 'Allahu Akbar',
    isPredefined: true,
    counts: 0,
    streak: 0,
    lastTimeAndDate: null,
    dailyCount: 0,
    lastDate: null,
  },
  {
    id: 'la-ilaha-illallah',
    name: 'La ilaha illallah',
    isPredefined: true,
    counts: 0,
    streak: 0,
    lastTimeAndDate: null,
    dailyCount: 0,
    lastDate: null,
  },
  {
    id: 'astaghfirullah',
    name: 'Astaghfirullah',
    isPredefined: true,
    counts: 0,
    streak: 0,
    lastTimeAndDate: null,
    dailyCount: 0,
    lastDate: null,
  },
];

export const tasbihSlice = createSlice({
  name: "tasbihSlice",
  initialState: {
    tasbihs: predefinedTasbihs,
    currentTasbih: null as Tasbih | null,
    isCounting: false,
    currentCount: 0,
    lastAppOpenDate: null as string | null,
  },
  reducers: {
    addTasbih: (state, action) => {
      const newTasbih = {
        id: `custom_${Date.now()}`,
        name: action.payload.name,
        isPredefined: false,
        counts: 0,
        streak: 0,
        lastTimeAndDate: null,
        dailyCount: 0,
        lastDate: null,
      };
      state.tasbihs.push(newTasbih);
    },
    deleteTasbih: (state, action) => {
      const tasbihId = action.payload;
      const tasbih = state.tasbihs.find(t => t.id === tasbihId);
      if (tasbih && !tasbih.isPredefined) {
        state.tasbihs = state.tasbihs.filter(t => t.id !== tasbihId);
      }
    },
    startTasbih: (state, action) => {
      state.currentTasbih = action.payload;
      state.isCounting = true;
      state.currentCount = 0;
    },
    incrementCount: (state) => {
      if (state.currentTasbih && state.isCounting) {
        state.currentCount += 1;
      }
    },
    stopTasbih: (state) => {
      if (state.currentTasbih && state.isCounting) {
        const tasbih = state.tasbihs.find(t => t.id === state.currentTasbih!.id);
        if (tasbih) {
          tasbih.counts += state.currentCount;
          tasbih.lastTimeAndDate = new Date().toISOString();
          
          // Update daily count and streak
          const today = new Date().toDateString();
          if (tasbih.lastDate !== today) {
            if (state.currentCount > 0) {
              tasbih.dailyCount = state.currentCount;
              tasbih.streak += 1;
            }
            tasbih.lastDate = today;
          } else {
            tasbih.dailyCount += state.currentCount;
          }
        }
        state.currentTasbih = null;
        state.isCounting = false;
        state.currentCount = 0;
      }
    },
    resetTasbih: (state, action) => {
      const tasbihId = action.payload;
      const tasbih = state.tasbihs.find(t => t.id === tasbihId);
      if (tasbih) {
        tasbih.counts = 0;
        tasbih.streak = 0;
        tasbih.dailyCount = 0;
        tasbih.lastTimeAndDate = null;
        tasbih.lastDate = null;
      }
    },
    checkDailyStreak: (state) => {
      const today = new Date().toDateString();
      if (state.lastAppOpenDate !== today) {
        state.lastAppOpenDate = today;
        
        // Check and update streaks for all tasbihs
        state.tasbihs.forEach(tasbih => {
          if (tasbih.lastDate) {
            const lastDate = new Date(tasbih.lastDate);
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            // If the last activity was not yesterday, reset streak
            if (lastDate.toDateString() !== yesterday.toDateString()) {
              // Only reset if it's been more than 1 day since last activity
              const daysDiff = Math.floor((new Date().getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
              if (daysDiff > 1) {
                tasbih.streak = 0;
              }
            }
          }
        });
      }
    },
    setCurrentCount: (state, action) => {
      state.currentCount = action.payload;
    },
    resetAllData: (state) => {
      // Reset to initial state with predefined tasbihs only
      state.tasbihs = [
        {
          id: 'subhanallah',
          name: 'Subhanallah',
          isPredefined: true,
          counts: 0,
          streak: 0,
          lastTimeAndDate: null,
          dailyCount: 0,
          lastDate: null,
        },
        {
          id: 'alhamdulillah',
          name: 'Alhamdulillah',
          isPredefined: true,
          counts: 0,
          streak: 0,
          lastTimeAndDate: null,
          dailyCount: 0,
          lastDate: null,
        },
        {
          id: 'allah-hu-akbar',
          name: 'Allahu Akbar',
          isPredefined: true,
          counts: 0,
          streak: 0,
          lastTimeAndDate: null,
          dailyCount: 0,
          lastDate: null,
        },
        {
          id: 'la-ilaha-illallah',
          name: 'La ilaha illallah',
          isPredefined: true,
          counts: 0,
          streak: 0,
          lastTimeAndDate: null,
          dailyCount: 0,
          lastDate: null,
        },
        {
          id: 'astaghfirullah',
          name: 'Astaghfirullah',
          isPredefined: true,
          counts: 0,
          streak: 0,
          lastTimeAndDate: null,
          dailyCount: 0,
          lastDate: null,
        },
      ];
      state.currentTasbih = null;
      state.isCounting = false;
      state.currentCount = 0;
      state.lastAppOpenDate = null;
    },
  },
});

export const {
  addTasbih,
  deleteTasbih,
  startTasbih,
  incrementCount,
  stopTasbih,
  resetTasbih,
  checkDailyStreak,
  setCurrentCount,
  resetAllData,
} = tasbihSlice.actions;

export default tasbihSlice.reducer; 