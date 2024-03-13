interface GetExpirationDateAndPostTypeProps {
  postType: string;
}

export default function GetPostColorAndExpirationText({
  postType,
}: GetExpirationDateAndPostTypeProps) {
  let postTypeColor = "bg-primary";
  let expirationDateText = "Senast";

  if (postType === "Erbjuds") {
    postTypeColor = "bg-offerColor";
    expirationDateText = "Hämta senast";
  }
  if (postType === "Efterfrågas") {
    postTypeColor = "bg-requestColor";
    expirationDateText = "Vill ha senast";
  }

  return { postTypeColor, expirationDateText };
}
