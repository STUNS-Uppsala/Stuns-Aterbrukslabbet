import Intro from "./_components/intro";
import PostContainer from "./_components/post-container";

interface PageProps {
  searchParams: { page?: string };
}

export default function MainPage({ searchParams }: PageProps) {
  return (
    <div>
      {!searchParams.page && <Intro />}
      <PostContainer page={Number(searchParams.page)} />
    </div>
  );
}
