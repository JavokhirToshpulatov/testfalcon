import React, {useRef} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Responsive() {
    let sliderRef = useRef(null);
    const next = () => {
        sliderRef.slickNext();
    };
    const previous = () => {
        sliderRef.slickPrev();
    };
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
    };
    return (
        <div className="slider-container">
            <Slider ref={slider => {
                sliderRef = slider;
            }}
                    styles={"d-flex"} {...settings}>
                <div>
                    <button >12.02.2030</button>
                </div>
                <div>
                    <button>12.02.2030</button>
                </div>
                <div>
                    <button>12.02.2030</button>
                </div>
                <div>
                    <button>12.02.2030</button>
                </div>
                <div>
                    <button>12.02.2030</button>
                </div>
                <div>
                    <button>12.02.2030</button>
                </div>
                <div>
                    <button>12.02.2030</button>
                </div>
                <div>
                    <button>12.02.2030</button>
                </div>
            </Slider>
            <div style={{textAlign: "center"}}>
                <button className="button" onClick={previous}>
                    Previous
                </button>
                <button className="button" onClick={next}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default Responsive;