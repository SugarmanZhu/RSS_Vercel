import Meta from "../components/Meta";
import { Fragment } from "react";
import RSSFeeds from "../components/RSSFeeds";
import Button from "../components/Button";
import HyperLink from "../components/HyperLink";
import { server } from "../config";

function HomePage({ feeds }) {
  return (
    <Fragment>
      <Meta 
        title="RSS Reader" 
        description="Get the latest news from the world of technology." />
      <div className="header">
        <HyperLink 
          id="welcome_link" 
          text="Back to Welcome Page" 
          link="https://ec2.zhuxiaotan.xyz"
        />
        <Button 
          id="dark_mode_btn" 
          text="Toggle Dark Mode" 
          onClick={onClickDarkMode}
        />
      </div>
      <RSSFeeds feeds={feeds} />
    </Fragment>
  );
}

export default HomePage;

export const getStaticProps = async () => {
  // get RSS feeds from API
  const feeds = await (await fetch(`${server}/api`)).json();

  return {
    props: {
      feeds,
    },
    revalidate: 60,
  };
}

function onClickDarkMode() {
  // toggle dark mode
  const body = document.querySelector("html");
  body.classList.toggle("dark");
}