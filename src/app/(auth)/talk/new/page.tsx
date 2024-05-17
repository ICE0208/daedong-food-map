export default function TalkNewPage() {
  return (
    <main className="flex justify-center px-24 py-8">
      <div className="w-full max-w-[820px] rounded-xl bg-slate-200 p-[36px]">
        <div className="flex w-full flex-col">
          {/* 타이틀 */}
          <h1 className="ml-1 text-3xl font-bold">새 잡담</h1>
          <div className="my-2" />
          {/* 텍스트 부분 */}
          <textarea className="min-h-96 w-full resize-none rounded-xl border-2 border-gray-300 bg-slate-50 p-4 outline-none" />
          <div className="my-2" />

          <button className="self-end rounded-xl bg-neutral-50 px-[26px] py-[8px] font-semibold">
            등록
          </button>
        </div>
      </div>
    </main>
  );
}
