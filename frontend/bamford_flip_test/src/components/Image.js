import React, { useRef, useLayoutEffect } from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { gsap } from "gsap"
import { animate, easeInOut } from "popmotion"

//Styles
import * as styles from "./image.module.scss"

const getInvertedDeltas = (startBounds, endBounds) => {
  return {
    x: startBounds.x - endBounds.x,
    y: startBounds.y - endBounds.y,
    scaleX: startBounds.width / endBounds.width,
    scaleY: startBounds.height / endBounds.height,
  }
}

const Image = ({ imageData, aspectRatio, zoom }) => {
  const ref = useRef(null)
  const lastBounds = useRef(null)
  useLayoutEffect(() => {
    const firstBounds = ref.current.getBoundingClientRect()
    if (lastBounds.current) {
      console.log("last bounds")
      const invertedDeltas = getInvertedDeltas(lastBounds.current, firstBounds)
      gsap.fromTo(ref.current, invertedDeltas, {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        duration: 0.3,
        ease: "circ.out",
      })
    }
    lastBounds.current = firstBounds
  }, [zoom])
  return (
    <div
      ref={ref}
      className={styles.wrapper}
      style={{
        width: `${zoom ? `calc(${aspectRatio} * 80vh)` : `100%`}`,
      }}
    >
      <GatsbyImage image={imageData} alt="alt-text" />
    </div>
  )
}

export default Image
