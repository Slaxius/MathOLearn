import Navbar from "../components/navbar.jsx";
import Header from "../components/header.jsx";
import "../css/Leaderboard.css";
import leaderboardData from "../json/leaderboard_data.json"

function Leaderboard() {
  const topThree = leaderboardData.slice(0, 3);
  const remainingRanks = leaderboardData.slice(3);

  return (
    <div className="page">
      <Navbar />
      <Header />
      <div className="main-section leaderboard">
        <div className="podium-container">
          <div className="podium-item third-place">
            <div className="user-profile-picture">
              <img src="/assets/icon/white_username_icon.svg" alt="third-place user picture" />
            </div>
            <div className="user-medal">
              <img src="/assets/icon/bronze_medal.svg" alt="bronze-medal" />
            </div>
            <div className="user-card">
              <p className="user-name header5">{topThree[2]?.username}</p>
              <p className="user-score mediumHeader5">{topThree[2]?.score}</p>
            </div>
          </div>
          <div className="podium-item first-place">
            <div className="user-profile-picture">
              <img src="/assets/icon/white_username_icon.svg" alt="first-place user picture" />
            </div>
            <div className="user-medal">
              <img src="/assets/icon/gold_medal.svg" alt="gold-medal" />
            </div>
            <div className="user-card">
              <p className="user-name header5">{topThree[0]?.username}</p>
              <p className="user-score mediumHeader5">{topThree[0]?.score}</p>
            </div>
          </div>
          <div className="podium-item second-place">
            <div className="user-profile-picture">
              <img src="/assets/icon/white_username_icon.svg" alt="second-place user picture" />
            </div>
            <div className="user-medal">
              <img src="/assets/icon/silver_medal.svg" alt="silver-medal" />
            </div>
            <div className="user-card">
              <p className="user-name header5">{topThree[1]?.username}</p>
              <p className="user-score mediumHeader5">{topThree[1]?.score}</p>
            </div>
          </div>
        </div>
        <div className="ranking-container">
          {remainingRanks.map((user) => (
            <div
              key={user.rank}
              className={`ranking-item ${
                user.isCurrentUser ? "current-user" : ""
              }`}
            >
              <div className="rank-number header5">{user.rank}</div>
              <div className="user-picture">
                <img src="/assets/icon/white_username_icon.svg" alt={`${user.username} picture`} />
              </div>
              <div className="user-name boldBody1">{user.username}</div>
              <div className="user-score body1">{user.score}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
