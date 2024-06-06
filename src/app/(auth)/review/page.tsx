import RecoilWrapper from "@/components/RecoilWrapper";
import ReviewPreview from "@/components/ReviewPreview";
import db from "@/libs/db";
import getSession from "@/libs/session";
import { formatToTimeAgo } from "@/utils/formatToTimeAgo";

const getReviewData = async () => {
  const session = await getSession();
  const user = session.user;

  const reviews = await db.review.findMany({
    select: {
      id: true,
      user: {
        select: { nickname: true },
      },
      restaurant: {
        select: { name: true, id: true },
      },
      rating: true,
      createdAt: true,
      content: true,
      likes: { where: { userId: user?.id } },
      _count: {
        select: {
          likes: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return reviews;
};

export default async function ReviewPage() {
  const reviewData = await getReviewData();

  return (
    <main className="p flex w-full flex-1 justify-center px-48 py-20">
      <div className="min-h-[1400px] w-full max-w-[1200px] space-y-8 rounded-3xl bg-neutral-50 px-32 py-20">
        <div className="flex flex-col">
          <span className="text-[50px] font-semibold">리뷰</span>
          <span className="text-[18px]">최신순</span>
        </div>
        <RecoilWrapper>
          {reviewData.map((data, index) => (
            <ReviewPreview
              key={index}
              reviewId={data.id}
              author={data.user.nickname}
              formattedData={formatToTimeAgo(data.createdAt.toString())}
              content={data.content}
              heartCount={data._count.likes}
              restaurantName={data.restaurant.name}
              restaurantId={data.restaurant.id}
              rate={data.rating}
              isLike={data.likes.length > 0}
            />
          ))}
        </RecoilWrapper>
      </div>
    </main>
  );
}
