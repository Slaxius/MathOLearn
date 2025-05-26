import Navbar from "../components/navbar.jsx";
import Header from "../components/header.jsx";
import "../css/Leaderboard.css";
import GoldMedal from "../assets/icon/gold_medal.svg";
import SilverMedal from "../assets/icon/silver_medal.svg";
import BronzeMedal from "../assets/icon/bronze_medal.svg";

function Leaderboard() {
  const leaderboardData = [
    { rank: 1, username: "Username", score: 999 },
    { rank: 2, username: "Username", score: 999 },
    { rank: 3, username: "Username", score: 999 },
    { rank: 4, username: "Username", score: 999 },
    { rank: 5, username: "Username", score: 999 },
    { rank: 6, username: "Username", score: 999 },
    { rank: 7, username: "You", score: 999, isCurrentUser: true },
    { rank: 8, username: "Username", score: 999 },
    { rank: 9, username: "Username", score: 999 },
  ];

  const topThree = leaderboardData.slice(0, 3);
  const remainingRanks = leaderboardData.slice(3);

  return (
    <div className="page">
      <Navbar />
      <Header />
      <div className="main-section">
        <div className="podium-container">
          <div className="podium-item third-place">
            <div className="user-profile-picture">
              <img src="" alt="third-place user picture" />
            </div>
            <div className="user-medal">
              <img src={BronzeMedal} alt="bronze-medal" />
            </div>
            <div className="user-card">
              <p className="user-name header5">{topThree[2]?.username}</p>
              <p className="user-score mediumHeader5">{topThree[2]?.score}</p>
            </div>
          </div>
          <div className="podium-item first-place">
            <div className="user-profile-picture">
              <img src="" alt="first-place user picture" />
            </div>
            <div className="user-medal">
              <img src={GoldMedal} alt="gold-medal" />
            </div>
            <div className="user-card">
              <p className="user-name header5">{topThree[0]?.username}</p>
              <p className="user-score mediumHeader5">{topThree[0]?.score}</p>
            </div>
          </div>
          <div className="podium-item second-place">
            <div className="user-profile-picture">
              <img src="" alt="second-place user picture" />
            </div>
            <div className="user-medal">
              <img src={SilverMedal} alt="silver-medal" />
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
                <img src="" alt={`${user.username} picture`} />
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
