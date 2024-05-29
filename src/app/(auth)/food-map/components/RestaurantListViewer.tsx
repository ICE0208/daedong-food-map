import { SearchKeywordResponse } from "@/types/apiTypes";
import formatDistance from "@/utils/formatDistance";
import formatCategoryName from "@/utils/splitCategory";
import { Dispatch, SetStateAction } from "react";

interface RestaurantListViewerProps {
  restaurantsData: SearchKeywordResponse["documents"] | undefined;
  setSelectedId: Dispatch<SetStateAction<string | null>>;
}

export default function RestaurantListViewer({
  restaurantsData,
  setSelectedId,
}: RestaurantListViewerProps) {
  return (
    <div className="relative hidden h-full w-[460px] overflow-hidden rounded-xl bg-neutral-100 xl:block">
      <div className="absolute flex h-full w-full flex-col items-center overflow-y-auto pb-10 pt-6">
        <h3 className="mb-3 py-3 text-[30px] font-semibold">식당 목록</h3>
        <div className="flex w-full flex-col items-center">
          {restaurantsData?.map((data) => (
            <RestaurantListItem
              key={data.id}
              data={data}
              onClick={() => setSelectedId(data.id)}
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
}: {
  data: SearchKeywordResponse["documents"][number];
  onClick: () => void;
}) => {
  return (
    <div
      className="flex w-full cursor-pointer flex-col px-12 py-4 hover:bg-white"
      onClick={onClick}
    >
      <span className="text-[20px] leading-6">{data.place_name}</span>
      <span className="text-[16px] font-extralight">
        {formatCategoryName(data.category_name)}
      </span>
      <span className="text-[14px] font-extralight">
        {formatDistance(Number(data.distance))}
      </span>
    </div>
  );
};
