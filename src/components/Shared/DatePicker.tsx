import * as React from "react";
import { range } from "lodash";
import Select from "./Select";

export const DatePicker = ({
  values,
  handleChange,
  handleBlur,
  errors,
  namePrefix
}: any) => {
  return (
    <div className="row">
      <div className="col-md-4">
        <Select
          label="MONTH"
          name={namePrefix + "Month"}
          value={values.month}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={errors.month}
        >
          <option />
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </Select>
      </div>
      <div className="col-md-4">
        <Select
          label="DAY"
          name={namePrefix + "Day"}
          value={values.day}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={errors.day}
        >
          <option />
          {range(1, 32).map(i => {
            return <option key={i}>{i}</option>;
          })}
        </Select>
      </div>
      <div className="col-md-4">
        <Select
          label="YEAR"
          name={namePrefix + "Year"}
          value={values.year}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={errors.year}
        >
          <option />
          {range(2019, 1900).map(i => {
            return <option key={i}>{i}</option>;
          })}
        </Select>
      </div>
    </div>
  );
};
