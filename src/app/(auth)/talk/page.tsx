import TalkPreview from "@/components/TalkPreview";

export default function TalkPage() {
  return (
    <main className="flex justify-center px-24 py-8">
      <div className="flex w-full max-w-[800px] flex-col gap-4">
        {tempData.map((data, index) => (
          <TalkPreview
            key={index}
            author={data.author}
            formattedData={data.formattedData}
            content={data.content}
            heartCount={data.heartCount}
            commentCount={data.commentCount}
            recentComment={data.recentComment}
          />
        ))}
      </div>
    </main>
  );
}

const tempData = [
  {
    author: "빛나는 호랑이",
    formattedData: "24/04/12 - 19:21",
    content:
      "강남에서 점심, 저녁 모두 먹을거 같은데 맛집 추천 가능할까요?\n면 종류는 제외하고 추천 부탁드립니다.",
    heartCount: 5,
    commentCount: 12,
    recentComment: {
      author: "친절한 악어",
      content: "xxx 국밥집 저녁으로 아주 좋습니다~",
    },
  },
  {
    author: "신비로운 사슴",
    formattedData: "24/04/13 - 10:45",
    content: "요즘 강남에서 유명한 디저트 카페 추천해주세요!",
    heartCount: 8,
    commentCount: 6,
    recentComment: {
      author: "매력적인 토끼",
      content: "yyy 카페 추천드릴게요~",
    },
  },
  {
    author: "작은 별",
    formattedData: "24/04/14 - 15:30",
    content: "강남에서 야외 산책로가 있는 곳이 어디인지 아시나요?",
    heartCount: 3,
    commentCount: 9,
    recentComment: {
      author: "산책을 즐기는 고양이",
      content: "zzz 공원 추천드려요~",
    },
  },
  {
    author: "해맑은 바다",
    formattedData: "24/04/15 - 12:00",
    content: "강남에서 쇼핑하기 좋은 곳이 있을까요?",
    heartCount: 10,
    commentCount: 15,
    recentComment: {
      author: "쇼핑 마니아",
      content: "zzz 쇼핑몰 추천해드려요~",
    },
  },
  {
    author: "모험을 꿈꾸는 곰",
    formattedData: "24/04/16 - 09:00",
    content: "강남 근처에 볼 만한 관광지가 있을까요?",
    heartCount: 6,
    commentCount: 11,
    recentComment: {
      author: "여행을 즐기는 사자",
      content: "zzz 관광지 추천해요~",
    },
  },
];
