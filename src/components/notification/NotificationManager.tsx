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
      audio.loop = true;
      audio.play().catch((error) => console.error("Error playing audio:", error));
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [audioPlaying, audio]);

  const handleDismiss = (index: number) => {
    dispatch(dismissNotification(index));
    if (notifications.length === 1) {
      dispatch(stopAudio());
    }
  };

  return (
    <div className="fixed bottom-4 right-4 space-y-3">
      {notifications.map((notification, index) => (
        <div
          key={index}
          className="bg-blue-600 text-white rounded-md p-4 shadow-lg flex items-center space-x-3 transition duration-300 ease-in-out transform hover:scale-105"
        >
          <span>{notification}</span>
          <button
            onClick={() => handleDismiss(index)}
            className="ml-auto bg-red-500 hover:bg-red-700 text-white rounded-full p-1"
            aria-label="Dismiss notification"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationManager;
