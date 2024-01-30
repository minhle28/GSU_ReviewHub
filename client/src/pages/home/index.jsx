import React from 'react'
import './home.css';

export const Home = () => {
    return (
        <div className="HomepageCTA__StyledHomepageCTA-sc-1cz1lmf-0 gDekFH">
            <div className="HomepageCTA__CTAHeader-sc-1cz1lmf-1 dcvmiz">
                <div className="HomepageCTA__CTAMainHeader-sc-1cz1lmf-2 kvvrYK">
                    Join the RMP Family
                </div>
                <div className="HomepageCTA__CTASubheader-sc-1cz1lmf-3 flfeFM">
                    Love RMP? Let's make it official.
                </div>
            </div>
            <div className="CTAImagePrompts__CardContainer-sc-185aslp-0 bpcWaF">
                <div className="CTACard__StyledCTACard-sc-1l1zcl0-0 huefLS">
                    <img
                        alt="Lady with a pencil"
                        src="/static/media/instructional-slide-pencil-lady.492f2289.svg"
                        className="CTACard__CardImage-sc-1l1zcl0-1 ThHmd"
                    />
                    <div className="CTACard__CardText-sc-1l1zcl0-2 eWKaAo">
                        Manage and edit your ratings
                    </div>
                </div>
                <div className="CTACard__StyledCTACard-sc-1l1zcl0-0 huefLS">
                    <img
                        alt="Person making an anonymous entry"
                        src="/static/media/instructional-slide-mystery-lady.bf022e31.svg"
                        className="CTACard__CardImage-sc-1l1zcl0-1 bRvErW"
                    />
                    <div className="CTACard__CardText-sc-1l1zcl0-2 eWKaAo">
                        Your ratings are always anonymous
                    </div>
                </div>
                <div className="CTACard__StyledCTACard-sc-1l1zcl0-0 huefLS">
                    <img
                        alt="Thumb War"
                        src="/static/media/instructional-slide-thumb-war.e03fdb37.svg"
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
                Sign up now!
            </button>
        </div>

    )
}