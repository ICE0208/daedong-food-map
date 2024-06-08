"use server";

import db from "@/libs/db";
import getSession from "@/libs/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface ReviewFormData {
  rate: string;
  content: string;
}

export const submitReview = async (
  restaurantId: string,
  formData: FormData,
) => {
  const data: ReviewFormData = {
    rate: formData.get("rate") as string,
    content: formData.get("content") as string,
  };

  const session = await getSession();
  const user = session.user;
  if (!user) redirect("/");

  const isExist = Boolean(
    await db.review.findUnique({
      where: {
        userId_restaurantId: { restaurantId: +restaurantId, userId: user.id },
      },
      select: {
        id: true,
      },
    }),
  );
  if (isExist) {
    console.error("이미 있음");
    return;
  }

  const review = await db.review.create({
    data: {
      content: data.content,
      rating: +data.rate,
      userId: user.id,
      restaurantId: +restaurantId,
    },
  });
  console.log(review);
  console.log("생성됨.");
  revalidatePath(`/restaurant/${restaurantId}`);
};

export const getMyReview = async (restaurantId: string) => {
  const session = await getSession();
  const user = session.user;
  if (!user) return null;
  const myReview = await db.review.findUnique({
    where: {
      userId_restaurantId: { userId: user.id, restaurantId: +restaurantId },
    },
  });
  return myReview;
};

export const deleteReview = async (restaurantId: string) => {
  const session = await getSession();
  const user = session.user;
  if (!user) redirect("/");

  const isExist = Boolean(
    await db.review.findUnique({
      where: {
        userId_restaurantId: { restaurantId: +restaurantId, userId: user.id },
      },
      select: {
        id: true,
      },
    }),
  );
  if (!isExist) {
    console.error("리뷰 없음");
    return;
  }

  const review = await db.review.delete({
    where: {
      userId_restaurantId: { userId: user.id, restaurantId: +restaurantId },
    },
  });
  console.log(review);
  console.log("지워짐.");
  revalidatePath(`/restaurant/${restaurantId}`);
};

export const getAllReviews = async (restaurantId: string) => {
  const reviews = await db.review.findMany({
    where: {
      restaurantId: +restaurantId,
    },
    include: {
      user: {
        select: {
          nickname: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return reviews;
};
