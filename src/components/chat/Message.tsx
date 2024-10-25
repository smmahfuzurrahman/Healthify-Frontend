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

const Message = ({
  userQuery,
  reply,
  loading,
}: TConversation) => {
  return (
    <div className="flex-1 space-y-5 p-4">
      {/* User's query */}
      {userQuery && (
        <div className="bg-slate-100 rounded-md w-3/4 ml-auto p-2">
          <p>{userQuery}</p>
        </div>
      )}

      {/* AI reply or loading */}
      {loading ? (
        <div className="bg-slate-100 rounded-md p-2">
          <TypingAnimation />
        </div>
      ) : (
        reply && (
          <div className="bg-slate-100 rounded-md p-5">
            <ReactMarkdown>{reply}</ReactMarkdown>
          </div>
        )
      )}
    </div>
  );
};

export default Message;

