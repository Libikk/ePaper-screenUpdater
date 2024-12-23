import React from "react";
import { assetsPath } from "../rootDir";
import "../styles/weddingCountdown.scss";
function formatDays(days) {
  const years = Math.floor(days / 365);
  const remainingDaysAfterYears = days % 365;
  const months = Math.floor(remainingDaysAfterYears / 30);
  const remainingDays = remainingDaysAfterYears % 30;

  return `${years} year${years !== 1 ? "s" : ""}, ${months} month${
    months !== 1 ? "s" : ""
  }, and ${remainingDays} day${remainingDays !== 1 ? "s" : ""}`;
}
const WeddingCountdown = () => {
  const weddingDate = new Date("2023-04-22T07:53:36.603Z");
  const daysSinceWedding = Math.floor(
    (new Date() - weddingDate) / (1000 * 60 * 60 * 24)
  );
  const monthsAndDaysLeft =
    Math.floor((weddingDate - new Date()) / (1000 * 60 * 60 * 24 * 30)) +
    " months and " +
    (Math.floor((weddingDate - new Date()) / (1000 * 60 * 60 * 24)) % 30) +
    " days";

  return (
    <div className="wedding-container">
      {/* <div className='wedding-title'>Wedding in</div> */}
      <div>
        <img
          src={`${assetsPath}/weddingicon.png`}
          alt="kurwa"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <div className="wedding-total-days">{daysSinceWedding} days</div>
      <div className="wedding-months">({formatDays(daysSinceWedding)})</div>
    </div>
  );
};

export default WeddingCountdown;
