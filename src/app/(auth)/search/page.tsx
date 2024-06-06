"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  SearchReview,
  SearchTalk,
  searchReviewAction,
  searchTalkAction,
} from "./actions";
import { RecoilRoot } from "recoil";
import TalkPreview from "@/components/TalkPreview";
import ReviewPreview from "@/components/ReviewPreview";

// 공통 타입 정의
type SearchItem = SearchTalk[number] | SearchReview[number];

function isSearchTalk(item: SearchItem): item is SearchTalk[number] {
  return (item as SearchTalk[number]).type === "TALK";
}

function SearchPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get("query") ?? "";

  const [searchTalk, setSearchTalk] = useState<SearchTalk>([]);
  const [searchReview, setSearchReview] = useState<SearchReview>([]);
  const [combinedResults, setCombinedResults] = useState<SearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      const [talkResults, reviewResults] = await Promise.all([
        searchTalkAction(search),
        searchReviewAction(search),
      ]);

      setSearchTalk(talkResults);
      setSearchReview(reviewResults);

      const combined: SearchItem[] = [...talkResults, ...reviewResults].sort(
        (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
      );

      setCombinedResults(combined);
      setIsLoading(false);
    };

    fetchSearchResults();
  }, [search]);

  const [selectedButton, setSelectedButton] = useState<
    "search-talk" | "search-review" | "combined"
  >("combined");

  return (
    <main className="p flex w-full flex-1 justify-center px-48 py-20">
      <div className="min-h-[1400px] w-full max-w-[1200px] rounded-3xl bg-neutral-50 p-20">
        <div className="flex flex-col">
          <span className="text-[50px] font-semibold">{search}</span>
          <span className="text-[18px]">검색 결과</span>
        </div>
        <div className="my-8" />
        {/* Buttons */}
        <div className="flex gap-3">
          <Button
            text="전체 보기"
            selected={selectedButton === "combined"}
            onClick={() => setSelectedButton("combined")}
          />
          <Button
            text="검색 된 잡담"
            selected={selectedButton === "search-talk"}
            onClick={() => setSelectedButton("search-talk")}
          />
          <Button
            text="검색 된 리뷰"
            selected={selectedButton === "search-review"}
            onClick={() => setSelectedButton("search-review")}
          />
        </div>
        <div className="my-8" />
        {/* Contents */}
        {isLoading ? (
          <LoadingContent text="로딩 중입니다..." />
        ) : (
          <>
            {selectedButton === "search-talk" &&
              (searchTalk.length > 0 ? (
                <div className="space-y-8">
                  {searchTalk.map((talk) => (
                    <TalkPreview
                      author={talk.user.nickname}
                      content={talk.content}
                      formattedData={talk.convertedDate}
                      talkId={talk.id}
                      key={talk.id}
                      isLike={talk.likes.length > 0}
                      commentCount={talk._count.talkComments}
                      heartCount={talk._count.likes}
                      recentComment={talk.talkComments[0]}
                    />
                  ))}
                </div>
              ) : (
                <NotContent text="검색된 잡담이 없습니다. 🥺" />
              ))}
            {selectedButton === "search-review" &&
              (searchReview.length > 0 ? (
                <div className="space-y-8">
                  {searchReview.map((review) => (
                    <ReviewPreview
                      key={review.id}
                      author={review.user.nickname}
                      content={review.content}
                      formattedData={review.convertedDate}
                      isLike={review.likes.length > 0}
                      heartCount={review._count.likes}
                      rate={review.rating}
                      restaurantName={review.restaurant.name}
                      reviewId={review.id}
                    />
                  ))}
                </div>
              ) : (
                <NotContent text="검색된 리뷰가 없습니다. 🥺" />
              ))}
            {selectedButton === "combined" &&
              (combinedResults.length > 0 ? (
                <div className="space-y-8">
                  {combinedResults.map((item: SearchItem) =>
                    isSearchTalk(item) ? (
                      <TalkPreview
                        author={item.user.nickname}
                        content={item.content}
                        formattedData={item.convertedDate}
                        talkId={item.id}
                        key={item.id}
                        isLike={item.likes.length > 0}
                        commentCount={item._count.talkComments}
                        heartCount={item._count.likes}
                        recentComment={item.talkComments[0]}
                      />
                    ) : (
                      <ReviewPreview
                        key={item.id}
                        author={item.user.nickname}
                        content={item.content}
                        formattedData={item.convertedDate}
                        isLike={item.likes.length > 0}
                        heartCount={item._count.likes}
                        rate={item.rating}
                        restaurantName={item.restaurant.name}
                        reviewId={item.id}
                      />
                    ),
                  )}
                </div>
              ) : (
                <NotContent text="검색된 내용이 없습니다. 🥺" />
              ))}
          </>
        )}
      </div>
    </main>
  );
}

const Button = ({
  text,
  selected,
  onClick,
}: {
  text: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <div
    className="cursor-pointer rounded-2xl border-[3px] border-[#7d92ff] px-4 py-1 font-medium"
    onClick={onClick}
    style={selected ? { backgroundColor: "rgb(170, 204, 255)" } : {}}
  >
    {text}
  </div>
);

const NotContent = ({ text }: { text: string }) => (
  <div className="flex h-[300px] items-center justify-center">
    <span className="text-2xl">{text}</span>
  </div>
);

const LoadingContent = ({ text }: { text: string }) => (
  <div className="flex h-[300px] items-center justify-center">
    <span className="text-2xl">{text}</span>
  </div>
);

const SearchPageWithRecoilRoot = () => (
  <RecoilRoot>
    <SearchPage />
  </RecoilRoot>
);

export default SearchPageWithRecoilRoot;
