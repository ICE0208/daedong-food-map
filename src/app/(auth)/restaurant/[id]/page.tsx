import db from "@/libs/db";
import formatCategoryName from "@/utils/splitCategory";
import { redirect } from "next/navigation";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const { id } = params;

  const data = await db.restaurant.findUnique({
    where: {
      id: +id,
    },
  });

  if (!data) {
    console.error("해당 식당 id가 db에 없음");
    return redirect("/");
  }

  return (
    <main className="flex w-full flex-1 px-32 py-12">
      <div className="relative flex w-full gap-8">
        <div className="relative w-full overflow-hidden rounded-xl bg-neutral-50 p-14">
          <div className="flex gap-8">
            {/* 관련 이미지 */}
            <div className="size-[200px] rounded-md bg-gray-200" />
            {/* 식당 정보 */}
            <div className="flex flex-col py-4">
              <h1 className="mb-2 text-[42px] font-semibold ">{data.name}</h1>
              <span className="flex-1 text-lg leading-[0px]">
                {formatCategoryName(data.category)}
              </span>
              <span className="text-[20px]">{data.address}</span>
              <span className="text-[20px]">{data.phone}</span>
            </div>
          </div>
        </div>
        {/* ------- */}
        <div className="relative w-[600px] overflow-hidden rounded-xl bg-neutral-50"></div>
      </div>
    </main>
  );
}
