import db from "@/libs/db";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const { id } = params;

  const data = await db.restaurant.findUnique({
    where: {
      id: +id,
    },
  });

  console.log(data);

  return (
    <div className="flex w-full flex-1 px-32 py-12">
      <div className="relative flex w-full gap-8">
        <div className="relative w-full overflow-hidden rounded-xl bg-neutral-50">
          {id}
        </div>
        <div className="relative w-[600px] overflow-hidden rounded-xl bg-neutral-50"></div>
      </div>
    </div>
  );
}
