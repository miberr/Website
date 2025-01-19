import React from "react";
import Layout from "@theme/Layout";

import { Project, ProjectData } from "../components/project/Project";

const assetsDir = "./assets/projects";
const projects: ProjectData[] = [
  {
    title: "Mockster",
    description:
      "Mocking API for REST and Microsoft Power Platform.",
    url: "https://mockster.dev/",
    image: require(`${assetsDir}/mockster-logo.svg`),
    role: "Author",
  }
];

const title = "Projects";
const description = "Projects that I'm currently involved in.";

export default function Projects(): JSX.Element {
  return (
    <Layout title={title} description={description}>
      <main className="container container--fluid margin-vert--lg">
        <h1>{title}</h1>
        <p>{description}</p>

        <div className="row">
          {projects.map((project) => (
            <Project key={project.title} {...project} />
          ))}
        </div>
      </main>
    </Layout>
  );
}