export default function Home() {
  return (
    <main>
      <div>
        {/* 클래스의 위치가 자동으로 정렬되는 것을 확인하였습니다.*/}
        {/* Before : <h1 className="font-bold text-2xl text-red-500"> */}
        {/* After : <h1 className="text-2xl font-bold text-red-500"> */}
        <h1 className="text-2xl font-bold text-red-500">
          테일윈드가 적용되었다면 이 텍스트가 빨간색으로 보여야합니다.
        </h1>
      </div>
    </main>
  );
}
