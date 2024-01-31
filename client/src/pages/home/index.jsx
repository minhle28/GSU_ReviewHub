import React from 'react'
import './home.css';

export const Home = () => {
    return (
        <div id='main_home_page'>
            <div className="card mx-auto mb-3" style={{ maxWidth: "75%" }}>
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
                        <button type="button" className="btn btn-primary float-end">Review The Course </button>
                    </div>
                </div>
            </div>


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
        </div>
    )
}
