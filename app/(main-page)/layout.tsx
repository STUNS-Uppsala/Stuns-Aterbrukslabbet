import Navbar from "./_components/navbar";

export default function MainPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
}
