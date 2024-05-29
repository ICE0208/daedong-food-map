interface RestaurantPageProps {
  params: {
    id: string;
  };
}

export default function RestaurantPage({ params }: RestaurantPageProps) {
  const { id } = params;
  return <h1>{id}</h1>;
}
