import ReviewPreview from "@/components/ReviewPreview";
import TalkPreview from "@/components/TalkPreview";
import reviewData from "@/mocks/reviewData";

export default function ReviewPage() {
  return (
    <main className="flex justify-center px-24 py-8">
      <div className="flex w-full max-w-[800px] flex-col gap-4">
        {reviewData.map((data, index) => (
          <ReviewPreview
            key={index}
            author={data.author}
            formattedData={data.formattedData}
            content={data.content}
            heartCount={data.heartCount}
            restaurantName={data.restaurantName}
            rate={data.rate}
          />
        ))}
      </div>
    </main>
  );
}
