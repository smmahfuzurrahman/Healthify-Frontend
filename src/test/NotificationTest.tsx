
// import useDecodedToken from "@/hook/useDecodedToken";
// import React, { useState, useEffect } from "react";
// import { io } from "socket.io-client";
// import notificationSound from "@/assets/notification.mp3"; // Import the audio file

// import { dismissNotification, stopAudio } from "@/redux/features/notificationSlice";
// import { useAppDispatch, useAppSelector } from "@/redux/hook";

// const Notification: React.FC = () => {
//   const user: any = useDecodedToken();
//   const [notifications, setNotifications] = useState<string[]>([]);
//   const [audio] = useState(new Audio(notificationSound)); // Use the imported audio
//   const [hasInteracted, setHasInteracted] = useState(false); // Track user interaction

//   // Preload audio
//   useEffect(() => {
//     audio.load();
//   }, [audio]);

//   // Initialize the socket connection
//   useEffect(() => {
//     const socket = io("http://localhost:5000");

//     socket.on("connect", () => {
//       console.log("Socket connected:", socket.id);
//       const userId = user?.userId;
//       socket.emit("register", userId);
//     });

//     const handleNewNotification = (data: { message: string }) => {
//       console.log("Notification received:", data.message);
//       setNotifications((prev) => [...prev, data.message]);
//       if (hasInteracted) {
//         audio.play().catch((error) => {
//           console.error("Error playing audio:", error); // Log any error
//         });
//       } else {
//         console.log("User has not interacted yet, audio will not play.");
//       }
//     };

//     socket.on("medicine-alarm", handleNewNotification);

//     return () => {
//       socket.off("medicine-alarm", handleNewNotification);
//       socket.disconnect();
//       audio.pause();
//       audio.currentTime = 0;
//     };
//   }, [audio, hasInteracted]);

//   const handleDismiss = (index: number) => {
//     setNotifications((prev) => prev.filter((_, i) => i !== index));
//     if (notifications.length === 1) {
//       audio.pause();
//       audio.currentTime = 0;
//     }
//   };

//   const handleUserInteraction = () => {
//     setHasInteracted(true);
//     console.log("User has interacted."); // Log user interaction
//   };

//   return (
//     <div className="p-4" onClick={handleUserInteraction}>
//       <h1 className="text-2xl font-bold mb-4">Notifications</h1>
//       <ul className="list-disc pl-5">
//         {notifications.length === 0 ? (
//           <li>No notifications</li>
//         ) : (
//           notifications.map((notification, index) => (
//             <li key={index} className="flex justify-between items-center mb-2">
//               {notification}
//               <button
//                 onClick={() => handleDismiss(index)}
//                 className="ml-2 text-red-500 hover:text-red-700"
//               >
//                 Dismiss
//               </button>
//             </li>
//           ))
//         )}
//       </ul>
//     </div>
//   );
// };

// export default Notification;


// -------------


// const Notification: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const { notifications } = useAppSelector((state) => state.notifications);

//   const handleDismiss = (index: number) => {
//     dispatch(dismissNotification(index));
//     if (notifications.length === 1) {
//       dispatch(stopAudio());
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Notifications</h1>
//       <ul className="list-disc pl-5">
//         {notifications.length === 0 ? (
//           <li>No notifications</li>
//         ) : (
//           notifications.map((notification, index) => (
//             <li key={index} className="flex justify-between items-center mb-2">
//               {notification}
//               <button
//                 onClick={() => handleDismiss(index)}
//                 className="ml-2 text-red-500 hover:text-red-700"
//               >
//                 Dismiss
//               </button>
//             </li>
//           ))
//         )}
//       </ul>
//     </div>
//   );
// };

// export default Notification;