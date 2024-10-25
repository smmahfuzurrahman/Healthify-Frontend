import { dismissNotification } from "@/redux/features/notificationSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";



const Notification: React.FC = () => {
  const dispatch = useAppDispatch();
  const { notifications } = useAppSelector((state) => state.notifications);

  const handleDismiss = (index: number) => {
    dispatch(dismissNotification(index));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <ul className="list-disc pl-5">
        {notifications.length === 0 ? (
          <li>No notifications</li>
        ) : (
          notifications.map((notification, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              {notification}
              <button
                onClick={() => handleDismiss(index)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                Dismiss
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
export default Notification;