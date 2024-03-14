interface GetExpirationDateAndPostTypeProps {
  postType: string;
}

export default function getPostTypeSpecificData({
  postType,
}: GetExpirationDateAndPostTypeProps) {
  let postTypeColor, expirationDateText;

  if (postType === "Erbjuds") {
    postTypeColor = "bg-offerColor";
    expirationDateText = "Hämta senast";
  } else if (postType === "Efterfrågas") {
    postTypeColor = "bg-requestColor";
    expirationDateText = "Vill ha senast";
  } else {
    postTypeColor = "bg-primary";
    expirationDateText = "Senast";
  }

  const disclaimerText =
    postType === "Erbjuds"
      ? "Kontakt med människor sker på egen risk. Vi ansvarar inte för att människor agerar lagligt och inte lurar dig. Vi kan inte garantera produktens skick därför bör du verifiera med leverantören vad varan använts till innan."
      : "Kontakt med människor sker på egen risk. Vi ansvarar inte för att människor agerar lagligt och inte lurar dig.";

  return { postTypeColor, expirationDateText, disclaimerText };
}
