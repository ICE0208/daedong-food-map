import { SearchKeywordResponse } from "@/types/apiTypes";
import formatCategoryName from "@/utils/splitCategory";

interface ModalProps {
  selectedId: string;
  onExit: () => void;
  data?: SearchKeywordResponse["documents"][number];
}

const Modal = ({ selectedId, onExit, data }: ModalProps) => {
  if (!data) return <div>Error</div>;

  console.log(data);

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-[#00000096]">
      <div
        className="absolute left-0 top-0 -z-10 h-full w-full"
        onClick={onExit}
      ></div>
      <div className="flex h-[600px] w-[800px] flex-col items-center overflow-hidden rounded-3xl bg-neutral-100 p-12">
        <h1 className="text-3xl font-semibold">{data.place_name}</h1>
        <span>{formatCategoryName(data.category_name)}</span>
        <span>연락처: {data.phone}</span>
        <span>주소: {data.road_address_name}</span>
      </div>
    </div>
  );
};

export default Modal;
