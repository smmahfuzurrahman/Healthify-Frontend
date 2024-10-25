/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ChatSideBar from "@/components/chat/ChatSideBar";
import Message from "@/components/chat/Message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getHealthKeywords } from "@/utils/getHealthKeywords";
import { TConversation } from "@/types";
import useDecodedToken from "@/hook/useDecodedToken";
import {
  useCreateConversationMutation,
  useGetSingleConversationQuery,
  useStoreMessageInConversationMutation,
  useStoreMessageMutation,
  useGetUserConversationQuery,
} from "@/redux/api/message/messageApi";
import Swal from "sweetalert2";

const Chat = () => {
  const navigate = useNavigate();
  // Google Generative AI setup
  const genAI = new GoogleGenerativeAI(
    import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT as string
  );
  const model = genAI.getGenerativeModel({
    model: "gemini-pro",
  });
  // to show the messages of a specific conversation
  const { id } = useParams();
  // userInfo
  const user: any = useDecodedToken();
  // conversation creation process
  const [createConversation] = useCreateConversationMutation();
  const [storeMessage] = useStoreMessageMutation();
  const [storeMessageInConversation] = useStoreMessageInConversationMutation();
  const { data, isLoading } = useGetSingleConversationQuery(id);
  const { refetch: refetchConversations } = useGetUserConversationQuery(
    user?.userId
  );

  const [query, setQuery] = useState<string>("");
  const [conversation, setConversation] = useState<TConversation[]>([]);
  const [conversationId, setConversationId] = useState<string>(id || "");

  // Get keywords to filter query
  const healthKeywords = getHealthKeywords();

  // Reset conversation when changing between different conversation ids
  useEffect(() => {
    setConversationId(id || "");
  }, [id]);

  // Handle send button
  const handleSend = async () => {
    if (!query.trim()) return; // Prevent sending empty query

    // Add the user's query to the conversation and set loading to true for the latest query
    setConversation((prev) => [
      ...prev,
      { userQuery: query, reply: "", loading: true },
    ]);

    const filterQuery = healthKeywords.some((keyword) =>
      new RegExp(keyword, "i").test(query)
    );

    if (!filterQuery) {
      // Update conversation with the error message
      setConversation((prev) =>
        prev.map((msg, index) =>
          index === prev.length - 1
            ? {
                ...msg,
                reply:
                  "Ahh! I can only help you with your health-related issues. Sorry!",
                loading: false,
              }
            : msg
        )
      );
      setQuery(""); // Clear the input field after sending
    } else {
      const result = await model.generateContent(query);
      const response = await result.response;
      const text = await response.text();
      // Creating a new conversation if there's no previous conversation
      if (text && user?.userId && !conversationId) {
        try {
          const conversationPayload = {
            userId: user.userId,
            title: query,
          };
          const response = await createConversation(conversationPayload);
          if (response.data) {
            setConversationId(response.data.data?._id);
            await refetchConversations(); // Refetch conversations for sidebar

            const payload = {
              userId: user?.userId,
              conversationId: response.data.data._id,
              query,
              answer: text,
            };
            const storeMessageResponse = await storeMessage(payload);
            if (storeMessageResponse?.data) {
              const payload = {
                id: response.data.data._id,
                messageId: storeMessageResponse.data.data._id,
              };
              await storeMessageInConversation(payload);
            }

            if (storeMessageResponse.error) {
              Swal.fire({
                title: "Error",
                text:
                  // @ts-ignore
                  response.error?.data.message ||
                  "Error sending query to database",
                icon: "error",
              });
            }
          } else {
            Swal.fire({
              title: "Error",
              text:
                // @ts-ignore
                response.error?.data.message ||
                "Error sending query to database",
              icon: "error",
            });
          }
        } catch (error: any) {
          Swal.fire({
            title: "Error",
            text: "Error sending query to database",
            icon: "error",
          });
        }
      }
      // If there's a previous conversation
      if (text && conversationId && user?.userId) {
        const messagePayload = {
          userId: user?.userId,
          conversationId,
          query,
          answer: text,
        };
        const storeMessageResponse = await storeMessage(messagePayload);
        if (storeMessageResponse?.data) {
          const payload = {
            id: conversationId,
            messageId: storeMessageResponse.data.data._id,
          };

          await storeMessageInConversation(payload);
        }

        if (storeMessageResponse.error) {
          Swal.fire({
            title: "Error",
            text:
              // @ts-ignore
              response.error?.data.message || "Error sending query to database",
            icon: "error",
          });
        }
      }
      // Update the conversation with the AI response
      setConversation((prev) =>
        prev.map((msg, index) =>
          index === prev.length - 1
            ? { ...msg, reply: text, loading: false }
            : msg
        )
      );
    }
    setQuery(""); // Clear the input field after sending
  };

  // Handle new conversation creation
  const handleNewConversation = () => {
    setConversation([]);
    setConversationId("");
    navigate("/chat");
  };

  if (user?.status < 100) {
    Swal.fire("You have to complete your profile to start chatting!");
    navigate("/dashboard/profile");
  }
  return (
    <div className="flex gap-3">
      {/* Side bar */}
      <div className="w-1/4 bg-blue-100 p-4">
        <ChatSideBar
          handleNewConversation={handleNewConversation}
          activeConversationId={conversationId}
        />
      </div>
      {/* input button conversation part */}
      <div className=" w-full">
        {/* Conversation part */}
        {id &&
          !isLoading &&
          data?.data?.messages.map((message: any) => (
            <Message
              key={message?._id}
              userQuery={message?.query}
              reply={message?.answer}
              loading={false}
            />
          ))}
        <div className="flex flex-col space-y-5 w-full">
          {/* Chats */}
          {conversation.map((conv, index) => (
            <Message
              key={index}
              userQuery={conv.userQuery}
              reply={conv.reply}
              loading={conv.loading}
            />
          ))}
          {/* Input and button for chat */}
          <div className="p-4">
            <div className="flex items-center gap-3">
              <Input
                required
                value={query} // Bind input value to the state
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask your assistant"
                className="shadow-xl"
              />
              <Button onClick={handleSend} variant="default">
                <FaLocationArrow size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
