import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Options } from "./data";
import "./styles.css";
const localizer = momentLocalizer(moment);
const Calendarific = require("calendarific");

const Calender = () => {
  const [countryState, setCountryState] = useState("PK");
  const [holidays, setHolidays] = useState([]);

  //Api call here in the use effect hook
  useEffect(() => {
    const clapi = new Calendarific("2ef1e71b3b3abd11669f7c13b0c9913d810fa5d2");
    const parameters = {
      country: countryState,
      year: 2021,
    };
    clapi.holidays(parameters, function (data) {
      console.log(data.response.holidays);
      var a = data.response.holidays;
      var event = [];
      a.forEach((elem) => {
        event.push({
          title: elem.name,
          start: new Date(elem.date.iso),
          end: new Date(elem.date.iso),
        });
      });
      setHolidays(event);
    });
  }, [countryState]);

  return (
    <div>
      <div className="select-box-wrapper">
        <select
          className="select-box"
          value={countryState}
          onChange={(e) => {
            const selectCountry = e.target.value;
            setCountryState(selectCountry);
          }}
        >
          {Options.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      <Calendar
        localizer={localizer}
        events={holidays}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default Calender;
