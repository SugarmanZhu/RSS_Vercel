import { Fragment } from "react";
import { RSSItemType } from "../types/RSSItemType";
import RSSItem from "./RSSItem";

function RSSList({ feeds }) {
    return (
        <Fragment>
            <div className="relative pb-28">
                {feeds.map((feed : RSSItemType, f_id : number) => (
                    <RSSItem key={f_id} rss={feed} />
                ))}
            <h2 className="absolute bottom-0 w-full h-20 text-center">
                End of RSS Feeds
            </h2>
            </div>

            {/* bottom fades */}
            <div 
                className="fixed bottom-0 left-0 w-full h-28 transition-all 
                bg-gradient-to-t from-black opacity-0 dark:opacity-100" 
            />
            <div 
                className="fixed bottom-0 left-0 w-full h-28 transition-all 
                bg-gradient-to-t from-white opacity-100 dark:opacity-0" 
            />
        </Fragment>
    )
}

export default RSSList;