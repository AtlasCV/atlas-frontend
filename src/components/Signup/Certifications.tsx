import * as React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import CertificationToken from "../Shared/CertificationToken";
import Button from "../Shared/Button";
import { ProfileState } from "../../reducers/profile";
import { CertificationState } from "../../reducers/certifications";
import { AppState } from "../../reducers";
import * as certificationActions from "../../actions/certifications";
import * as profileActions from "../../actions/profile";

type Props = {
  profile: ProfileState;
  certifications: CertificationState;
  removeCertificationFromApplicant: typeof certificationActions.removeCertificationFromApplicantRequest;
  selectCertificationForApplicant: typeof certificationActions.addCertificationsToApplicantRequest;
  loadCertificationsRequest: typeof certificationActions.loadCertificationsRequest;
  updateApplicantRequest: typeof profileActions.updateApplicantRequest;
  isInProfile?: boolean;
};

type State = {
  selectedCertification: number;
};

class Certifications extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedCertification: 0
    };
  }

  componentDidMount() {
    this.props.loadCertificationsRequest();
  }

  selectCertification = (certificationId: number) => {
    this.setState({ selectedCertification: certificationId });
  };

  render() {
    const {
      profile,
      certifications,
      selectCertificationForApplicant,
      removeCertificationFromApplicant,
      updateApplicantRequest,
      isInProfile
    } = this.props;

    const applicantCertifications = profile.info.Applicant.Certifications.map(
      appCertification => appCertification.id
    );
    return (
      <React.Fragment>
        <h1 className="profile-header">
          Do you hold any of the following certifications?
        </h1>
        {certifications.list.map(certification => {
          const hasCertification =
            applicantCertifications.indexOf(certification.id) > -1;
          return (
            <CertificationToken
              key={certification.id}
              certification={certification}
              selectCertificationForApplicant={selectCertificationForApplicant}
              removeCertificationFromApplicant={
                removeCertificationFromApplicant
              }
              applicantId={profile.info.Applicant.id}
              selected={this.state.selectedCertification === certification.id}
              selectCertification={this.selectCertification}
              hasCertification={hasCertification}
            />
          );
        })}
        <div>
          <Link to={isInProfile ? "/my-profile" : "/onboarding/signup/7"}>
            <Button styles={{ float: "left", marginTop: "40px" }}>
              {isInProfile ? "BACK" : "PREVIOUS"}
            </Button>
          </Link>
          {!isInProfile && (
            <Button
              onClick={() =>
                updateApplicantRequest(
                  profile.info.Applicant.id,
                  { currentPageOfSignup: 8 },
                  "/onboarding/distinguish-yourself"
                )
              }
              styles={{ float: "right", marginTop: "40px" }}
            >
              NEXT
            </Button>
          )}
        </div>
      </React.Fragment>
    );
  }
}

const mapState = ({ profile, certifications }: AppState) => ({
  profile,
  certifications
});

const mapDispatch = {
  removeCertificationFromApplicant:
    certificationActions.removeCertificationFromApplicantRequest,
  selectCertificationForApplicant:
    certificationActions.addCertificationsToApplicantRequest,
  loadCertificationsRequest: certificationActions.loadCertificationsRequest,
  updateApplicantRequest: profileActions.updateApplicantRequest
};

export default connect<
  Partial<AppState>,
  {
    removeCertificationFromApplicant: typeof certificationActions.removeCertificationFromApplicantRequest;
    selectCertificationForApplicant: typeof certificationActions.addCertificationsToApplicantRequest;
    loadCertificationsRequest: typeof certificationActions.loadCertificationsRequest;
    updateApplicantRequest: typeof profileActions.updateApplicantRequest;
  }
>(
  mapState,
  mapDispatch
)(Certifications);
