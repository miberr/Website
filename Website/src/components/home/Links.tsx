import clsx from "clsx";
import React, { FunctionComponent } from "react";

import styles from "./Links.module.scss";

export interface LinkData {
  name: string;
  url: string;
  svg?: JSX.Element;
}

export interface LinksProps {
  data: LinkData[];
  title: string;
}

export const Links: FunctionComponent<LinksProps> = ({ data, title }) => {
  const linksComponents = data.map(({ name, url, svg }) => (
    <div className={clsx("col", styles.col)} key={name}>
      <a
        href={url}
        target="_blank"
        className={clsx("button button--outline button--primary", styles.btn)}
      >
        <span className={styles.btnIcon}>{svg}</span>
        <span className={styles.btnText}>{name}</span>
      </a>
    </div>
  ));

  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <div className={clsx("row", styles.links)}>
        {linksComponents}
      </div>
    </div>
  );
};