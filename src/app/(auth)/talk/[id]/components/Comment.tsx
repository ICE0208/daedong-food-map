import SVGButton from "@/components/SVGButton";
import EtcButton from "@/components/buttons/EtcButton";
import HeartSVG from "@/icons/HeartSVG";

interface CommentProps {
  activeState: [number, React.Dispatch<React.SetStateAction<number>>];
  commentId: number;
  author: string;
  formattedData: string;
  content: string;
  heartCount: number;
}

export default function Comment({
  activeState,
  commentId,
  author,
  formattedData,
  content,
  heartCount,
}: CommentProps) {
  const [activeId, setActiveId] = activeState;

  return (
    <div className="flex flex-col rounded-xl bg-neutral-50 px-6 py-5">
      <div className="flex items-center gap-2">
        <div className="aspect-square w-10 flex-none rounded-full bg-blue-300"></div>
        <div className="flex flex-1 flex-col overflow-hidden">
          <span className="overflow-hidden text-ellipsis text-[18px] font-semibold leading-6">
            {author}
          </span>
          <span className="text-[12px]">{formattedData}</span>
        </div>
        <div className="flex-none">
          <EtcButton
            id="comment-etc-button"
            size={5}
            onClick={() => setActiveId(commentId)}
            // ! 테스트용 type 지정, 추후 수정 필요
            type={author === "친절한 악어" ? "OWNER" : "VIEWER"}
            isModalActive={commentId === activeId}
            reportFn={() => console.log(`댓글 (${commentId})를 신고합니다.`)}
            editFn={() => console.log(`댓글 (${commentId})를 수정합니다.`)}
            deleteFn={() => console.log(`댓글 (${commentId})를 삭제합니다.`)}
          />
        </div>
      </div>
      <div className="my-[4px]" />
      <span className="whitespace-pre-wrap break-words">{content}</span>
      <div className="my-[2px]" />
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-[2px]">
          <SVGButton svg={HeartSVG} size={5} color="rgb(252, 84, 151)" />
          <span>{heartCount}</span>
        </div>
      </div>
    </div>
  );
}
