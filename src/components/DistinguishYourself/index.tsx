import * as React from "react";
import { bindActionCreators, Dispatch } from "redux";
import TextArea from "../Shared/TextArea";
import { connect } from "react-redux";
import { AppState } from "../../reducers";
import "../../styles/signup.css";

type Props = {};

export default connect(
  ({  }: AppState) => ({}),
  (dispatch: Dispatch<AppState>) => bindActionCreators({}, dispatch)
)(
  class DistinguishYourself extends React.Component<
    Props,
    { distinguishYourself: string }
  > {
    constructor(props: Props) {
      super(props);
      this.state = { distinguishYourself: "" };
    }
    render() {
      return (
        <div className="signup-container col-sm-9">
          <h2>Distinguish Yourself</h2>
          <p>
            Now that we've identified your credentials, this is your chance to
            tell your potential employer what sets you apart from the crowd.
          </p>
          <p>
            Consider this the last 'cover letter' you'll have to write for your
            job search. Elaborate on what makes you unique, what you believe
            makes you a valuable asset to any company, maybe even an interesting
            fun fact or two about yourself.
          </p>
          <p>
            Be sure that your descriptions are relevant, professional, honest
            and direct. This could be your chance to stand out from the
            competition!
          </p>
          <TextArea
            label="Distinguish Yourself"
            name="distinguishYourself"
            type="text"
            value={this.state.distinguishYourself}
            error=""
            handleChange={e =>
              this.setState({ distinguishYourself: e.currentTarget.value })
            }
            handleBlur={() => ({})}
            height="300px"
          />
        </div>
      );
    }
  }
);
