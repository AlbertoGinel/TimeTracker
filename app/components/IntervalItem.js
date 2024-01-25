import * as moment from "moment";
import "moment-timezone";

export default function IntervalItem({ interval }) {
  if (!interval || !interval.from) {
    return null;
  }

  const utcDateTimeFrom = moment(interval.from, "YYYY-MM-DDTHH:mm:ss.SSSZ");

  let utcDateTimeTo = "";

  if (interval.to === "open") {
    const currentTime = moment.now();
    utcDateTimeTo = moment(currentTime).utc();
  } else {
    utcDateTimeTo = moment(interval.to, "YYYY-MM-DDTHH:mm:ss.SSSZ");
  }

  if (!utcDateTimeFrom.isValid || !utcDateTimeTo.isValid) {
    return null;
  }

  const localDateTimeFrom = utcDateTimeFrom.tz("UTC").local();
  const localDateTimeTo = utcDateTimeTo.tz("UTC").local();

  const duration = moment.duration(localDateTimeTo.diff(localDateTimeFrom));
  const formattedDuration = moment
    .utc(duration.as("milliseconds"))
    .format("HH:mm");

  const formattedLocalTimeFrom = localDateTimeFrom.format("HH:mm DD/MM/yy");
  const formattedLocalTimeTo = localDateTimeTo.format("HH:mm DD/MM/yy");

  return (
    <div style={{ backgroundColor: interval.color }}>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, padding: 5 }}>
          {interval.icon} {interval.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", flex: 2 }}>
          <div> {formattedLocalTimeFrom}</div>
          <div> {formattedLocalTimeTo}</div>
        </div>

        <div style={{ flex: 1 }}>{formattedDuration}</div>
      </div>
    </div>
  );
}
