import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

//styles
import * as styles from "./gsapApp.module.scss"

export default function GsapImage({
  imageData,
  name,
  index,
  aspectRatio,
  front,
}) {
  const getImageStyles = () => {
    let imageStyles
    if (index === front - 2) {
      imageStyles = { width: "100%" }
    } else if (index === front - 1) {
      imageStyles = { width: "100%" }
    } else if (index === front) {
      imageStyles = { width: `calc(${aspectRatio} * 80vh)` }
    } else {
      imageStyles = { width: `0px` }
    }
    return imageStyles
  }

  return (
    <div className={`slide ${styles.imageWrapper}`} style={getImageStyles()}>
      <GatsbyImage image={imageData} alt={name} />
    </div>
  )
}
