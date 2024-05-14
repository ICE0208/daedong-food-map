import Comment from "./Comment";

interface CommentWithRepliesProps {
  author: string;
  formattedData: string;
  content: string;
  heartCount: number;
  replies: {
    author: string;
    formattedData: string;
    content: string;
    heartCount: number;
  }[];
}

export default function CommentWithReplies({
  author,
  formattedData,
  content,
  heartCount,
  replies,
}: CommentWithRepliesProps) {
  return (
    <div className="space-y-3">
      <Comment
        author={author}
        formattedData={formattedData}
        content={content}
        heartCount={heartCount}
      />
      {replies.map((reply, index) => {
        return (
          <div key={index} className="pl-[120px]">
            <Comment
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
