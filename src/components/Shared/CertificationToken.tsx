import * as React from "react";
import { style } from "typestyle";
import { Certification } from "../../types";

const tokenContainer = style({
  display: "inline-block",
  textAlign: "center",
  width: "33%",
  height: "100px"
});

const years = style({
  height: "70px",
  margin: "20px auto",
  cursor: "pointer",
  fontFamily:
    ' -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'
});

const yearsOption = style({
  $nest: {
    "&:hover": {
      fontWeight: 600
    }
  }
});

const tokenLabel = style({
  fontFamily:
    ' -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
  fontSize: "12px",
  fontWeight: 200,
  margin: "0px"
});

interface Props {
  certification: Certification;
  applicantId: number;
  selected: boolean;
  selectCertificationForApplicant: (
    applicantId: number,
    certification: { id: number }
  ) => void;
  removeCertificationFromApplicant: (
    applicantId: number,
    certificationId: number
  ) => void;
  selectCertification: (certificationId: number) => void;
  hasCertification: boolean;
}

class CertificationToken extends React.Component<Props> {
  render() {
    const {
      certification,
      selectCertification,
      selectCertificationForApplicant,
      applicantId,
      hasCertification,
      removeCertificationFromApplicant
    } = this.props;

    const tokenStyle = style({
      height: "70px",
      margin: "20px auto",
      fontSize: "26px",
      borderRadius: "50%",
      cursor: "pointer",
      width: "70px",
      backgroundColor: hasCertification
        ? "rgb(236, 210, 82)"
        : "rgb(183, 183, 183)",
      color: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily:
        ' -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'
    });

    return (
      <div className={tokenContainer}>
        {this.props.selected ? (
          hasCertification ? (
            <div className={years}>
              <div
                className={yearsOption}
                style={{ paddingTop: "10px" }}
                onClick={() =>
                  removeCertificationFromApplicant(
                    applicantId,
                    certification.id
                  )
                }
              >
                Remove <br /> Certification
              </div>
            </div>
          ) : (
            <div className={years}>
              <div
                className={yearsOption}
                onClick={() =>
                  selectCertificationForApplicant(applicantId, {
                    id: certification.id
                  })
                }
              >
                Add Certification
              </div>
            </div>
          )
        ) : (
          <React.Fragment>
            <div
              className={tokenStyle}
              onClick={() => selectCertification(certification.id)}
            >
              {certification.name
                .split(" ")
                .map(word => word[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </div>
          </React.Fragment>
        )}
        <h6 className={tokenLabel}>
          {certification.name
            .split("_")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </h6>
      </div>
    );
  }
}

export default CertificationToken;
