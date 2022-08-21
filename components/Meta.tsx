import Head from "next/head";

interface MetaProps {
  title: string;
  description: string;
  favicon?: string;
  appleicon?: string;
}

export default function Meta({ 
  title = "Xiaotan", 
  description = "Xiaotan's Page", 
  favicon = "/favicon.ico",
  appleicon = "/apple-touch-icon.png" }: MetaProps
) {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta name="description" content={description} />
      <link rel="icon" href={favicon} />
      <link rel="apple-touch-icon" href={appleicon} />
      <title>{title}</title>
    </Head>
  );
}