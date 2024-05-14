import SVGButton from "@/components/SVGButton";
import HeartSVG from "@/icons/HeartSVG";

interface CommentProps {
  author: string;
  formattedData: string;
  content: string;
  heartCount: number;
}

export default function Comment({
  author,
  formattedData,
  content,
  heartCount,
}: CommentProps) {
  return (
    <div className="flex flex-col rounded-xl bg-neutral-50 px-6 py-5">
      <span className="text-[18px] font-semibold leading-6">{author}</span>
      <span className="text-[12px]">{formattedData}</span>
      <span className="whitespace-pre-wrap break-words">{content}</span>
      <div className="my-1" />
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-[1px]">
          <SVGButton svg={HeartSVG} size={5} color="rgb(252, 84, 151)" />
          <span>{heartCount}</span>
        </div>
      </div>
    </div>
  );
}
