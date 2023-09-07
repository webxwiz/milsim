import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

import { SliderProps } from "./interface"
import styles from './Slider.module.scss'
import { Left } from "./icons/Left"
import { Right } from "./icons/Right"

export const Slider = ({
    children,
    showDots = false,
    size,
}: SliderProps) => {

  const ButtonGroup = ({ next, previous, goToSlide, ...rest }: any) => {
    const { carouselState: { currentSlide } } = rest

    const iconSize = window.innerWidth <= 998 ? 'small' : size

    return (
      <div className={styles.buttonGroup}>
        <Left onClick={previous} size={iconSize} />
        <Right onClick={next} size={iconSize} />
      </div>
    )
  }

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: size === 'small' ? 1 : 4,
      slidesToSlide: 1,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: size === 'small' ? 1 : 4,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: size === 'small' ? 1 : 4,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: size === 'small' ? 1 : 2,
    },
}

    return (
        <Carousel
            showDots={showDots}
            renderButtonGroupOutside
            responsive={responsive}
            customButtonGroup={<ButtonGroup />}
            customLeftArrow={<div />}
            customRightArrow={<div/>}
            rtl={false} // library error
            infinite
            containerClass={styles.container}
        >
            {children}
        </Carousel>
    )
}