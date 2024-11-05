/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "../ui/button";
import useDecodedToken from "@/hook/useDecodedToken";
import {
  useGetUserConversationQuery,
  useRemoveConversationMutation,
} from "@/redux/api/message/messageApi";
import Spinner from "../ui/Spinner";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const ChatSideBar = ({
  handleNewConversation,
  activeConversationId,
}: {
  handleNewConversation: () => void;
  activeConversationId: string | undefined;
}) => {
  const user: any = useDecodedToken();
  const { data, isLoading, refetch } = useGetUserConversationQuery(user?.userId);
  const [deleteUserConversation] = useRemoveConversationMutation();

  // Conversation delete handler
  const handleDeleteChat = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteUserConversation({ id });
        if (response.data) {
          Swal.fire({
            title: "Deleted!",
            text: "Your conversation has been deleted.",
            icon: "success",
          });
          refetch();
        } else {
          Swal.fire({
            title: "Error",
            text: "Failed to delete conversation",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg shadow-md">
      {/* Add New Conversation Button */}
      <div className="text-center mb-4">
        <Button onClick={handleNewConversation} className="w-full md:w-auto">
          Add New Conversation
        </Button>
      </div>

      {/* Chat List */}
      <div className="overflow-y-auto max-h-64 md:max-h-[80vh]">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="space-y-2">
            {data?.data?.map((conversation: any) => (
              <div
                key={conversation._id}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
              >
                <Link
                  to={`/chat/${conversation._id}`}
                  className={`block flex-1 p-2 rounded-lg ${
                    conversation._id === activeConversationId
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-black"
                  }`}
                >
                  {conversation.title}
                </Link>
                <button
                  onClick={() => handleDeleteChat(conversation._id)}
                  className="text-red-500 hover:text-red-600 transition"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSideBar;
