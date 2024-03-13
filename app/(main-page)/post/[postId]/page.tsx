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
    let creationDateString = CreationDateToString(post.createdAt);
    const {fullName, email} = await getNameAndEmailFromUserId(post.userId);
    const { postTypeColor, expirationDateText } = GetPostColorAndExpirationText(
      {
        postType: post.postType,
      }
    );
    return (
      <Post
        post={post}
        creationDateString={creationDateString}
        expirationDateText={expirationDateText}
        postTypeColor={postTypeColor}
        userName={fullName}
        email={email}
      />
    );
  } else {
    return <p>Ingen post hittades</p>;
  }
}
