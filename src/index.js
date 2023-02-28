import HelloWorldButton from "./components/hello-world-button/hello-world-button.js";
import LogoImage from "./components/add-image/add-image.js";
import Heading from "./components/heading/heading.js";
import React from "react";

const heading = new Heading();
heading.render("index");

const helloWolrdButton = new HelloWorldButton();
helloWolrdButton.render();

const logoImage = new LogoImage();
logoImage.render();

if (process.env.NODE_ENV === "production") {
  console.log("production");
} else if (process.env.NODE_ENV === "development") {
  console.log("development");
}
