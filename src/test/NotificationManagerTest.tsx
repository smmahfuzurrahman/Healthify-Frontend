// /* eslint-disable @typescript-eslint/no-explicit-any */
// // components/NotificationManager.tsx
// import { useEffect } from "react";
// import { io } from "socket.io-client";

// import notificationSound from "@/assets/notification.mp3";
// import { useAppDispatch, useAppSelector } from "@/redux/hook";
// import {
//   addNotification,
//   setHasInteracted,
// } from "@/redux/features/notificationSlice";
// import useDecodedToken from "@/hook/useDecodedToken";

// const NotificationManager: React.FC = () => {
//   const user: any = useDecodedToken();
//   const dispatch = useAppDispatch();
//   const { audioPlaying, hasInteracted } = useAppSelector(
//     (state) => state.notifications
//   );
//   const audio = new Audio(notificationSound);

//   useEffect(() => {
//     audio.load();
//   }, [audio]);

//   useEffect(() => {
//     const socket = io("http://localhost:5000");
//     socket.on("connect", () => {
//       console.log("Socket connected:", socket.id);
//       // Register user on socket
//       const userId = user?.userId; // Replace with actual user ID logic
//       socket.emit("register", userId);
//     });

//     socket.on("medicine-alarm", (data: { message: string }) => {
//       console.log("Notification received:", data.message);
//       dispatch(addNotification(data.message));
//     });

//     return () => {
//       socket.off("medicine-alarm");
//       socket.disconnect();
//       audio.pause();
//       audio.currentTime = 0;
//     };
//   }, [audio, dispatch]);

//   useEffect(() => {
//     if (audioPlaying && hasInteracted) {
//       audio
//         .play()
//         .catch((error) => console.error("Error playing audio:", error));
//     } else {
//       audio.pause();
//       audio.currentTime = 0;
//     }
//   }, [audioPlaying, hasInteracted, audio]);

//   const handleUserInteraction = () => {
//     dispatch(setHasInteracted());
//   };

//   return <div onClick={handleUserInteraction} />;
// };

// export default NotificationManager;