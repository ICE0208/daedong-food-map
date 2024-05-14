import Comment from "./Comment";

interface CommentWithRepliesProps {
  activeState: [number, React.Dispatch<React.SetStateAction<number>>];
  commentId: number;
  author: string;
  formattedData: string;
  content: string;
  heartCount: number;
  replies: {
    commentId: number;
    author: string;
    formattedData: string;
    content: string;
    heartCount: number;
  }[];
}

export default function CommentWithReplies({
  activeState,
  commentId,
  author,
  formattedData,
  content,
  heartCount,
  replies,
}: CommentWithRepliesProps) {
  return (
    <div className="space-y-3">
      <Comment
        activeState={activeState}
        commentId={commentId}
        author={author}
        formattedData={formattedData}
        content={content}
        heartCount={heartCount}
      />
      {replies.map((reply, index) => {
        return (
          <div key={index} className="pl-[120px]">
            <Comment
              activeState={activeState}
              commentId={reply.commentId}
              author={reply.author}
              formattedData={reply.formattedData}
              content={reply.content}
              heartCount={reply.heartCount}
            />
          </div>
        );
      })}
    </div>
  );
}
