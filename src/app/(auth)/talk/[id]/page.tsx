interface TalkDetailPageProps {
  params: {
    id: string;
  };
}

export default function TalkDetailPage({ params }: TalkDetailPageProps) {
  const { id: talkId } = params;

  return <>{talkId}</>;
}
