import { SearchKeywordResponse } from "@/types/apiTypes";
import categoryToImageUrl from "@/utils/categoryToImageUrl";
import formatDistance from "@/utils/formatDistance";
import formatCategoryName from "@/utils/splitCategory";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface RestaurantListViewerProps {
  restaurantsData: SearchKeywordResponse["documents"] | undefined;
  setSelectedId: Dispatch<SetStateAction<string | null>>;
  setHoveredId: Dispatch<SetStateAction<string | null>>;
}

export default function RestaurantListViewer({
  restaurantsData,
  setSelectedId,
  setHoveredId,
}: RestaurantListViewerProps) {
  return (
    <div className="absolute right-4 z-50 hidden h-[96%] w-[320px] self-center overflow-hidden rounded-xl bg-neutral-100/90 shadow-xl xl:block">
      <div className="absolute flex h-full w-full flex-col items-center overflow-y-auto pb-10 pt-6">
        <h3 className="mb-3 py-3 text-[30px] font-semibold">식당 목록</h3>
        <div
          className="flex w-full flex-col items-center"
          onMouseLeave={() => setHoveredId(null)}
        >
          {restaurantsData?.map((data) => (
            <RestaurantListItem
              key={data.id}
              data={data}
              onClick={() => setSelectedId(data.id)}
              onMouseEnter={() => setHoveredId(data.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const RestaurantListItem = ({
  data,
  onClick,
  onMouseEnter,
}: {
  data: SearchKeywordResponse["documents"][number];
  onClick: () => void;
  onMouseEnter: () => void;
}) => {
  const imageUrl = categoryToImageUrl(data.category_name);

  return (
    <div
      className="lr-2 flex w-full cursor-pointer gap-3 py-4 pl-6 hover:bg-white"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      <div className="relative aspect-square h-[60px]">
        <Image
          src={imageUrl}
          alt={data.place_name}
          layout="fill"
          objectFit="cover"
          className="p-1"
        />
      </div>
      <div className="flex flex-col overflow-hidden">
        <span className="text-[20px] leading-6">{data.place_name}</span>
        <div className="overflow-hidden text-ellipsis text-nowrap text-[16px] font-extralight">
          {formatCategoryName(data.category_name)}
        </div>
        <span className="text-[14px] font-extralight">
          {formatDistance(Number(data.distance))}
        </span>
      </div>
    </div>
  );
};
