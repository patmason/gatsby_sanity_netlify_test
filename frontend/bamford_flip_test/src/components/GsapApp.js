import React, { useState, useRef, useLayoutEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { gsap } from "gsap"
import { Flip } from "gsap/Flip"

//Styles
import * as styles from "./gsapApp.module.scss"

//Components
import GsapImage from "./GsapImage"

gsap.registerPlugin(Flip)

export default function GsapApp() {
  // const images = useStaticQuery(graphql`
  //   {
  //     allFile {
  //       nodes {
  //         name
  //         childImageSharp {
  //           gatsbyImageData(quality: 80, width: 2000)
  //           fluid {
  //             aspectRatio
  //           }
  //         }
  //       }
  //     }
  //   }
  // `)

  const images = useStaticQuery(graphql`
    {
      allSanityPhoto(sort: { fields: order, order: ASC }) {
        edges {
          node {
            image {
              asset {
                gatsbyImageData
                width
                height
                assetId
              }
            }
          }
        }
      }
    }
  `)
  const appRef = useRef(null)
  const flipStateRef = useRef(null)
  const q = gsap.utils.selector(appRef)
  const [current, setCurrent] = useState(images.allSanityPhoto.edges.length - 1)
  const prevImage = () => {
    flipStateRef.current = Flip.getState(q(`.${styles.imageWrapper}`))
    //this should be set to array length - 1 not four so needs to be moved where it has access to that data
    setCurrent(current =>
      current === images.allSanityPhoto.edges.length - 1 ? 0 : current + 1
    )
  }

  const nextImage = () => {
    flipStateRef.current = Flip.getState(q(`.${styles.imageWrapper}`))
    console.log(q(`.${styles.imageWrapper}`))
    //this should be set to array length - 1 not four so needs to be moved where it has access to that data
    setCurrent(current =>
      current === 0 ? images.allSanityPhoto.edges.length : current - 1
    )
  }

  useLayoutEffect(() => {
    if (!flipStateRef.current) return
    Flip.from(flipStateRef.current, {
      absolute: true,
      duration: 1,
      ease: "expo.inOut",
      // scale: true,
    })
  }, [current])

  return (
    <div className={styles.wrapper} ref={appRef}>
      <button
        className={`${styles.button} ${styles.previousButton}`}
        onClick={() => prevImage()}
      ></button>
      <button
        onClick={() => nextImage()}
        className={`${styles.button} ${styles.nextButton}`}
      ></button>
      {images.allSanityPhoto.edges.map(({ node }, i) => {
        return (
          <GsapImage
            key={node.image.asset.assetId}
            index={i}
            name={node.image.asset.assetId}
            front={current}
            imageData={node.image.asset.gatsbyImageData}
            aspectRatio={node.image.asset.width / node.image.asset.height}
          />
        )
      })}
    </div>
  )
}
