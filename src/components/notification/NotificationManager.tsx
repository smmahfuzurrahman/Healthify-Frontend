/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import notificationSound from "/notification.mp3";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  addNotification,
  dismissNotification,
  stopAudio,
} from "@/redux/features/notificationSlice";
import useDecodedToken from "@/hook/useDecodedToken";

const NotificationManager: React.FC = () => {
  const user: any = useDecodedToken();
  const dispatch = useAppDispatch();
  const { audioPlaying, notifications } = useAppSelector(
    (state) => state.notifications
  );
  const [audio] = useState(new Audio(notificationSound));

  useEffect(() => {
    audio.load();
  }, [audio]);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_SOCKET_API);

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      // socket.id = user?.userId;
      const userId = user?.userId;
      socket.emit("register", userId);
    });

    socket.on("medicine-alarm", (data: { message: string }) => {
      console.log("Notification received:", data.message);
      dispatch(addNotification(data.message));
    });

    return () => {
      socket.off("medicine-alarm");
      socket.disconnect();
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio, dispatch]);

  useEffect(() => {
    if (audioPlaying) {
      audio.loop = true; // Set audio to loop
      audio
        .play()
        .catch((error) => console.error("Error playing audio:", error));
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [audioPlaying, audio]);

  const handleDismiss = (index: number) => {
    dispatch(dismissNotification(index));
    // Optionally check if there are no notifications left
    if (notifications.length === 1) {
      dispatch(stopAudio()); // Stop audio if this was the last notification
    }
  };

  return (
<div className="fixed bottom-4 right-4 w-full max-w-sm">
      {notifications.map((notification, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-blue-100 border-l-4 border-blue-500 rounded-lg p-4 mb-4 shadow-lg transition-transform transform-gpu hover:scale-105"
        >
          <span className="text-gray-800">{notification}</span>
          <button
            onClick={() => handleDismiss(index)}
            className="text-red-500 hover:text-red-600 font-semibold transition duration-200 ml-4"
          >
            Dismiss
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationManager;
