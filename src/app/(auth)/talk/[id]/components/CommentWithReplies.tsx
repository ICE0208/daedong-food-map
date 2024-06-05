import { formatToTimeAgo } from "@/utils/formatToTimeAgo";
import { Talk } from "../page";
import Comment from "./Comment";

interface CommentWithRepliesProps {
  curUserId?: string;
  activeState: [number, React.Dispatch<React.SetStateAction<number>>];
  comment: Talk["talkComments"][number];
}

export default function CommentWithReplies({
  curUserId,
  activeState,
  comment,
}: CommentWithRepliesProps) {
  return (
    <div className="space-y-3">
      <Comment
        activeState={activeState}
        commentId={comment.id}
        author={comment.user.nickname}
        authorId={comment.user.id}
        createdAt={comment.createdAt}
        content={comment.content}
        heartCount={comment._count.likes}
        activeReply={true}
        curUserId={curUserId}
        isLike={comment.likes.length > 0}
      />
      {comment.talkCommentReplies.map((reply, index) => {
        return (
          <div key={index} className="pl-[120px]">
            <Comment
              type="REPLY"
              activeState={activeState}
              commentId={reply.id}
              author={reply.user.nickname}
              authorId={comment.user.id}
              createdAt={reply.createdAt}
              content={reply.content}
              heartCount={reply._count.likes}
              isLike={reply.likes.length > 0}
            />
          </div>
        );
      })}
    </div>
  );
}
