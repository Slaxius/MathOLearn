import Navbar from "../components/navbar.jsx";
import Header from "../components/header.jsx";
import "../css/Forum.css";
import postIcon from "../assets/icon/post_icon.svg";
import forumFilterOption from "../json/forum_filter_option.json"

function Forum() {
  return (
    <div className="page">
      <Navbar />
      <Header />
      <div className="main-section forum">
        <div className="forum-header">
          <div className="filter-forum">
            <div className="filter-title header3">Filter your forum</div>
            <div className="filter-control">
              <div className="filter-group">
                <label className="filter-label body1">SUBJECT</label>
                <select className="filter-select body2">
                  {forumFilterOption.subjects.map((subject, index) => (
                    <option key={index} value={subject.value}>
                      {subject.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label body1">TYPE</label>
                <select className="filter-select body2">
                  {forumFilterOption.types.map((subject, index) => (
                    <option key={index} value={subject.value}>
                      {subject.label}
                    </option>
                  ))}
                </select>
              </div>

              <button className="apply-button body2">Apply</button>
            </div>
          </div>
          <div className="post-forum">
            <div className="post-button">
              <img src={postIcon} alt="post-icon" />
              <p className="header5 post-text">Post</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Forum;
