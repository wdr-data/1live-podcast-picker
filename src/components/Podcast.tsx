import React, { useMemo, useRef } from "react";
import { RouteComponentProps } from "@reach/router";
import ImageGallery from "react-image-gallery";

import Link, { Platform } from "./Link";
import { TrackingLink } from "./TrackingLink";

import podcastsJson from "../data/podcasts.json";
import "./Podcast.scss";
import einsliveLogo from "../img/1live_logo.svg";
import iconArrowRight from "../img/arrow.svg";

const images = Object.keys(podcastsJson).reduce((acc: any, current: string) => {
  acc[current] = require(`../img/podcasts/${current}.jpg`);
  return acc;
}, {});

const imagesIE = Object.keys(podcastsJson).reduce(
  (acc: any, current: string) => {
    acc[current] = require(`../img/podcasts/IE/${current}.jpg`);
    return acc;
  },
  {}
);

// Wenn der Nutzer den IE benutzt, funktioniert der CSS-Effekt "blur" für den Hintergrund nicht
// Deshalb wird wenn der IE genutzt wird, ein geblurrtes Image als Hintergrund geladen und nicht per CSS verändert
const checkBrowserForIE = () => {
  if (
    /MSIE 9/i.test(navigator.userAgent) ||
    /rv:11.0/i.test(navigator.userAgent) ||
    /MSIE 10/i.test(navigator.userAgent)
  ) {
    return true;
  }

  return false;
};

interface PodcastProps extends RouteComponentProps {
  name?: keyof typeof podcastsJson;
}

const Podcast: React.FC<PodcastProps> = props => {
  const name = (props.name!).replace(decodeURIComponent("%E2%80%AC"), '') as keyof typeof podcastsJson;

  const galleryRef = useRef<ImageGallery>(null);

  const podcast = useMemo(() => podcastsJson[name], [name]);

  const isIE = useMemo(() => checkBrowserForIE(), []);
  const podcastImage = isIE ? imagesIE[name] : images[name];
  const backgroundImage = isIE ? imagesIE[name] : images[name];

  const imagePage = useMemo(
    () => (
      <div className="gallery__page gallery__page--image">
        <img
          className="podcast__wrapper__content--podcast-image"
          alt={"Teaser-Bild " + podcast.title}
          src={podcastImage}
        />
      </div>
    ),
    [podcast, podcastImage]
  );
  const detailPage = useMemo(
    () => (
      <div className="gallery__page gallery__page--detail">
        <p className="podcast__wrapper__content__details--sub-headline">
          {podcast.description}
        </p>
      </div>
    ),
    [podcast]
  );

  const pages = useMemo(
    () => [{ renderItem: () => imagePage }, { renderItem: () => detailPage }],
    [imagePage, detailPage]
  );

  const gallery = useMemo(
    () => (
      <ImageGallery
        ref={galleryRef}
        items={pages}
        lazyLoad={false}
        showBullets={true}
        showFullscreenButton={false}
        showPlayButton={false}
        showThumbnails={false}
        showIndex={false}
        showNav={false}
        infinite={false}
      />
    ),
    [pages, galleryRef]
  );

  return (
    <>
      <div
        className="background"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="background__overlay"></div>
      </div>
      <div className="podcast__wrapper inner">
        <div className="podcast__wrapper__content">
          <img src={einsliveLogo} className="logo" alt="1LIVE" />
          {gallery}
          <div className="podcast__wrapper__content__details">
            <h1 className="podcast__wrapper__content__details--headline">
              {podcast.title}
            </h1>
            <p className="podcast__wrapper__content__details--sub-headline">
              {podcast.host}
            </p>
          </div>

          <div className="podcast__wrapper__content__details--platforms">
            {podcast.platforms.map(
              ({ name: platformName, url }, index: number) => {
                return (
                  <Link
                    key={index}
                    podcast={name}
                    platform={platformName as Platform}
                    href={url}
                  />
                );
              }
            )}
            <TrackingLink
              href="https://www1.wdr.de/radio/1live/magazin/podcasts/index.html"
              id="alle"
              className="podcast__wrapper__content__details--more"
            >
              <span>Alle 1LIVE Podcasts</span>
              <img src={iconArrowRight} alt="Pfeil" />
            </TrackingLink>
          </div>
          <div className="podcast__wrapper__content__footer">
            <span>
              <a href="https://www1.wdr.de/radio/1live/einslive-impressum-100.html">
                Impressum
              </a>{" "}
              |{" "}
              <a href="https://www1.wdr.de/radio/1live/datenschutz-130.html">
                Datenschutz
              </a>{" "}
              | <a href="https://www1.wdr.de/copyright/index.html">©WDR 2020</a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Podcast;
