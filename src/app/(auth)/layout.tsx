import Header from "@/components/Header";
import getSession from "@/libs/session";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  const user = session.user;

  return (
    <div className="flex min-h-screen flex-col">
      <Header user={user} />
      {children}
    </div>
  );
}
