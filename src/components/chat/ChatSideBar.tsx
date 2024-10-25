/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "../ui/button";

import useDecodedToken from "@/hook/useDecodedToken";
import { useGetUserConversationQuery } from "@/redux/api/message/messageApi";
import Spinner from "../ui/Spinner";
import { Link } from "react-router-dom";
const ChatSideBar = ({
  handleNewConversation,
  activeConversationId,
}: {
  handleNewConversation: () => void;
  activeConversationId: string | undefined;
}) => {
  const user: any = useDecodedToken();
  const { data, isLoading } = useGetUserConversationQuery(user?.userId);
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
              <Link
                key={conversation._id}
                to={`/chat/${conversation._id}`}
                className={`p-3 block rounded-lg ${
                  conversation._id === activeConversationId
                    ? "bg-primary text-white shadow-lg" // Highlight active conversation
                    : "bg-gray-100 text-black"
                }`}
              >
                {conversation.title}
              </Link>
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
