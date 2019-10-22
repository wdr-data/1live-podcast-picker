import React, { useMemo, useRef, useState } from "react";
import { RouteComponentProps } from "@reach/router";
import ImageGallery from "react-image-gallery";
import classNames from "classnames";

import Link from "./Link";

import podcastsJson from "../data/podcasts.json";
import "./Podcast.scss";
import einsliveLogo from "../img/1live_logo.svg";
import iconArrowRight from "../img/arrow.svg";

const images = Object.keys(podcastsJson).reduce((acc: any, current: string) => {
  acc[current] = require(`../img/podcasts/${current}.jpg`);
  return acc;
}, {});

const imagesIE = Object.keys(podcastsJson).reduce((acc: any, current: string) => {
  acc[current] = require(`../img/podcasts/IE/${current}.jpg`);
  return acc;
}, {});

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
  const name = props.name || "";

  const galleryRef = useRef<ImageGallery>(null);

  const podcast = useMemo(() => name && (podcastsJson[name] as any), [name]);

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
    [podcast]
  );
  const detailPage = useMemo(
    () => (
      <div className="gallery__page gallery__page--detail">
        <p className="podcast__wrapper__content__details--sub-headline">{podcast.description}</p>
      </div>
    ),
    [podcast]
  );

  const pages = useMemo(() => [{ renderItem: () => imagePage }, { renderItem: () => detailPage }], [
    imagePage,
    detailPage
  ]);

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
      <div className="background" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="background__overlay"></div>
      </div>
      <div className="podcast__wrapper inner">
        <div className="podcast__wrapper__content">
          <img src={einsliveLogo} className="logo" />
          {gallery}
          <div className="podcast__wrapper__content__details">
            <h1 className="podcast__wrapper__content__details--headline">{podcast.title}</h1>
            <p className="podcast__wrapper__content__details--sub-headline">{podcast.host}</p>
          </div>

          <div className="podcast__wrapper__content__details--platforms">
            {podcast.platforms.map((platform: any, index: string) => {
              const platformName = Object.keys(platform)[0];
              return <Link key={index} for={platformName} link={platform[platformName]} />;
            })}
            <a
              href="https://www1.wdr.de/radio/1live/magazin/podcasts/index.html"
              className="podcast__wrapper__content__details--more"
            >
              <span>Alle 1LIVE Podcasts</span>
              <img src={iconArrowRight} alt="Pfeil" />
            </a>
          </div>
          <div className="podcast__wrapper__content__footer">
            <span>Impressum | Datenschutz | ©WDR 2019</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Podcast;
