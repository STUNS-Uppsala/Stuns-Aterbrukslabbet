import getPostData from "../../utils/get-post-data";
import GetPostColorAndExpirationText from "../../utils/get-post-color-and-expiration-text";

import CreationDateToString from "../../utils/creation-date-to-string";
import getNameAndEmailFromUserId from "../../utils/get-name-and-email-from-user-id";
import Post from "../_components/post";
import Link from "next/link";

interface PostIdPageProps {
  params: {
    postId: string;
  };
}

export default async function PostIdPage({ params }: PostIdPageProps) {
  const post = await getPostData(Number(params.postId));
  if (post) {
    let creationDateString = CreationDateToString(post.createdAt);
    const { fullName, email } = await getNameAndEmailFromUserId(post.userId);
    const { postTypeColor, expirationDateText } = GetPostColorAndExpirationText(
      {
        postType: post.postType,
      }
    );
    const disclaimerText =
      post.postType === "Erbjuds"
        ? "Kontakt med människor sker på egen risk. Vi ansvarar inte för att människor agerar lagligt och inte lurar dig. Vi kan inte garantera produktens skick därför bör du verifiera med leverantören vad varan använts till innan."
        : "Kontakt med människor sker på egen risk. Vi ansvarar inte för att människor agerar lagligt och inte lurar dig.";
    return (
      <Post
        post={post}
        creationDateString={creationDateString}
        expirationDateText={expirationDateText}
        disclaimerText={disclaimerText}
        postTypeColor={postTypeColor}
        userName={fullName}
        email={email}
      />
    );
  } else {
    return (
      <div className="flex w-full h-[52vh] items-end justify-center text-center">
        <div className="flex flex-col max-w-screen-sm gap-y-2 px-3">
          <h1 className="text-xl font-medium">
            Oj då, inget inlägg hittades...
          </h1>
          <p className="text-pretty">
            Detta inlägg verkar inte finnas. Om du tror att inlägget bör finnas
            kontrollera då URL:en. Om du precis skapat inlägget kan det ta en
            liten stund för inlägget att dyka upp.
          </p>
          <Link className="text-blue-600 hover:underline pt-1 text-lg" href="/">
            Till startsidan
          </Link>
        </div>
      </div>
    );
  }
}
