import Post from "./post";

export default function PostContainer() {
  return (
    <div className="flex flex-col md:gap-y-5 gap-y-3 my-16 md:px-5 px-2 mx-auto md:max-w-screen-md max-w-[360px]">
      <Post
        title={"Filterpapper 100 st"}
        description={
          "En stor låda med 100 filterpapper av papper skänkes. De är i gått skick och helt oanvända."
        }
        postType={"Erbjuds"}
        location={"Science Industries, Stenhagen"}
        creationDate={new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)}
        expirationDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
      />
      <Post
        title={"GlasKolvar 12 st"}
        description={
          "12 glaskolvar i utmärkt skick efterfrågas för ny kemilabb på Stunsta Universitet"
        }
        postType={"Efterfrågas"}
        location={"Stunsta Universitet. Stenhagen"}
        creationDate={new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)}
        expirationDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
      />
    </div>
  );
}
