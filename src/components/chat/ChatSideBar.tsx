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
  const { data, isLoading, refetch } = useGetUserConversationQuery(
    user?.userId
  );
  const [deleteUserConversation] = useRemoveConversationMutation();

  // conversation delete handler
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
            text: "Your medicine has been deleted.",
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
    <>
      <div className="text-center">
        <Button onClick={handleNewConversation}>Add New Conversation</Button>
      </div>
      <div className="mt-5">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="space-y-2">
            {data?.data?.map((conversation: any) => (
              <div key={conversation._id} className="flex items-center gap-1">
                <Link
                  to={`/chat/${conversation._id}`}
                  className={`p-3 block rounded-lg flex-1 ${
                    conversation._id === activeConversationId
                      ? "bg-primary text-white shadow-lg" // Highlight active conversation
                      : "bg-gray-100 text-black"
                  }`}
                >
                  {conversation.title}
                </Link>
                <button onClick={() => handleDeleteChat(conversation._id)}>
                  <FaTrash className="text-red-500" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ChatSideBar;

// import { Button } from "../ui/button";
// import ChatList from "./ChatList";

// const ChatSideBar = ({
//   handleNewConversation,
// }: {
//   handleNewConversation: () => void;
// }) => {
//   return (
//     <>
//       <div className="text-center">
//         <Button onClick={handleNewConversation}>Add New Conversation</Button>
//       </div>
//       <div className="mt-5">
//         <ChatList />
//       </div>
//     </>
//   );
// };

// export default ChatSideBar;
