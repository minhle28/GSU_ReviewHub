import React from 'react'
import './home.css';
import { Carousel } from "../../component/carousel/";

export const Home = () => {

    return (
        <>
            <Carousel />
            <div id='main_home_page'>

                {/* CARD TO GO TO COURSE */}
                <div id="first_card" className="card mx-auto mb-3" style={{ maxWidth: "75%" }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src="logo.png" className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">
                                    This is a wider card with supporting text below as a natural lead-in
                                    to additional content. This content is a little bit longer.
                                </p>
                                <p className="card-text">
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                </p>
                            </div>
                            <div className="card-body">
                                <button type="button" className="btn btn-primary float-end">
                                    Explore The Course
                                    <img src="forward_icon.png" className="forward-icon" alt="Forward Icon" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* THREE IMAGES */}
                <div className="HomepageCTA__StyledHomepageCTA-sc-1cz1lmf-0 gDekFH">
                    <div className="HomepageCTA__CTAHeader-sc-1cz1lmf-1 dcvmiz">
                        <div className="HomepageCTA__CTAMainHeader-sc-1cz1lmf-2 kvvrYK">
                            Join the GSU ReviewHub Family
                        </div>
                        <div className="HomepageCTA__CTASubheader-sc-1cz1lmf-3 flfeFM">
                            Love GSU ReviewHub? Let's make it official.
                        </div>
                    </div>
                    <div className="CTAImagePrompts__CardContainer-sc-185aslp-0 bpcWaF">
                        <div className="CTACard__StyledCTACard-sc-1l1zcl0-0 huefLS">
                            <img
                                alt="Lady with a pencil"
                                src="home_1.png"
                                className="CTACard__CardImage-sc-1l1zcl0-1 ThHmd"
                            />
                            <div className="CTACard__CardText-sc-1l1zcl0-2 eWKaAo">
                                Manage and edit your <br /> ratings
                            </div>
                        </div>
                        <div className="CTACard__StyledCTACard-sc-1l1zcl0-0 huefLS">
                            <img
                                alt="Person making an anonymous entry"
                                src="home_2.png"
                                className="CTACard__CardImage-sc-1l1zcl0-1 bRvErW"
                            />
                            <div className="CTACard__CardText-sc-1l1zcl0-2 eWKaAo">
                                Your ratings are <br /> always anonymous
                            </div>
                        </div>
                        <div className="CTACard__StyledCTACard-sc-1l1zcl0-0 huefLS">
                            <img
                                alt="Thumb War"
                                src="home_3.png"
                                className="CTACard__CardImage-sc-1l1zcl0-1 dVuMFy"
                            />
                            <div className="CTACard__CardText-sc-1l1zcl0-2 eWKaAo">
                                Like or dislike ratings
                            </div>
                        </div>
                    </div>
                    <button
                        role="button"
                        data-testid="modal-button-link"
                        className="ModalButtonLink__StyledButton-sc-1soj3zs-0 khahiz"
                        type="button"
                    >
                        <span>Sign up now!</span>
                        <div />

                    </button>
                </div>


                {/* REVIEW TESTIMONIAL REVIEW SLIDER */}
                <section className="ezy__testimonial23 light">
                    {/* shape one */}
                    <svg
                        className="ezy__testimonial23-shape-one"
                        width={404}
                        height={572}
                        viewBox="0 0 404 572"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx={118}
                            cy={286}
                            r="265.5"
                            stroke="#4175DF"
                            strokeOpacity="0.2"
                            strokeWidth={41}
                        />
                    </svg>
                    {/* shape two */}
                    <svg
                        className="ezy__testimonial23-shape-two"
                        width={269}
                        height={479}
                        viewBox="0 0 269 479"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="239.5" cy="239.5" r="239.5" fill="#CCCCCC" fill-opacity="0.25"></circle>
                    </svg>
                    <div className="container">
                        <div className="row align-items-center justify-content-between mb-4 mb-md-5">
                            <div className="col-12 col-md-6 col-lg-4">
                                <h2 className="ezy__testimonial23-heading mb-0">
                                    Everyone should believe in What Our Client Say .
                                </h2>
                            </div>
                            <div className="col-12 col-md-6 col-lg-5">
                                <p className="ezy__testimonial23-sub-heading mb-0">
                                    Jobs can be categorized as paid or unpaid. Examples of unpaid jobs
                                    include volunteer, homemaker, mentor, student, and sometimes intern.
                                </p>
                            </div>
                        </div>
                        <div
                            id="ezy__testimonial23-carousel"
                            className="carousel slide"
                            data-bs-ride="carousel"
                        >
                            <div className="carousel-indicators m-0">
                                <button
                                    type="button"
                                    data-bs-target="#ezy__testimonial23-carousel"
                                    data-bs-slide-to={0}
                                    className="active"
                                    aria-current="true"
                                    aria-label="Slide 1"
                                />
                                <button
                                    type="button"
                                    data-bs-target="#ezy__testimonial23-carousel"
                                    data-bs-slide-to={1}
                                    aria-label="Slide 2"
                                />
                                <button
                                    type="button"
                                    data-bs-target="#ezy__testimonial23-carousel"
                                    data-bs-slide-to={2}
                                    aria-label="Slide 3"
                                />
                            </div>
                            <div className="carousel-inner overflow-visible">
                                <div className="carousel-item active">
                                    <div className="row">
                                        <div className="col-12 col-lg-4">
                                            <div className="card ezy__testimonial23-item border-0 p-4 mt-4">
                                                <div className="card-body">
                                                    <div className="d-flex align-items-center mb-4">
                                                        <div className="me-3">
                                                            <img
                                                                src="https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_1.jpeg"
                                                                alt=""
                                                                className="img-fluid rounded-circle border"
                                                                width={65}
                                                            />
                                                        </div>
                                                        <div>
                                                            <h4 className="mb-0 fs-5">Akshay Kumar</h4>
                                                            <p className="mb-0 small">Founder / CEO</p>
                                                        </div>
                                                    </div>
                                                    <p className="opacity-75">
                                                        An activity that requires a person's mental or physical
                                                        effort is work.If a person is trained for a certain type of
                                                        job, they may have a job.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-4">
                                            <div className="card ezy__testimonial23-item border-0 p-4 mt-4">
                                                <div className="card-body">
                                                    <div className="d-flex align-items-center mb-4">
                                                        <div className="me-3">
                                                            <img
                                                                src="https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_2.jpeg"
                                                                alt=""
                                                                className="img-fluid rounded-circle border"
                                                                width={65}
                                                            />
                                                        </div>
                                                        <div>
                                                            <h4 className="mb-0 fs-5">Akshay Kumar</h4>
                                                            <p className="mb-0 small">Founder / CEO</p>
                                                        </div>
                                                    </div>
                                                    <p className="opacity-75">
                                                        An activity that requires a person's mental or physical
                                                        effort is work.If a person is trained for a certain type of
                                                        job, they may have a job.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-4">
                                            <div className="card ezy__testimonial23-item border-0 p-4 mt-4">
                                                <div className="card-body">
                                                    <div className="d-flex align-items-center mb-4">
                                                        <div className="me-3">
                                                            <img
                                                                src="https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_3.jpeg"
                                                                alt=""
                                                                className="img-fluid rounded-circle border"
                                                                width={65}
                                                            />
                                                        </div>
                                                        <div>
                                                            <h4 className="mb-0 fs-5">Akshay Kumar</h4>
                                                            <p className="mb-0 small">Founder / CEO</p>
                                                        </div>
                                                    </div>
                                                    <p className="opacity-75">
                                                        An activity that requires a person's mental or physical
                                                        effort is work.If a person is trained for a certain type of
                                                        job, they may have a job.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div className="row">
                                        <div className="col-12 col-lg-4">
                                            <div className="card ezy__testimonial23-item border-0 p-4 mt-4">
                                                <div className="card-body">
                                                    <div className="d-flex align-items-center mb-4">
                                                        <div className="me-3">
                                                            <img
                                                                src="https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_1.jpeg"
                                                                alt=""
                                                                className="img-fluid rounded-circle border"
                                                                width={65}
                                                            />
                                                        </div>
                                                        <div>
                                                            <h4 className="mb-0 fs-5">Akshay Kumar</h4>
                                                            <p className="mb-0 small">Founder / CEO</p>
                                                        </div>
                                                    </div>
                                                    <p className="opacity-75">
                                                        An activity that requires a person's mental or physical
                                                        effort is work.If a person is trained for a certain type of
                                                        job, they may have a job.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-4">
                                            <div className="card ezy__testimonial23-item border-0 p-4 mt-4">
                                                <div className="card-body">
                                                    <div className="d-flex align-items-center mb-4">
                                                        <div className="me-3">
                                                            <img
                                                                src="https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_2.jpeg"
                                                                alt=""
                                                                className="img-fluid rounded-circle border"
                                                                width={65}
                                                            />
                                                        </div>
                                                        <div>
                                                            <h4 className="mb-0 fs-5">Akshay Kumar</h4>
                                                            <p className="mb-0 small">Founder / CEO</p>
                                                        </div>
                                                    </div>
                                                    <p className="opacity-75">
                                                        An activity that requires a person's mental or physical
                                                        effort is work.If a person is trained for a certain type of
                                                        job, they may have a job.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-4">
                                            <div className="card ezy__testimonial23-item border-0 p-4 mt-4">
                                                <div className="card-body">
                                                    <div className="d-flex align-items-center mb-4">
                                                        <div className="me-3">
                                                            <img
                                                                src="https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_3.jpeg"
                                                                alt=""
                                                                className="img-fluid rounded-circle border"
                                                                width={65}
                                                            />
                                                        </div>
                                                        <div>
                                                            <h4 className="mb-0 fs-5">Akshay Kumar</h4>
                                                            <p className="mb-0 small">Founder / CEO</p>
                                                        </div>
                                                    </div>
                                                    <p className="opacity-75">
                                                        An activity that requires a person's mental or physical
                                                        effort is work.If a person is trained for a certain type of
                                                        job, they may have a job.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div className="row">
                                        <div className="col-12 col-lg-4">
                                            <div className="card ezy__testimonial23-item border-0 p-4 mt-4">
                                                <div className="card-body">
                                                    <div className="d-flex align-items-center mb-4">
                                                        <div className="me-3">
                                                            <img
                                                                src="https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_2.jpeg"
                                                                alt=""
                                                                className="img-fluid rounded-circle border"
                                                                width={65}
                                                            />
                                                        </div>
                                                        <div>
                                                            <h4 className="mb-0 fs-5">Akshay Kumar</h4>
                                                            <p className="mb-0 small">Founder / CEO</p>
                                                        </div>
                                                    </div>
                                                    <p className="opacity-75">
                                                        An activity that requires a person's mental or physical
                                                        effort is work.If a person is trained for a certain type of
                                                        job, they may have a job.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-4">
                                            <div className="card ezy__testimonial23-item border-0 p-4 mt-4">
                                                <div className="card-body">
                                                    <div className="d-flex align-items-center mb-4">
                                                        <div className="me-3">
                                                            <img
                                                                src="https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_1.jpeg"
                                                                alt=""
                                                                className="img-fluid rounded-circle border"
                                                                width={65}
                                                            />
                                                        </div>
                                                        <div>
                                                            <h4 className="mb-0 fs-5">Akshay Kumar</h4>
                                                            <p className="mb-0 small">Founder / CEO</p>
                                                        </div>
                                                    </div>
                                                    <p className="opacity-75">
                                                        An activity that requires a person's mental or physical
                                                        effort is work.If a person is trained for a certain type of
                                                        job, they may have a job.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-4">
                                            <div className="card ezy__testimonial23-item border-0 p-4 mt-4">
                                                <div className="card-body">
                                                    <div className="d-flex align-items-center mb-4">
                                                        <div className="me-3">
                                                            <img
                                                                src="https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_3.jpeg"
                                                                alt=""
                                                                className="img-fluid rounded-circle border"
                                                                width={65}
                                                            />
                                                        </div>
                                                        <div>
                                                            <h4 className="mb-0 fs-5">Akshay Kumar</h4>
                                                            <p className="mb-0 small">Founder / CEO</p>
                                                        </div>
                                                    </div>
                                                    <p className="opacity-75">
                                                        An activity that requires a person's mental or physical
                                                        effort is work.If a person is trained for a certain type of
                                                        job, they may have a job.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </>
    )
}
