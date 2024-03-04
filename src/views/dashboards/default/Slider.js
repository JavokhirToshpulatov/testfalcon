import React, { useRef } from "react";
import Slider from "react-slick";
import {Row, Col} from 'antd';
import {LeftCircleFilled, RightCircleFilled} from '@ant-design/icons';
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
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 3,
        dots: false,
        arrows: false
    };
    return (
        <div className="slider-block">
            <Row>
                <Col span={1} style={{display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
                    <LeftCircleFilled style={{fontSize: '20px'}} onClick={previous}/>
                </Col>
                <Col span={22}>
                    <div className="slider-container">
                        <Slider ref={slider => {
                            sliderRef = slider;
                        }}
                            {...settings}>
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
                    </div>
                </Col>
                <Col span={1} style={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
                    <RightCircleFilled style={{fontSize: '20px'}} onClick={next}/>
                </Col>
            </Row>
        </div>
    );
}

export default Responsive;