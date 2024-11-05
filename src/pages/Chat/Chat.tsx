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
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT as string);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const { id } = useParams();
  const user: any = useDecodedToken();

  const [createConversation] = useCreateConversationMutation();
  const [storeMessage] = useStoreMessageMutation();
  const [storeMessageInConversation] = useStoreMessageInConversationMutation();
  const { data, isLoading } = useGetSingleConversationQuery(id);
  const { refetch: refetchConversations } = useGetUserConversationQuery(user?.userId);

  const [query, setQuery] = useState<string>("");
  const [conversation, setConversation] = useState<TConversation[]>([]);
  const [conversationId, setConversationId] = useState<string>(id || "");

  const healthKeywords = getHealthKeywords();

  useEffect(() => {
    setConversationId(id || "");
  }, [id]);

  const handleSend = async () => {
    if (!query.trim()) return;

    setConversation((prev) => [
      ...prev,
      { userQuery: query, reply: "", loading: true },
    ]);

    const filterQuery = healthKeywords.some((keyword) => new RegExp(keyword, "i").test(query));

    if (!filterQuery) {
      setConversation((prev) =>
        prev.map((msg, index) =>
          index === prev.length - 1
            ? { ...msg, reply: "I can only assist with health-related queries. Sorry!", loading: false }
            : msg
        )
      );
      setQuery("");
    } else {
      // Generative AI and Conversation Handling Logic
      try {
        const result = await model.generateContent(query);
        const response = await result.response;
        const text = await response.text();

        if (text && !conversationId) {
          const newConversation = { userId: user.userId, title: query };
          const created = await createConversation(newConversation);
          if (created.data) {
            const newId = created.data.data._id;
            setConversationId(newId);
            await refetchConversations();
            await storeMessageInConversationLogic(newId, text);
          } else handleError(created);
        } else if (text && conversationId) {
          await storeMessageInConversationLogic(conversationId, text);
        }
        updateConversationWithReply(text);
      } catch (error) {
        Swal.fire({ title: "Error", text: "Failed to fetch response", icon: "error" });
      }
    }
    setQuery("");
  };

  const storeMessageInConversationLogic = async (convId: string, text: string) => {
    const payload = { userId: user.userId, conversationId: convId, query, answer: text };
    const storedMessage = await storeMessage(payload);
    if (storedMessage.data) {
      const messagePayload = { id: convId, messageId: storedMessage.data.data._id };
      await storeMessageInConversation(messagePayload);
    } else handleError(storedMessage);
  };

  const updateConversationWithReply = (reply: string) => {
    setConversation((prev) =>
      prev.map((msg, index) => (index === prev.length - 1 ? { ...msg, reply, loading: false } : msg))
    );
  };

  const handleError = (errorResponse: any) => {
    Swal.fire({ title: "Error", text: errorResponse.error?.data.message || "An error occurred", icon: "error" });
  };

  const handleNewConversation = () => {
    setConversation([]);
    setConversationId("");
    navigate("/chat");
  };

  if (user?.status < 100) {
    Swal.fire("You must complete your profile....");
    navigate("/dashboard/profile");
  }

  return (
    <div className="flex flex-col md:flex-row gap-3">
      <aside className="w-full md:w-1/4 bg-gray-200 p-4 h-64 md:h-screen overflow-y-auto md:sticky top-0">
        <ChatSideBar handleNewConversation={handleNewConversation} activeConversationId={conversationId} />
      </aside>

      <main className="flex-1 flex flex-col bg-gray-50">
        <div className="flex-1 overflow-y-auto px-4 py-6 h-64 md:h-auto">
          {id && !isLoading && data?.data?.messages.map((message: any) => (
            <Message key={message._id} userQuery={message.query} reply={message.answer} loading={false} />
          ))}
          {conversation.map((conv, index) => (
            <Message key={index} userQuery={conv.userQuery} reply={conv.reply} loading={conv.loading} />
          ))}
        </div>

        <footer className="sticky bottom-0 bg-white p-4 border-t">
          <div className="flex items-center space-x-3">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask your assistant..."
              className="flex-1 rounded-lg shadow-sm border-gray-300"
            />
            <Button onClick={handleSend} className="rounded-full p-3 bg-blue-600 text-white">
              <FaLocationArrow />
            </Button>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Chat;
