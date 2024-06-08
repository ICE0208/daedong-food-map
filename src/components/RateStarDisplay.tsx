interface RateStarDisplayProps {
  rate: number;
}

export default function RateStarDisplay({ rate }: RateStarDisplayProps) {
  // 평점(rate)은 5점 만점이므로, 만점을 100% 기준으로 맞춫기 위하여 x20을 해주었습니다.
  const percentage = rate * 20;

  return (
    <span className="space-x-1 text-inherit">
      <span>{(Math.floor(rate * 10) / 10).toFixed(1)}</span>
      <span
        style={{
          backgroundImage: `linear-gradient(to right, #ffdd47 ${percentage}%, #cbcbcb ${percentage}%)`,
        }}
        className="bg-clip-text"
      >
        <span className="text-[#ffffff00]">★★★★★</span>
      </span>
    </span>
  );
}
