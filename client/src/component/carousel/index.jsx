import React, { useEffect, useRef } from 'react';
import './carousel.css';


export const Carousel = () => {
    const carouselRef = useRef(null);

    useEffect(() => {
        // Initialize the Bootstrap Carousel when the component mounts
        const carouselInstance = new window.bootstrap.Carousel(carouselRef.current);

        // Set up auto slide every 10 seconds
        const intervalId = setInterval(() => {
            carouselInstance.next();
        }, 10000);

        // Cleanup the Carousel and clearInterval when the component unmounts
        return () => {
            carouselInstance.dispose();
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div id="carouselExampleCaptions" className="carousel slide" ref={carouselRef} >
            <div className="carousel-indicators" >
                <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to={0}
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                />
                <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to={1}
                    aria-label="Slide 2"
                />
                <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to={2}
                    aria-label="Slide 3"
                />
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="banner_1.png" className="d-block w-100" style={{ height: '400px', width: 'auto' }} alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>First slide label</h5>
                        <p>Some representative placeholder content for the first slide.</p>
                    </div>
                </div>
                <div className="carousel-item">
                    <img src="banner_2.png" className="d-block w-100" style={{ height: '400px', width: 'auto' }} alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Second slide label</h5>
                        <p>Some representative placeholder content for the second slide.</p>
                    </div>
                </div>
                <div className="carousel-item">
                    <img src="banner_3.png" className="d-block w-100" style={{ height: '400px', width: 'auto' }} alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Third slide label</h5>
                        <p>Some representative placeholder content for the third slide.</p>
                    </div>
                </div>
            </div>
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}