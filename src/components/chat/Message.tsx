// import ReactMarkdown from "react-markdown";
// import TypingAnimation from "./TypingAnimation";
// const Message = ({
//   userQuery,
//   reply,
//   loading,
// }: {
//   userQuery: string;
//   reply: string;
//   loading: boolean;
// }) => {
//   return (
//     <div className="flex-1 space-y-5 p-4">
//       {/* User's query */}
//       {userQuery && (
//         <>
//           <div className="bg-slate-100 rounded-md w-3/4 ml-auto p-2">
//             <p>{userQuery}</p>
//           </div>
//           {/* AI reply */}
//           {loading ? (
//             <TypingAnimation />
//           ) : (
//             <div className="bg-slate-100 rounded-md p-2">
//               <ReactMarkdown>{reply}</ReactMarkdown>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Message;


import ReactMarkdown from "react-markdown";
import TypingAnimation from "./TypingAnimation";
import { TConversation } from "@/types";

const Message = ({ userQuery, reply, loading }: TConversation) => {
  return (
    <div className="flex flex-col space-y-4 p-4">
      {/* User's query bubble */}
      {userQuery && (
        <div className="self-end bg-blue-500 text-white rounded-lg w-auto max-w-[75%] p-3 shadow-md">
          <p className="text-sm">{userQuery}</p>
        </div>
      )}

      {/* AI reply bubble */}
      {loading ? (
        <div className="self-start bg-gray-200 rounded-lg w-auto max-w-[75%] p-3 shadow-md">
          <TypingAnimation />
        </div>
      ) : (
        reply && (
          <div className="self-start bg-gray-200 rounded-lg w-auto max-w-[75%] p-4 shadow-md">
            <ReactMarkdown className="text-sm text-gray-800">{reply}</ReactMarkdown>
          </div>
        )
      )}
    </div>
  );
};

export default Message;


