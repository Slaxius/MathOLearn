import Navbar from "../../components/navbar.jsx";
import Header from "../../components/header.jsx";
import "../../css/notification/Notification.css";
import NotificationDetail from "../../json/notification.json";

function Notification() {
  return (
    <div className="page">
      <Navbar />
      <Header />
      <div className="main-section notification">
        {NotificationDetail.map((post, index) => (
          <div
            key={index}
            className={`notification-card ${!post.status ? "opened" : ""}`}
          >
            <div className="notif-type">
              <h1 className="header4">{post.type}</h1>
            </div>
            <div className="notif-detail body1">
              <span className="notif-subject">
                <p>[ {post.subject} ]</p>
              </span>
              <span className="notif-message">
                <p> {post.message} </p>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notification;
