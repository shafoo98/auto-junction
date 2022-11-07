import React from 'react'
import {Helmet} from 'react-helmet'
import { BsFacebook } from 'react-icons/bs'

const AboutUsScreen = () => {

  return (
    <>
      <Helmet>
        <title>Auto Junction: About</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <div style={{'marginTop': '10rem'}}>
        <h1 className="text-center mb-5 fs-1">About Auto Junction</h1>
        <h5 className="mb-3">About Us</h5>
        <p className="fs-5">
          We are Auto Junction, an online shop that provides you with the best
          quality of all your automotive needs and parts at the best price
          delivered to your doorstep.
        </p>{" "}
        <p className="fs-5">
          All of our products are checked by our team and we strive to provide
          you with the best solution possible
        </p>
        <h5 className="mb-3">Contact</h5>
        <p className="fs-5">
          Contact us at our{" "}
          <a
            rel="nopener noreferrer"
            target="_blank"
            href="https://www.facebook.com/auto.junction.store/"
            style={{ textDecoration: "none" }}
          >
            <BsFacebook /> page
          </a>{" "}
          for any of your order or delivery queries. You may also call the
          number 01792651900 for your order or delivery queries.
        </p>
        <h5 className="mb-3">Disclaimer</h5>
        <p className="fs-5">
          The product information and prices set
          forth herein are subject to change without notice.
        </p>
      </div>
    </>
  );
}

export default AboutUsScreen
