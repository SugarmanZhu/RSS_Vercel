import { server } from "../config/server";
import RSSPage from "../components/RSSPage";

function LimitPage({ feeds }) {
  return (
    <RSSPage feeds={feeds} />
  );
}

export default LimitPage;

export const getStaticPaths = async () => {
    const paths = []
    for (let i = -300; i <= 300; i+=100) {
        paths.push({ params: { limit: i.toString() } });
    }
    return { paths: paths, fallback: 'blocking' };
}

export const getStaticProps = async ({ params }) => {
    const limit = parseInt(params.limit);
    let feeds = [{
        title: "404 Not Found",
        link: `${server}`,
        time_string: new Date().toUTCString(),
        time_passed: "0 seconds ago",
        content: `${params.limit} is not a valid parameter.`,
        provider: "SugarmanZhu",
    }];
    if (!isNaN(limit)) {
        feeds = await (await fetch(`${server}/api/${limit}`)).json();
    }
    console.log("limit updated" + limit);
    return {
        props: {
        feeds,
        },
        // ISR every 60 seconds
        revalidate: 60,
    };
}