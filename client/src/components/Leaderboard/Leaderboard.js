import React, { Component } from "react";
import Header from "../header/Header";
import "./style.css";

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timePeriod: "week",
      currentPage: 1
    };
  }

  changeTimePeriod(period) {
    this.setState({ timePeriod: period, currentPage: 1 });
  }

  changePage(offset) {
    this.setState((prevState) => ({
      currentPage: prevState.currentPage + offset
    }));
  }

  render() {
    const { timePeriod, currentPage } = this.state;

    const mockUsers = new Array(45).fill().map((_, i) => ({
      name: `User ${i + 1}`,
      scores: {
        week: Math.floor(Math.random() * 100),
        month: Math.floor(Math.random() * 100),
        allTime: Math.floor(Math.random() * 100)
      }
    }));

    const sortedUsers = [...mockUsers].sort(
      (a, b) => b.scores[timePeriod] - a.scores[timePeriod]
    );

    const start = (currentPage - 1) * 15;
    const end = currentPage * 15;
    const displayedUsers = sortedUsers.slice(start, end);

    return (
        <>
        <Header/>
      <div className="leaderboard-container">
        <div className="leaderboard-header">
          <button
            className={`leaderboard-toggle-btn${
              timePeriod === "week" ? " active" : ""
            }`}
            onClick={() => this.changeTimePeriod("week")}
          >
            Week
          </button>
          <button
            className={`leaderboard-toggle-btn${
              timePeriod === "month" ? " active" : ""
            }`}
            onClick={() => this.changeTimePeriod("month")}
          >
            Month
          </button>
          <button
            className={`leaderboard-toggle-btn${
              timePeriod === "allTime" ? " active" : ""
            }`}
            onClick={() => this.changeTimePeriod("allTime")}
          >
            All-Time
          </button>
        </div>
        <table className="leaderboard-table">
          <tbody>
            {displayedUsers.map((user, i) => (
              <tr key={i}>
                <td>{i + 1 + start}</td>
                <td>
                  <span
                    className="user-profile-picture"
                    alt="profile picture"
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.scores[timePeriod]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="leaderboard-pagination">
          <button
            className="leaderboard-pagination-btn"
            disabled={currentPage === 1}
            onClick={() => this.changePage(-1)}
          >
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button
            className="leaderboard-pagination-btn"
            disabled={end >= sortedUsers.length}
            onClick={() => this.changePage(1)}
          >
            Next
          </button>
        </div>
      </div>
      </>
    );
  }
}

export default Leaderboard;