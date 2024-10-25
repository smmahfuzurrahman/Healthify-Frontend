import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationState {
  notifications: string[];
  audioPlaying: boolean; // Track if audio should be playing
}

const initialState: NotificationState = {
  notifications: [],
  audioPlaying: false,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<string>) => {
      state.notifications.push(action.payload);
      state.audioPlaying = true; // Set audio playing to true when a new notification is added
    },
    dismissNotification: (state, action: PayloadAction<number>) => {
      state.notifications.splice(action.payload, 1);
      // Stop audio only if there are no notifications left
      if (state.notifications.length === 0) {
        state.audioPlaying = false; // Stop audio when all notifications are dismissed
      }
    },
    // New action to manually stop audio playback
    stopAudio: (state) => {
      state.audioPlaying = false; // Set audio playing to false
    },
    // New action to reset notifications (optional, based on your needs)
    resetNotifications: (state) => {
      state.notifications = []; // Clear notifications
      state.audioPlaying = false; // Stop audio when resetting
    },
  },
});

// Export actions
export const { addNotification, dismissNotification, stopAudio, resetNotifications } = notificationSlice.actions;

// Export reducer
export default notificationSlice.reducer;
