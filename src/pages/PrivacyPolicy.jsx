import React from "react";
import "../style/PrivacyPolicy.css";
import { Container, Row, Col } from "reactstrap";
const PrivacyPolicy = () => {
  return (
    <div className="privacyPolicy__content">
      <Container>
        <h2>Privacy Policy</h2>
        <p className="mt-3">
          Rose Garden Special appreciates Your use of the Services and respects
          Your privacy. You can review the Privacy Policy for a list of the
          Services.
        </p>

        <h6 className="mt-5">Modifications</h6>
        <p>
          Rose Garden Special Palabok may revise these Terms on occasion and
          will post the most current version with the Services. If a revision
          meaningfully reduces Your rights, we will notify You (by, for example,
          posting a notice with the Services or sending a notice to an e-mail
          address that You agree to provide). By continuing to use or access the
          Services after the revisions come into effect, You agree to be bound
          by the revised Terms.
        </p>

        <h6 className="mt-5">Miscellaneous</h6>
        <p>
          These Terms constitute the entire agreement of the parties and
          supersede all previous written or oral agreements between the parties
          with respect to the Services. These Terms will be governed by the laws
          of the Quezon city , Phillipines not with standing any conflicts of
          laws principles. Rose Garden's failure to enforce a provision is not a
          waiver of its right to do so later. No waiver by either party of any
          breach or default hereunder shall be deemed to be a waiver of any
          preceding or subsequent breach or default. If a provision is found
          unenforceable, the remaining provisions of the Terms will remain in
          full effect. You may not assign any of Your rights under these Terms,
          and any such attempt will be void. Rose Garden may assign its rights
          to any of its affiliates or subsidiaries, or to any successor in
          interest of any business associated with the Services. Nothing
          contained in this agreement shall create any association, partnership,
          or agency or joint venture between Rose Garden Special Palabok and
          You.
        </p>
      </Container>
    </div>
  );
};

export default PrivacyPolicy;
