import "../css/header.css";

function header() {
  const username = localStorage.getItem("username") || "User";

  return (
    <div className="header">
      <h5 className="header5">Hi, Student {username}!</h5>
      <div className="life">1 2 3 4</div>
    </div>
  );
}

export default header;
