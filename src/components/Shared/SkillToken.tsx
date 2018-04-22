import * as React from "react";

export default ({
  skill
}: {
  skill: { id: number; name: string; displayName?: string };
}) => (
  <div>
    <h6>{skill.displayName}</h6>
  </div>
);
