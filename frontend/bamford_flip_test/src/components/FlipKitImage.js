import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Flipped } from "react-flip-toolkit"

//Styles
import * as styles from "./flipKitImage.module.scss"

const FlipKitImage = ({ imageData, aspectRatio, next, name, index }) => {
  let posClass
  switch (index) {
    case 0:
      posClass = !next ? styles.behind : styles.BG
      break
    case 1:
      posClass = !next ? styles.BG : styles.front
      break
    case 2:
      posClass = !next ? styles.front : styles.shrink
      break
  }

  return (
    <Flipped flipId={name}>
      <div
        className={`${styles.wrapper} ${posClass}`}
        style={{ minHeight: "0px", minWidth: "0px" }}
        // style={
        //   index === 2 && next ? { width: `calc(${aspectRatio} * 0vh)` } : {}
        // }
      >
        <GatsbyImage image={imageData} alt="alt-text" objectFit="contain" />
      </div>
    </Flipped>
  )
}

export default FlipKitImage
