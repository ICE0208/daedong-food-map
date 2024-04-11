import Script from "next/script";

const API = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAOJSKEY}&libraries=services,clusterer&autoload=false`;

export default function FoodMapLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Script src={API} strategy="beforeInteractive" />
      {children}
    </>
  );
}
