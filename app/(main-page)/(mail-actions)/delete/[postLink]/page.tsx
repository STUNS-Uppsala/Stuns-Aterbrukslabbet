interface PageProps {
  params: {
    postLink: string;
  };
}

export default function Page({ params }: PageProps) {
  return <div>{params.postLink}</div>;
}
