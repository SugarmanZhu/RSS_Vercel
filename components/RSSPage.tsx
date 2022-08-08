import Meta from "../components/Meta";
import { Fragment } from "react";
import RSSFeeds from "../components/RSSFeeds";
import Button from "../components/Button";
import HyperLink from "../components/HyperLink";
import { MoonIcon } from "@heroicons/react/solid";

function RSSPage({ feeds }) {
  return (
    <Fragment>
      <Meta 
        title="RSS Reader" 
        description="Get the latest news from the world of technology." 
      />
      <div className="flex justify-between">
        <HyperLink 
          text="Back to Welcome Page" 
          link="https://ec2.zhuxiaotan.xyz"
          className="m-2 p-2 rounded-lg hover:bg-neutral-300 
            dark:hover:bg-neutral-600 transition-colors"
        />
        <Button 
          text="Dark Mode" 
          onClick={onClickDarkMode}
          Icon={MoonIcon}
          className="p-2.5 bg-neutral-800 text-neutral-50 
            hover:bg-neutral-700 rounded-bl-lg transition-colors"
        />
      </div>
      <RSSFeeds feeds={feeds} />
    </Fragment>
  );
}

export default RSSPage;

async function onClickDarkMode() {
    // toggle dark mode
    document.querySelector("html").classList.toggle("dark");
}