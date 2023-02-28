import amm_fbprofilowe_black from "../../amm_fbprofilowe_black.jpg";
import altText from "../../altText.txt";
class LogoImage {
  render() {
    const img = document.createElement("img");
    img.src = amm_fbprofilowe_black;
    img.alt = altText;
    img.classList.add("kiwi-image");
    const body = document.querySelector("body");
    body.appendChild(img);
  }
}

export default LogoImage;
