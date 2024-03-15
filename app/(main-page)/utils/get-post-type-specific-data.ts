interface GetPostTypeSpecificDataProps {
  postType: string;
}

export default function getPostTypeSpecificData({
  postType,
}: GetPostTypeSpecificDataProps) {
  let postTypeColor, expirationDateText, disclaimerText;

  if (postType === "Erbjuds") {
    postTypeColor = "bg-offerColor";
    expirationDateText = "Hämta senast";
    "Kontakt med människor sker på egen risk. Vi ansvarar inte för att människor agerar lagligt och inte lurar dig. Vi kan inte garantera produktens skick därför bör du verifiera med leverantören vad varan använts till innan."
  } else if (postType === "Efterfrågas") {
    postTypeColor = "bg-requestColor";
    expirationDateText = "Vill ha senast";
    disclaimerText = "Kontakt med människor sker på egen risk. Vi ansvarar inte för att människor agerar lagligt och inte lurar dig. Ge gärna mottagaren information om vad produkten använts till";
  } else {
    postTypeColor = "bg-primary";
    expirationDateText = "Senast";
    disclaimerText = "Kontakt med människor sker på egen risk. Vi ansvarar inte för att människor agerar lagligt och inte lurar dig."
  }

  return { postTypeColor, expirationDateText, disclaimerText };
}
