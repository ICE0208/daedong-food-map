import RecoilWrapper from "@/components/RecoilWrapper";
import ReviewPreview from "@/components/ReviewPreview";
import db from "@/libs/db";
import { formatToTimeAgo } from "@/utils/formatToTimeAgo";

const getReviewData = async () => {
  const reviews = await db.review.findMany({
    select: {
      id: true,
      user: {
        select: { nickname: true },
      },
      restaurant: {
        select: { name: true },
      },
      rating: true,
      createdAt: true,
      content: true,
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
    <main className="flex justify-center px-24 py-8">
      <div className="flex w-full max-w-[800px] flex-col gap-4">
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
              rate={data.rating}
            />
          ))}
        </RecoilWrapper>
      </div>
    </main>
  );
}
