import Post from "./post";

export default function PostContainer() {
  return (
    <div className="flex flex-col gap-y-5 my-16">
      <Post
        title={"Filterpapper 100 st"}
        description={
          "En stor låda med 100 filterpapper av papper skänkes. De är i gått skick och helt oanvända."
        }
        postType={"Erbjuds"}
        location={"Science Industries, Stenhagen"}
        creationDate={new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)}
        expirationDate={new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)}
      />
      <Post
        title={"Filterpapper 100 st"}
        description={
          "En stor låda med 100 filterpapper av papper skänkes. De är i gått skick och helt oanvända."
        }
        postType={"Efterfrågas"}
        location={"Science Industries, Stenhagen"}
        creationDate={new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)}
        expirationDate={null}
      />
    </div>
  );
}
