import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Flipper, Flipped } from "react-flip-toolkit"

//Styles
import * as styles from "./flipKitApp.module.scss"

//Components
import Image from "./Image"
import FlipKitImage from "./FlipKitImage"

export default function FlipKitApp() {
  const [next, setNext] = useState(false)
  const images = useStaticQuery(graphql`
    {
      allFile {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(quality: 80, width: 2000)
            fluid {
              aspectRatio
            }
          }
        }
      }
    }
  `)
  return (
    <div className={styles.wrapper}>
      <button className={`${styles.button} ${styles.previousButton}`}>
        PREV
      </button>
      <Flipper className={styles.flipper} flipKey={next} debug={false}>
        {images.allFile.nodes.map((el, i) => {
          return (
            <FlipKitImage
              key={el.name}
              index={i}
              name={el.name}
              next={next}
              imageData={el.childImageSharp.gatsbyImageData}
              aspectRatio={el.childImageSharp.fluid.aspectRatio}
            />
          )
        })}
      </Flipper>
      <button
        onClick={() => setNext(prevState => !prevState)}
        className={`${styles.button} ${styles.nextButton}`}
      >
        NEXT
      </button>
    </div>
  )
}
