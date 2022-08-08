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
          className="hover:bg-neutral-300 dark:hover:bg-neutral-600"
        />
        <Button 
          text="Dark Mode" 
          onClick={onClickDarkMode}
          Icon={MoonIcon}
          className="p-2.5 items-center rounded-bl-lg"
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