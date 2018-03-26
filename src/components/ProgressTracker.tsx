import * as React from "react";
import "../styles/progress-tracker.css";

type Props = {
  progress: number;
};

export default ({ progress }: Props) => {
  return (
    <div className="container">
      <h5 className="header-text">Progress</h5>
      <p className="progress-labels start-label">0%</p>
      <p className="progress-labels end-label">100%</p>
      <div
        style={{
          width: "100%",
          height: "20px",
          backgroundColor: "#fff",
          marginBottom: "30px",
          border: "solid 2px #aaa",
          borderRadius: "4px",
          background: "Transparent",
          zIndex: 2
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            backgroundColor: "#1db0ed",
            height: "16px",
            zIndex: 1,
            borderRadius: "2px"
          }}
        />
      </div>
    </div>
  );
};
