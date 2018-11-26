import * as React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { AppState } from "../../reducers";
import "../../styles/distingish-yourself.css";
import Button from "../Shared/Button";

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
        <div className="distinguish-yourself">
          <h1>Think of this as your cover letter.</h1>
          <div className="distinguish-yourself-inner-section">
            <h2>What makes you the ideal candidate?</h2>
            <textarea
              placeholder="Distinguish yourself..."
              name="distinguishYourself"
              value={this.state.distinguishYourself}
              onChange={e =>
                this.setState({ distinguishYourself: e.currentTarget.value })
              }
              onBlur={() => ({})}
            />
            <Button
              styles={{
                position: "absolute",
                right: 120,
                bottom: 125
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      );
    }
  }
);
