import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import "./style.css";
import { rootURL } from '../../utils/utils';

export default function Leaderboard() {
  const [timePeriod, setTimePeriod] = useState("week");
  const [currentPage, setCurrentPage] = useState(1);
  const [scores, setScores] = useState(null);

  useEffect(() => {
    axios.get(`${rootURL}:3000/scores`)
      .then(response => {
        setScores(response.data);
      })
      .catch(error => {
        console.error('Error fetching channels data: ', error);
      });
  }, []);

  const changeTimePeriod = (period) => {
    setTimePeriod(period);
    setCurrentPage(1);
  };

  const changePage = (offset) => {
    setCurrentPage(currentPage + offset);
  };

  const mockUsers = useMemo(() => new Array(45).fill().map((_, i) => ({
    name: `User ${i + 1}`,
    week: Math.floor(Math.random() * 100),
    month: Math.floor(Math.random() * 100),
    allTime: Math.floor(Math.random() * 100)
  })), []);

  if (!scores) return <div>Loading...</div>;



  const sortedUsers = [...mockUsers, ...scores].sort(
    (a, b) => b[timePeriod] - a[timePeriod]
  );

  const start = (currentPage - 1) * 15;
  const end = currentPage * 15;
  const displayedUsers = sortedUsers.slice(start, end);


  return (
    <>
      <div className="leaderboard-container">
        <div className="leaderboard-header">
          <button
            className={`leaderboard-toggle-btn ${timePeriod === "week" ? " active" : ""
              }`}
            onClick={() => changeTimePeriod("week")}
          >
            Week
          </button>
          <button
            className={`leaderboard-toggle-btn ${timePeriod === "month" ? " active" : ""
              }`}
            onClick={() => changeTimePeriod("month")}
          >
            Month
          </button>
          <button
            className={`leaderboard-toggle-btn ${timePeriod === "allTime" ? " active" : ""
              }`}
            onClick={() => changeTimePeriod("allTime")}
          >
            All-Time
          </button>
        </div>
        <div className="leaderboard-table-container">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th></th>
                <th>User</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {displayedUsers.map((user, i) => (
                <tr key={i}>
                  <td>{i + 1 + start}</td>
                  {/* <td>
                      <span
                        className="user-profile-picture"
                        alt="profile picture"
                      />
                    </td> */}
                  <td>{user.name}</td>
                  <td>{user[timePeriod]}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="leaderboard-pagination">
            <button
              className="leaderboard-pagination-btn"
              disabled={currentPage === 1}
              onClick={() => changePage(-1)}
            >
              Previous
            </button>
            <span>Page {currentPage}</span>
            <button
              className="leaderboard-pagination-btn"
              disabled={end >= sortedUsers.length}
              onClick={() => changePage(1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}