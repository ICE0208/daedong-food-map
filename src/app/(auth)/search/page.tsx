import { searchReviewAction, searchTalkAction } from "./actions";
import SearchPageWithRecoilRoot from "./components/SearchPageClient";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  const search = searchParams.query ?? "";

  // Promise.all을 사용하여 요청을 병렬로 처리
  const [talkResults, reviewResults] = await Promise.all([
    searchTalkAction(search),
    searchReviewAction(search),
  ]);

  return (
    <SearchPageWithRecoilRoot
      search={search}
      talkResults={talkResults}
      reviewResults={reviewResults}
    />
  );
}
