"use client";

import { useState, useEffect } from "react";
import TalkPreview from "@/components/TalkPreview";
import ReviewPreview from "@/components/ReviewPreview";
import { RecoilRoot } from "recoil";
import { SearchReview, SearchTalk } from "../actions";

type SearchItem = SearchTalk[number] | SearchReview[number];

type SearchPageClientProps = {
  search: string;
  talkResults: SearchTalk;
  reviewResults: SearchReview;
};

function isSearchTalk(item: SearchItem): item is SearchTalk[number] {
  return item.type === "TALK";
}

function SearchPageClient({
  search,
  talkResults,
  reviewResults,
}: SearchPageClientProps) {
  const [combinedResults, setCombinedResults] = useState<SearchItem[]>([]);
  const [selectedButton, setSelectedButton] = useState<
    "search-talk" | "search-review" | "combined"
  >("combined");

  useEffect(() => {
    const combined: SearchItem[] = [...talkResults, ...reviewResults].sort(
      (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
    );
    setCombinedResults(combined);
  }, [talkResults, reviewResults]);

  return (
    <main className="p flex w-full flex-1 justify-center px-48 py-20">
      <div className="min-h-[1400px] w-full max-w-[1200px] rounded-3xl bg-neutral-50 px-32 py-20">
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
        {selectedButton === "search-talk" &&
          (talkResults.length > 0 ? (
            <div className="space-y-8">
              {talkResults.map((talk) => (
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
          (reviewResults.length > 0 ? (
            <div className="space-y-8">
              {reviewResults.map((review) => (
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

const SearchPageWithRecoilRoot = (props: SearchPageClientProps) => (
  <RecoilRoot>
    <SearchPageClient {...props} />
  </RecoilRoot>
);

export default SearchPageWithRecoilRoot;
