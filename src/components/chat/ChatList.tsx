/* eslint-disable @typescript-eslint/no-explicit-any */
import useDecodedToken from "@/hook/useDecodedToken";
import { useGetUserConversationQuery } from "@/redux/api/message/messageApi";
import Spinner from "../ui/Spinner";
import { Link } from "react-router-dom";

const ChatList = () => {
  const user: any = useDecodedToken();
  const { data, isLoading } = useGetUserConversationQuery(user?.userId);
  // console.log(data);
  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <ul className="space-y-3">
          {data?.data.map((item: any) => (
            <li key={item._id} className="font-medium">
              <Link to={`/chat/${item._id}`}>{item?.title?.slice(0,25).toString()}...</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatList;
