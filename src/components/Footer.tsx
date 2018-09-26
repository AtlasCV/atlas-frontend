import * as React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div className="footer">
    <div className="social-icons">social icons go here</div>
    <div className="copyright-and-links">
      <p>c 2018 Showcase. All rights reserved.</p>
      <div>
        <Link to="/terms-and-conditions">terms & conditions</Link>
        <Link to="/contact-us">contact us</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/support">support</Link>
      </div>
    </div>
  </div>
);
