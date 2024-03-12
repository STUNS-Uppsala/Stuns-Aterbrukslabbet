interface GetExpirationDateAndPostTypeProps {
  postType: string;
  expirationDate: Date;
  hasCustomExpirationDate: boolean;
}

export default function GetExpirationDateAndPostType({
  postType,
  expirationDate,
  hasCustomExpirationDate,
}: GetExpirationDateAndPostTypeProps) {
  let postTypeColor = "bg-primary";
  let expirationDateElement;
  let expirationDateText = "Senast";

  if (postType === "Erbjuds") {
    postTypeColor = "bg-offerColor";
    expirationDateText = "Hämta senast";
  }
  if (postType === "Efterfrågas") {
    postTypeColor = "bg-requestColor";
    expirationDateText = "Vill ha senast";
  }

  if (hasCustomExpirationDate) {
    expirationDateElement = (
      <>
        <p>{expirationDateText}</p>
        <p>{expirationDate.toLocaleDateString("sv-SE")}</p>
      </>
    );
  }
  return { postTypeColor, expirationDateElement };
}
