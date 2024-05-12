import ReviewPreview from "@/components/ReviewPreview";
import TalkPreview from "@/components/TalkPreview";

export default function ReviewPage() {
  return (
    <main className="flex justify-center px-24 py-8">
      <div className="flex w-full max-w-[800px] flex-col gap-4">
        {tempData.map((data, index) => (
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

const tempData = [
  {
    author: "빛나는 호랑이",
    restaurantName: "xxx 국밥집",
    rate: 4,
    formattedData: "24/04/15 - 15:03",
    content: "맛은 있는데, 사장님이 조금 불친절하신 것 같네요.",
    heartCount: 5,
  },
  {
    author: "떠돌이 코끼리",
    restaurantName: "xx 규동",
    rate: 5,
    formattedData: "24/04/15 - 17:02",
    content: "너무 맛있네요.",
    heartCount: 9,
  },
  {
    author: "길 잃은 고양이",
    restaurantName: "OO 카페",
    rate: 3,
    formattedData: "24/04/16 - 12:30",
    content: "분위기는 좋지만 음료 가격이 조금 비싸요.",
    heartCount: 3,
  },
  {
    author: "산책하는 강아지",
    restaurantName: "OO 브런치",
    rate: 4,
    formattedData: "24/04/17 - 10:15",
    content: "뷰가 좋고 음식 맛도 괜찮아요.",
    heartCount: 6,
  },
  {
    author: "빵을 찾는 다람쥐",
    restaurantName: "OO 빵집",
    rate: 5,
    formattedData: "24/04/18 - 14:55",
    content: "크로와상이 정말 맛있어요!",
    heartCount: 10,
  },
  {
    author: "책을 읽는 도깨비",
    restaurantName: "OO 도서관 카페",
    rate: 4,
    formattedData: "24/04/19 - 16:20",
    content: "조용하고 분위기가 좋아요. 커피도 맛있습니다.",
    heartCount: 7,
  },
  {
    author: "산책하는 산양",
    restaurantName: "OO 산속 식당",
    rate: 5,
    formattedData: "24/04/20 - 18:45",
    content: "자연 속에서 식사하니 너무 좋았어요. 음식도 훌륭했습니다.",
    heartCount: 8,
  },
  {
    author: "빛나는 별",
    restaurantName: "OO 스테이크집",
    rate: 4,
    formattedData: "24/04/21 - 21:10",
    content: "고기가 부드럽고 맛있어요. 다음에 또 방문하고 싶습니다.",
    heartCount: 6,
  },
  {
    author: "하늘을 날다 새",
    restaurantName: "OO 해산물 요리",
    rate: 5,
    formattedData: "24/04/22 - 13:45",
    content: "해산물이 신선하고 조리가 정말 잘 되어 있어요. 강추합니다!",
    heartCount: 12,
  },
];
