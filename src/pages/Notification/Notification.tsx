import { dismissNotification } from "@/redux/features/notificationSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

const Notification: React.FC = () => {
  const dispatch = useAppDispatch();
  const { notifications } = useAppSelector((state) => state.notifications);

  const handleDismiss = (index: number) => {
    dispatch(dismissNotification(index));
  };

  return (
    <div className="p-6 h-screen bg-gray-100">
      <h1 className="text-3xl font-semibold mb-6 text-gradient">
        Notifications
      </h1>
      <div className="bg-white rounded-lg shadow p-4 max-w-lg mx-auto">
        {notifications.length === 0 ? (
          <div className="text-gray-500 text-center py-6">No notifications</div>
        ) : (
          <ul className="space-y-3">
            {notifications.map((notification, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-3 bg-blue-50 rounded-lg transition duration-300 ease-in-out hover:bg-blue-100"
              >
                <span className="text-gray-700">{notification}</span>
                <button
                  onClick={() => handleDismiss(index)}
                  className="ml-4 text-red-500 hover:text-red-700 font-medium transition duration-200"
                >
                  Dismiss
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Notification;
