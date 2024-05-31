import getSession from "@/libs/session";

export default async function Home() {
  const session = await getSession();
  const user = session.user;

  console.log(user);

  return (
    <>
      <main className="min-h-[2000px]">
        <div>
          <h1>Home</h1>
        </div>
      </main>
    </>
  );
}
