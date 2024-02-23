import Navbar from "./_components/navbar";

export default function mainPageLayout({
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
