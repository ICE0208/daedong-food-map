import { SetStateAction, useState } from "react";
import { Position } from "../page";

interface CurrentPositionButtonProps {
  setPosition: (value: SetStateAction<Position>) => void;
}

export default function CurrentPositionButton({
  setPosition,
}: CurrentPositionButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (loading) return;
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        setPosition((prev) => ({
          lat,
          // 현재 위치를 가운데로 맞추기 위해 전 값이랑 무조건 다르도록 지정함.
          // 거의 의미가 없는 10**-12 를 더함으로써 전 값이랑 다르게 함.
          lng: lng === prev.lng ? lng + 10 ** -12 : lng,
        }));
        setLoading(false);
      },
      (error) => {
        console.error(error.message);
        setLoading(false);
      },
      { maximumAge: Infinity },
    );
  };

  return (
    <button onClick={handleClick}>
      {loading ? "[위치 로딩중...]" : "[내 위치로 가기]"}
    </button>
  );
}
