import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar.jsx";
import Header from "../../components/header.jsx";
import "../../css/notification/Notification.css";
import initialNotificationDetail from "../../json/notification.json";

function Notification() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(() => {
    try {
      const storedNotifications = localStorage.getItem("userNotifications");
      if (storedNotifications) {
        return JSON.parse(storedNotifications);
      }
    } catch (error) {
      console.error("Failed to parse notifications from localStorage:", error);
    }
    return initialNotificationDetail;
  });

  useEffect(() => {
    try {
      localStorage.setItem("userNotifications", JSON.stringify(notifications));
    } catch (error) {
      console.error("Failed to save notifications to localStorage:", error);
    }
  }, [notifications]);

  const handleNotificationClick = (
    notificationId,
    targetRouteType,
    targetSubjectSlug,
    targetMaterialType,
    targetItemId
  ) => {
    const updatedNotifications = notifications.map((notif) =>
      notif.id === notificationId ? { ...notif, status: false } : notif
    );
    setNotifications(updatedNotifications);

    let path = "/";
    const encodedSubjectSlug = targetSubjectSlug ? encodeURIComponent(targetSubjectSlug) : '';

    if (targetRouteType === "forum") {
      path = `/forum/${targetItemId}`;
    } else if (targetRouteType === "learn") {
      if (targetMaterialType === "exercise" || targetMaterialType === "quiz") {
        path = `/learn/subject/${encodedSubjectSlug}`;
      } else {
        path = `/learn/subject/${encodedSubjectSlug}/${targetMaterialType}/${targetItemId}`;
      }
    }

    navigate(path);
  };

  return (
    <div className="page">
      <Navbar />
      <Header />
      <div className="main-section notification">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`notification-card ${!notif.status ? "opened" : ""}`}
            onClick={() =>
              handleNotificationClick(
                notif.id,
                notif.targetRouteType,
                notif.targetSubjectSlug,
                notif.targetMaterialType,
                notif.targetItemId
              )
            }
          >
            <div className="notif-type">
              <h1 className="header4">{notif.type}</h1>
            </div>
            <div className="notif-detail body1">
              <span className="notif-subject">
                <p>[ {notif.subject} ]</p>
              </span>
              <span className="notif-message">
                <p> {notif.message} </p>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notification;