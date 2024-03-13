import getPostData from "../../utils/get-post-data";
import GetPostColorAndExpirationText from "../../utils/get-post-color-and-expiration-text";

import CreationDateToString from "../../utils/creation-date-to-string";
import getNameAndEmailFromUserId from "../../utils/get-name-and-email-from-user-id";
import Post from "../_components/post";

interface PostIdPageProps {
  params: {
    postId: string;
  };
}

export default async function PostIdPage({ params }: PostIdPageProps) {
  const post = await getPostData(Number(params.postId));
  if (post) {
    let disclaimerText = "";
    let creationDateString = CreationDateToString(post.createdAt);
    const { fullName, email } = await getNameAndEmailFromUserId(post.userId);
    const { postTypeColor, expirationDateText } = GetPostColorAndExpirationText(
      {
        postType: post.postType,
      }
    );
    if (post.postType === "Erbjuds") {
      disclaimerText =
        "Kontakt med människor sker på egen risk. Vi ansvarar inte för att människor agerar lagligt och inte lurar dig. Vi kan inte garantera produktens skick därför bör du verifiera med leverantören vad varan använts till innan.";
    }
    if (post.postType === "Efterfrågas") {
      disclaimerText =
        "Kontakt med människor sker på egen risk. Vi ansvarar inte för att människor agerar lagligt och inte lurar dig.";
    }
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
    return <p>Ingen post hittades</p>;
  }
}
