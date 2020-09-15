import React from "react";

import styles from "./Link.module.scss";

import einsliveLogo from "../img/icons/1live.svg";
import tuneinLogo from "../img/icons/tunein.png";
import stitcherLogo from "../img/icons/stitcher.png";
import spotifyLogo from "../img/icons/spotify.png";
import itunesLogo from "../img/icons/apple.png";
import googleLogo from "../img/icons/google.svg";
import deezerLogo from "../img/icons/deezer.png";
import rssLogo from "../img/icons/rss.svg";
import audiothekLogo from "../img/icons/audiothek.svg";
import { TrackingLink } from "./TrackingLink";

const platforms = {
  "1live": {
    logo: einsliveLogo,
    text: "1LIVE.de",
    buttonText: "Abspielen"
  },
  audiothek: {
    logo: audiothekLogo,
    text: "ARD Audiothek",
    buttonText: "Abspielen"
  },
  deezer: {
    logo: deezerLogo,
    text: "Deezer",
    buttonText: "Abspielen"
  },
  google: {
    logo: googleLogo,
    text: "Google",
    buttonText: "Abspielen"
  },
  apple: {
    logo: itunesLogo,
    text: "Apple",
    buttonText: "Abspielen"
  },
  rss: {
    logo: rssLogo,
    text: "RSS-Feed",
    buttonText: "Abonnieren"
  },
  spotify: {
    logo: spotifyLogo,
    text: "Spotify",
    buttonText: "Abspielen"
  },
  stitcher: {
    logo: stitcherLogo,
    text: "Stitcher",
    buttonText: "Abspielen"
  },
  tunein: {
    logo: tuneinLogo,
    text: "TuneIn",
    buttonText: "Abspielen"
  }
};

export type Platform = keyof typeof platforms;

const Link: React.FC<{
  href: string;
  podcast: string;
  platform: Platform;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  href,
  podcast,
  platform,
  ...props
}) => {
  if (href) {
    const plat = platforms[platform];
    return (
      <div className={styles.item}>
        <div>
          <img
            alt={"Logo " + plat.text}
            className={styles.logo}
            src={plat.logo}
          />
          <span>{plat.text}</span>
        </div>

        <TrackingLink
          href={href}
          id={`${podcast}/${platform}`}
          target="_self"
          onTouchStart={() => true}
          aria-label={`${plat.buttonText} auf ${plat.text}`}
          {...props}
        >
          <span>{plat.buttonText}</span>
        </TrackingLink>
      </div>
    );
  } else {
    return <div className={styles.item}></div>;
  }
};

export default Link;
