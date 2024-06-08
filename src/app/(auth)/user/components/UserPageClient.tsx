"use client";

import { Review, Talk } from "@prisma/client";
import { LikeReview, LikeTalk, UserInfo, UserReview, UserTalk } from "../page";
import { useState } from "react";
import TalkPreview from "@/components/TalkPreview";
import { RecoilRoot } from "recoil";
import ReviewPreview from "@/components/ReviewPreview";
import { actionLogout } from "../actions";

interface UserPageClientProps {
  userInfo: UserInfo;
  userTalk: UserTalk;
  userReview: UserReview;
  likeTalk: LikeTalk;
  likeReview: LikeReview;
}

function UserPageClient({
  userInfo,
  userReview,
  userTalk,
  likeTalk,
  likeReview,
}: UserPageClientProps) {
  const [selectedButton, setSelectedButton] = useState<
    "my-talk" | "my-review" | "like-talk" | "like-review"
  >("my-talk");

  return (
    <main className="p flex w-full flex-1 justify-center px-48 py-20">
      <div className="min-h-[1400px] w-full max-w-[1200px] rounded-3xl bg-neutral-50 px-32 py-20">
        {/* User Uinfo */}
        <div className="flex flex-col">
          <span className="text-[50px] font-semibold">{userInfo.nickname}</span>
          <span className="text-[18px]">{userInfo.email}</span>
        </div>
        {/* Log Out */}
        <span
          className="mt-2 inline-block cursor-pointer rounded-2xl border-[2px] border-[#313131] px-[14px] py-[4px] text-sm font-bold text-[#363636]"
          onClick={() => actionLogout()}
        >
          로그아웃
        </span>
        <div className="my-8" />
        {/* Buttons */}
        <div className="flex gap-3">
          <Button
            text="내가 쓴 잡담"
            selected={selectedButton === "my-talk"}
            onClick={() => setSelectedButton("my-talk")}
          />
          <Button
            text="내가 쓴 리뷰"
            selected={selectedButton === "my-review"}
            onClick={() => setSelectedButton("my-review")}
          />
          <Button
            text="좋아요 한 잡담"
            selected={selectedButton === "like-talk"}
            onClick={() => setSelectedButton("like-talk")}
          />
          <Button
            text="좋아요 한 리뷰"
            selected={selectedButton === "like-review"}
            onClick={() => setSelectedButton("like-review")}
          />
        </div>
        <div className="my-8" />
        {/* contents */}
        {selectedButton === "my-talk" &&
          (userTalk.length > 0 ? (
            <div className="space-y-8">
              {userTalk.map((talk) => (
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
            <NotContent text="내가 쓴 잡담이 없습니다. 🥺" />
          ))}
        {selectedButton === "like-talk" &&
          (likeTalk.length > 0 ? (
            <div className="space-y-8">
              {likeTalk.map((_) => {
                const talk = _.talk;
                const date = _.convertedDate;
                return (
                  <TalkPreview
                    author={talk.user.nickname}
                    content={talk.content}
                    formattedData={date}
                    talkId={talk.id}
                    key={talk.id}
                    isLike={talk.likes.length > 0}
                    commentCount={talk._count.talkComments}
                    heartCount={talk._count.likes}
                    recentComment={talk.talkComments[0]}
                  />
                );
              })}
            </div>
          ) : (
            <NotContent text="좋아요 한 잡담이 없습니다. 🥺" />
          ))}
        {selectedButton === "my-review" &&
          (userReview.length > 0 ? (
            <div className="space-y-8">
              {userReview.map((review) => (
                <ReviewPreview
                  key={review.id}
                  author={review.user.nickname}
                  content={review.content}
                  formattedData={review.convertedDate}
                  isLike={review.likes.length > 0}
                  heartCount={review._count.likes}
                  rate={review.rating}
                  restaurantName={review.restaurant.name}
                  restaurantId={review.restaurantId}
                  reviewId={review.id}
                />
              ))}
            </div>
          ) : (
            <NotContent text="내가 쓴 리뷰가 없습니다. 🥺" />
          ))}
        {selectedButton === "like-review" &&
          (likeReview.length > 0 ? (
            <div className="space-y-8">
              {likeReview.map((_) => {
                const review = _.review;
                const date = _.convertedDate;
                return (
                  <ReviewPreview
                    key={review.id}
                    author={review.user.nickname}
                    content={review.content}
                    formattedData={date}
                    isLike={review.likes.length > 0}
                    heartCount={review._count.likes}
                    rate={review.rating}
                    restaurantName={review.restaurant.name}
                    restaurantId={review.restaurantId}
                    reviewId={review.id}
                  />
                );
              })}
            </div>
          ) : (
            <NotContent text="좋아요 한 리뷰가 없습니다. 🥺" />
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

const UserPageClientWithRecoilRoot = (props: UserPageClientProps) => (
  <RecoilRoot>
    <UserPageClient {...props} />
  </RecoilRoot>
);

export default UserPageClientWithRecoilRoot;
