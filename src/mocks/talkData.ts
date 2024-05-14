const talkData = [
  {
    talkId: 1,
    author: "빛나는 호랑이",
    formattedData: "24/04/12 - 19:21",
    content:
      "강남에서 점심, 저녁 모두 먹을거 같은데 맛집 추천 가능할까요?\n면 종류는 제외하고 추천 부탁드립니다.",
    heartCount: 5,
    commentCount: 12,
    recentComment: {
      author: "친절한 악어",
      content: "xxx 국밥집 저녁으로 아주 좋습니다~",
      formattedData: "24/04/12 - 21:17",
    },
    comments: [
      {
        commentId: 1,
        author: "친절한 악어",
        content: "xxx 국밥집 저녁으로 아주 좋습니다~",
        formattedData: "24/04/12 - 21:17",
        heartCount: 1,
        replies: [
          {
            commentId: 2,
            author: "활발한 잉어",
            content: "저도 여기 추천해요!",
            formattedData: "24/04/12 - 21:19",
            heartCount: 0,
          },
        ],
      },
      {
        commentId: 3,
        author: "맛있는 사슴",
        content: "yyy 식당 추천해드릴게요!",
        formattedData: "24/04/12 - 22:05",
        heartCount: 3,
        replies: [
          {
            commentId: 4,
            author: "활발한 잉어",
            content: "여기 맛있죠~",
            formattedData: "24/04/12 - 23:19",
            heartCount: 1,
          },
          {
            commentId: 5,
            author: "유연한 악어",
            content: "저는 개인적으로 별로였어요",
            formattedData: "24/04/12 - 23:47",
            heartCount: 0,
          },
        ],
      },
      {
        commentId: 6,
        author: "음식을 사랑하는 고양이",
        content: "zzz 맛집이 많은 곳이에요. 꼭 가보세요!",
        formattedData: "24/04/13 - 09:30",
        heartCount: 5,
        replies: [],
      },
      {
        commentId: 7,
        author: "식도락을 즐기는 강아지",
        content: "xxx 국밥집은 정말 맛있어요. 점심으로도 강추합니다.",
        formattedData: "24/04/13 - 11:45",
        heartCount: 2,
        replies: [],
      },
      // 추가 코멘트
    ],
  },
  {
    talkId: 2,
    author: "신비로운 사슴",
    formattedData: "24/04/13 - 10:45",
    content: "요즘 강남에서 유명한 디저트 카페 추천해주세요!",
    heartCount: 8,
    commentCount: 6,
    recentComment: {
      author: "매력적인 토끼",
      content: "yyy 카페 추천드릴게요~",
      formattedData: "24/04/13 - 11:00",
    },
    comments: [
      {
        commentId: 8,
        author: "매력적인 토끼",
        content: "yyy 카페 추천드릴게요~",
        formattedData: "24/04/13 - 11:00",
        heartCount: 1,
        replies: [],
      },
      {
        commentId: 9,
        author: "디저트 맛있는 물고기",
        content: "yyy 카페는 분위기도 좋고 디저트 맛도 최고에요.",
        formattedData: "24/04/13 - 12:30",
        heartCount: 4,
        replies: [],
      },
      {
        commentId: 10,
        author: "디저트 맛보기",
        content: "yyy 카페에서는 디저트 종류가 다양하게 있어요. 추천해요!",
        formattedData: "24/04/14 - 10:15",
        heartCount: 1,
        replies: [],
      },
      {
        commentId: 11,
        author: "디저트 파는 고양이",
        content: "yyy 카페는 디저트가 정말 맛있어요. 꼭 들러보세요!",
        formattedData: "24/04/14 - 14:00",
        heartCount: 2,
        replies: [],
      },
      // 추가 코멘트
    ],
  },
  {
    talkId: 3,
    author: "작은 별",
    formattedData: "24/04/14 - 15:30",
    content: "강남에서 야외 산책로가 있는 곳이 어디인지 아시나요?",
    heartCount: 3,
    commentCount: 9,
    recentComment: {
      author: "산책을 즐기는 고양이",
      content: "zzz 공원 추천드려요~",
      formattedData: "24/04/14 - 16:00",
    },
    comments: [
      {
        commentId: 12,
        author: "산책을 즐기는 고양이",
        content: "zzz 공원 추천드려요~",
        formattedData: "24/04/14 - 16:00",
        heartCount: 2,
        replies: [],
      },
      {
        commentId: 13,
        author: "자연을 사랑하는 강아지",
        content: "zzz 산책로가 있는 공원이 있어요. 꼭 가보세요!",
        formattedData: "24/04/14 - 17:30",
        heartCount: 1,
        replies: [],
      },
      {
        commentId: 14,
        author: "자연을 향하는 새",
        content: "zzz 산책로가 있는 공원에서 자연을 만끽하세요!",
        formattedData: "24/04/15 - 09:45",
        heartCount: 0,
        replies: [],
      },
      {
        commentId: 15,
        author: "산림욕을 즐기는 사슴",
        content: "zzz 숲 속을 산책하며 힐링할 수 있는 곳이에요.",
        formattedData: "24/04/15 - 11:20",
        heartCount: 5,
        replies: [],
      },
      // 추가 코멘트
    ],
  },
  {
    talkId: 4,
    author: "해맑은 바다",
    formattedData: "24/04/15 - 12:00",
    content: "강남에서 쇼핑하기 좋은 곳이 있을까요?",
    heartCount: 10,
    commentCount: 15,
    recentComment: {
      author: "쇼핑 마니아",
      content: "zzz 쇼핑몰 추천해드려요~",
      formattedData: "24/04/15 - 13:30",
    },
    comments: [
      {
        commentId: 16,
        author: "쇼핑 마니아",
        content: "zzz 쇼핑몰 추천해드려요~",
        formattedData: "24/04/15 - 13:30",
        heartCount: 2,
        replies: [],
      },
      {
        commentId: 17,
        author: "쇼핑 전문가",
        content: "zzz 강남에는 쇼핑 명소가 많아요. 다양한 쇼핑을 즐겨보세요!",
        formattedData: "24/04/15 - 14:45",
        heartCount: 3,
        replies: [],
      },
      {
        commentId: 18,
        author: "패션을 즐기는 고양이",
        content:
          "zzz 강남은 쇼핑하기 좋은 도시에요. 다양한 쇼핑 명소를 추천드려요!",
        formattedData: "24/04/16 - 10:00",
        heartCount: 5,
        replies: [],
      },
      {
        commentId: 19,
        author: "스타일리스트",
        content:
          "zzz 강남에는 유명 브랜드 쇼핑몰이 많아요. 스타일리시한 아이템을 찾아보세요!",
        formattedData: "24/04/16 - 12:15",
        heartCount: 1,
        replies: [],
      },
      // 추가 코멘트
    ],
  },
  {
    talkId: 5,
    author: "모험을 꿈꾸는 곰",
    formattedData: "24/04/16 - 09:00",
    content: "강남 근처에 볼 만한 관광지가 있을까요?",
    heartCount: 6,
    commentCount: 11,
    recentComment: {
      author: "여행을 즐기는 사자",
      content: "zzz 관광지 추천해요~",
      formattedData: "24/04/16 - 10:30",
    },
    comments: [
      {
        commentId: 20,
        author: "여행을 즐기는 사자",
        content: "zzz 관광지 추천해요~",
        formattedData: "24/04/16 - 10:30",
        heartCount: 2,
        replies: [],
      },
      {
        commentId: 21,
        author: "여행가",
        content: "zzz 강남에는 멋진 관광지가 많아요. 즐거운 여행 되세요!",
        formattedData: "24/04/16 - 11:45",
        heartCount: 3,
        replies: [],
      },
      {
        commentId: 22,
        author: "여행을 즐기는 고래",
        content: "zzz 강남에서 볼 만한 곳이 많이 있어요. 추천해드려요!",
        formattedData: "24/04/16 - 13:00",
        heartCount: 1,
        replies: [],
      },
      {
        commentId: 23,
        author: "지식을 찾는 동물",
        content:
          "zzz 강남의 유명한 관광 명소를 즐기세요. 풍부한 경험이 될 거예요!",
        formattedData: "24/04/17 - 09:30",
        heartCount: 0,
        replies: [],
      },
      // 추가 코멘트
    ],
  },
  // 추가 데이터 항목들도 마찬가지로 포함
];

export default talkData;
