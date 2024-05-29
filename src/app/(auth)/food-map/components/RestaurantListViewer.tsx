import { SearchKeywordResponse } from "@/types/apiTypes";
import formatDistance from "@/utils/formatDistance";
import formatCategoryName from "@/utils/splitCategory";

interface RestaurantListViewerProps {
  restaurantsData: SearchKeywordResponse["documents"] | undefined;
}

export default function RestaurantListViewer({
  restaurantsData,
}: RestaurantListViewerProps) {
  return (
    <div className="relative hidden h-full w-[460px] overflow-hidden rounded-xl bg-neutral-100 xl:block">
      <div className="absolute flex h-full w-full flex-col items-center overflow-y-auto pb-10 pt-6">
        <h3 className="mb-3 py-3 text-[30px] font-semibold">식당 목록</h3>
        <div className="flex w-full flex-col items-center">
          {restaurantsData?.map((data) => (
            <RestaurantListItem key={data.id} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
}

const RestaurantListItem = ({
  data,
}: {
  data: SearchKeywordResponse["documents"][number];
}) => {
  return (
    <div className="flex w-full cursor-pointer flex-col px-12 py-4 hover:bg-white">
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
