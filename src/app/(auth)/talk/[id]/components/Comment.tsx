interface CommentProps {
  author: string;
  formattedData: string;
  content: string;
}

export default function Comment({
  author,
  formattedData,
  content,
}: CommentProps) {
  return (
    <div className="flex flex-col rounded-xl bg-neutral-50 px-6 py-5">
      <span className="text-[18px] font-semibold leading-6">{author}</span>
      <span className="text-[12px]">{formattedData}</span>
      <span className="whitespace-pre-wrap break-words">{content}</span>
    </div>
  );
}
