import { formatToTimeAgo } from "@/utils/formatToTimeAgo";
import { Talk } from "../page";
import Comment from "./Comment";

interface CommentWithRepliesProps {
  activeState: [number, React.Dispatch<React.SetStateAction<number>>];
  comment: Talk["talkComments"][number];
}

export default function CommentWithReplies({
  activeState,
  comment,
}: CommentWithRepliesProps) {
  return (
    <div className="space-y-3">
      <Comment
        activeState={activeState}
        commentId={comment.id}
        author={comment.user.nickname}
        createdAt={comment.createdAt}
        content={comment.content}
        heartCount={comment._count.likes}
        activeReply={true}
      />
      {comment.talkCommentReplies.map((reply, index) => {
        return (
          <div key={index} className="pl-[120px]">
            <Comment
              activeState={activeState}
              commentId={reply.id}
              author={reply.user.nickname}
              createdAt={reply.createdAt}
              content={reply.content}
              heartCount={reply._count.likes}
            />
          </div>
        );
      })}
    </div>
  );
}
