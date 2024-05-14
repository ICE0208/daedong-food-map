import RecoilWrapper from "@/components/RecoilWrapper";
import ReviewPreview from "@/components/ReviewPreview";
import { default as reviewMockData } from "@/mocks/reviewData";

const getReviewData = async () => {
  return reviewMockData;
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
              reviewId={data.reviewId}
              author={data.author}
              formattedData={data.formattedData}
              content={data.content}
              heartCount={data.heartCount}
              restaurantName={data.restaurantName}
              rate={data.rate}
            />
          ))}
        </RecoilWrapper>
      </div>
    </main>
  );
}
