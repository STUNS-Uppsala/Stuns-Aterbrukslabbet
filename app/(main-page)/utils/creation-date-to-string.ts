export default function CreationDateToString(creationDate: Date): string {
  const todayDate = new Date();
  const yesterdayDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
  let creationDateString: string;

  if (creationDate.toDateString() === todayDate.toDateString()) {
    creationDateString =
      "Idag " +
      creationDate.toLocaleTimeString("sv-SE", {
        hour: "2-digit",
        minute: "2-digit",
      });
  } else if (creationDate.toDateString() === yesterdayDate.toDateString()) {
    creationDateString =
      "Igår " +
      creationDate.toLocaleTimeString("sv-SE", {
        hour: "2-digit",
        minute: "2-digit",
      });
  } else {
    creationDateString = creationDate.toLocaleDateString("sv-SE");
  }
  return creationDateString;
}
