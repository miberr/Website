import clsx from "clsx";
import React, { FunctionComponent } from "react";
import Image from "@theme/IdealImage";

import styles from "./Credentials.module.scss";

export interface CredentialSeparateImage {
  image: string;
  alt: string;
  credentialLink?: string;
}

export interface CredentialLink {
  link: string;
  label: string;
  code: string;
}

export interface CredentialColumnData {
  imageUrl: string;
  alt: string;
  items: CredentialLink[];
}

export interface CredentialsProps {
  title: string;
  separateImages?: CredentialSeparateImage[];
  columns: CredentialColumnData[];
}

export const Credentials: FunctionComponent<CredentialsProps> = ({
  title,
  separateImages,
  columns,
}) => {
  /*  const separateImagesComponents = separateImages?.map(({ image, alt, credentialLink }) => (
        <a href={credentialLink} className={styles.image}>
            <Image img={image} alt={alt} />
        </a>
    )) ;*/

  const columnsComponents = columns.map(({ imageUrl, alt, items }) => (
    <div className={clsx("col", styles.col)}>
      <div className={styles.box}>
        <div className={styles.image}>
          <Image img={imageUrl} alt={alt} />
        </div>
        <ul className={styles.columnItems}>
          {items.map(({ link, label, code }) => (
            <li>
              <a href={link} className={styles.link} target="_blank">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ));

  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <p>In addition to these, I'm a Microsoft Certified Trainer (MCT).</p>
      {/* {separateImagesComponents && (
                <div className={clsx("row")}>
                    <div className={clsx("col")}>
                        {separateImagesComponents}
                    </div>
                </div>
            )} */}

      <div className={clsx("row", styles.columns)}>{columnsComponents}</div>
    </div>
  );
};
