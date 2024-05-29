import { SearchKeywordResponse } from "@/types/apiTypes";
import formatCategoryName from "@/utils/splitCategory";
import { Roadview } from "react-kakao-maps-sdk";

interface ModalProps {
  selectedId: string;
  onExit: () => void;
  data?: SearchKeywordResponse["documents"][number];
}

const Modal = ({ selectedId, onExit, data }: ModalProps) => {
  if (!data) return <div>Error</div>;

  console.log(data);

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-[#00000096] p-12">
      <div
        className="absolute left-0 top-0 -z-10 h-full w-full"
        onClick={onExit}
      ></div>
      <div className="flex w-[1200px] flex-col items-center overflow-hidden rounded-3xl bg-neutral-100 px-8 py-10">
        <h1 className="mb-2 text-3xl font-semibold">{data.place_name}</h1>
        <span className="text-lg">{data.road_address_name}</span>
        <span className="text-lg">{data.phone}</span>
        <span className="text-lg">
          {formatCategoryName(data.category_name)}
        </span>
        <div className="h-[500px] w-full p-4">
          <Roadview
            className="h-full w-full rounded-2xl"
            position={{ lat: Number(data.y), lng: Number(data.x), radius: 50 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
