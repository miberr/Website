import clsx from "clsx";
import React, { FunctionComponent } from "react";

import styles from "./Hero.module.scss";

export const Hero: FunctionComponent = () => {
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className={clsx("hero__title", styles.title)}>
          Hi! I'm <span className={styles.highlighted}>Mikko Berg</span>,
          <br />
          expert in Power Platform.
        </h1>
        <p className={clsx("hero__subtitle", styles.subtitle)}>
          Senior consultant, trainer and all around tech enthusiast.
          Cloud-native and strong beliver in fusion development.
        </p>
      </div>
    </header>
  );
};
