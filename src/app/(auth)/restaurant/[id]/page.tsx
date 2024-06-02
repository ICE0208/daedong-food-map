import BlueSubmitButton from "@/components/buttons/BlueSubmitButton";
import db from "@/libs/db";
import formatCategoryName from "@/utils/splitCategory";
import { redirect } from "next/navigation";
import { deleteReview, getMyReview, submitReview } from "./actions";
import RedTextSubmitButton from "@/components/buttons/RedTextSubmitButton";

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

  const myReview = await getMyReview(id);
  console.log(myReview);

  const submitReviewWithRestaurantIdId = submitReview.bind(null, id);

  return (
    <main className="flex w-full flex-1 px-32 py-12">
      <div className="relative flex w-full gap-8">
        <div className="relative w-full overflow-hidden rounded-xl bg-neutral-50 p-14">
          {/* 식당 정보 */}
          <div className="flex gap-8">
            {/* 관련 이미지 */}
            <div className="size-[200px] rounded-md bg-gray-200" />
            {/* 식당 데이터 */}
            <div className="flex flex-col py-4">
              <h1 className="mb-2 text-[42px] font-semibold ">{data.name}</h1>
              <span className="flex-1 text-lg leading-[0px]">
                {formatCategoryName(data.category)}
              </span>
              <span className="text-[20px]">{data.address}</span>
              <span className="text-[20px]">{data.phone}</span>
            </div>
          </div>
          {myReview ? (
            // 내 리뷰
            <form
              action={async () => {
                "use server";
                await deleteReview(id);
              }}
              className="mt-8"
            >
              <h2 className="mb-4 text-3xl font-semibold">내 리뷰</h2>
              <div className="mb-4">
                <span className="mr-2 text-lg">평점: {myReview.rating}</span>
              </div>
              <div className="">
                <textarea
                  key="myreview-textarea"
                  name="content"
                  value={myReview.content}
                  className="w-full resize-none rounded-lg border p-2"
                  rows={4}
                  placeholder="리뷰 내용을 입력하세요"
                  required
                  disabled
                ></textarea>
              </div>
              <RedTextSubmitButton text="삭제" />
            </form>
          ) : (
            // 리뷰 작성하는 곳
            <form action={submitReviewWithRestaurantIdId} className="mt-8">
              <h2 className="mb-4 text-3xl font-semibold">리뷰 작성</h2>
              <div className="mb-4">
                <span className="mr-2 text-lg">평점:</span>
                {[1, 2, 3, 4, 5].map((value) => (
                  <label key={value} className="mr-2">
                    <input
                      name="rate"
                      type="radio"
                      value={value}
                      className="mr-1"
                      required
                    />
                    {value}
                  </label>
                ))}
              </div>
              <div className="mb-4">
                <textarea
                  key="newreview-textarea"
                  name="content"
                  className="w-full resize-none rounded-lg border p-2"
                  rows={4}
                  placeholder="리뷰 내용을 입력하세요"
                  required
                ></textarea>
              </div>
              <BlueSubmitButton text="제출" />
            </form>
          )}
        </div>
        {/* ------- */}
        <div className="relative w-[600px] overflow-hidden rounded-xl bg-neutral-50"></div>
      </div>
    </main>
  );
}
