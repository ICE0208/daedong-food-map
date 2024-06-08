import { Metadata } from "next";

export const metadata: Metadata = {
  title: "맛집",
};

export default function FoodMapLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
