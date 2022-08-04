import Head from "next/head";

export default function Meta({ title, description }) {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta name="description" content={description} />
      <title>{title}</title>
    </Head>
  );
}