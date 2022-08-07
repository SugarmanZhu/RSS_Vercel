import { server } from "../config/server";
import RSSPage from "../components/RSSPage";

function Page({ feeds }) {
  return (
    <RSSPage feeds={feeds} />
  );
}

export default Page;

export const getStaticProps = async () => {
  // get 50 lastest RSS feeds from API (limited to 50 for performance)
  const feeds = await (await fetch(`${server}/api/50`)).json();
  return {
    props: {
      feeds,
    },
    // ISR every 10 seconds
    revalidate: 10,
  };
}