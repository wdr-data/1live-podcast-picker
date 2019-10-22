import React, { Component } from "react";

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

class Link extends Component {
  constructor() {
    super();
    this.border = false;

    this.platforms = {
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
  }

  render() {
    if (typeof this.props.link !== "undefined") {
      return (
        <div className={styles.item}>
          <div>
            <img
              alt={"Logo " + this.platforms[this.props.for].text}
              className={styles.logo}
              src={this.platforms[this.props.for].logo}
            />
            <span>{this.platforms[this.props.for].text}</span>
          </div>

          <a href={this.props.link} target="_blank _noopener" onTouchStart={() => true}>
            <span>{this.platforms[this.props.for].buttonText}</span>
          </a>
        </div>
      );
    } else {
      return <div className={styles.item}></div>;
    }
  }
}

export default Link;
