import { SearchKeywordResponse } from "@/types/apiTypes";

interface RestaurantListViewerProps {
  restaurantsData: SearchKeywordResponse["documents"] | undefined;
}

export default function RestaurantListViewer({
  restaurantsData,
}: RestaurantListViewerProps) {
  return (
    <div className="relative hidden h-full w-[460px] overflow-auto rounded-xl bg-neutral-100 xl:block">
      <div className="absolute flex w-full flex-col items-center gap-4 p-12">
        {restaurantsData?.map((data) => (
          <span key={data.id} className="text-[24px]">
            {data.place_name}
          </span>
        ))}
      </div>
    </div>
  );
}
