import React, { useEffect, useState } from "react";
import "../assets/global.css";
import { IoLocationOutline } from "react-icons/io5";
import { PiBuildingsFill } from "react-icons/pi";
import { FaBook } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { FaCodeFork } from "react-icons/fa6";

import useProfileSettings from "./Profilesettings";

const Gitprofile = () => {
  const [data, setData] = useState({});
  const [search, setSearch] = useState("");
  const [repositories, setRespositories] = useState([]);
  const [follows, setFollows] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [loading,Setlading] = useState("");
  const avatar = useProfileSettings((state) => state.avatar);
  const github = useProfileSettings((state) => state.github);
  const userName = useProfileSettings((state) => state.username);
  const description = useProfileSettings((state) => state.description);
  const view = useProfileSettings((state) => state.view);
  const respository = useProfileSettings((state) => state.respository);
  const followers = useProfileSettings((state) => state.followers);
  const following = useProfileSettings((state) => state.following);
  const location = useProfileSettings((state) => state.location);
  const stars = useProfileSettings((state) => state.stars);
  const forks = useProfileSettings((state) => state.forks);
  const fetchUserProfile = useProfileSettings(
    (state) => state.fetchUserProfile
  );

  useEffect(() => {
    if (github) {
      fetchUserProfile(github);
    }
  }, [userName, fetchUserProfile]);

  const onchangeHandler = (e) => {
    setSearch(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    fetchUserProfile(search);
    const profile = await fetch(`https://api.github.com/users/${github}`);
    const profileJson = await profile.json();
    // console.log(profilejson);

    const repos = await fetch(profileJson.repos_url);
    const repoJson = await repos.json();
    const follower = await fetch(profileJson.followers_url);
    const followerJson = await follower.json();
    const followingUrl = profileJson.following_url.replace("{/other_user}", "");
    const followings = await fetch(followingUrl);
    const followingJson = await followings.json();

    if (profileJson) {
      setData(profileJson);
      setRespositories(repoJson);
      setFollows(followerJson);
      setFollowings(followingJson);
    }
  };

  return (
    <div className="main">
      <section className="header">
        <h1>Github Finder</h1>
        <p>
          By <a href="https://github.com/AnthonyNgunjiri/">Anthony Ngunjiri</a>
        </p>
        <span className="fill">
          <input
            type="text"
            placeholder="Enter user"
            value={search}
            onChange={onchangeHandler}
          />
          <button type="submit" onClick={submitHandler}>
            Search
          </button>
        </span>
      </section>
      <section className="profile">
        <div className="git">
          <div className="img">
            <img src={avatar} alt="avatar" />
          </div>
          <div>
            <div className="tab">
              <h2>{userName} Github</h2>
              <p>{github}</p>
              <p className="details">{description}</p>
              <button className="btn">
                <FaArrowUpRightFromSquare />
                <a href={view} target="_blank">
                  View on Github
                </a>
              </button>
              <p>
                <IoLocationOutline />
                {location}
              </p>
              <p>
                <FaBook />
                {respository} Repositories
              </p>
              <p>
                <IoIosPeople />
                {followers} Followers
              </p>
              <p>
                <IoIosPeople />
                {following} Following
              </p>
            </div>
          </div>
        </div>
        <section className="content">
        <h1 className="heading">Respositories</h1>
          <div className="repo">
            {repositories.map((repo) => (
              <button className="card" key={repo.id}>
                <a href={repo.html_url}></a>
                <h2 className="task">{repo.name}</h2>
                <p>{repo.description}</p>
                <ul className="list">
                  <li>
                    <FaCodeFork />
                    {repo.forks} forks
                  </li>
                  <li>
                    <FaStar />
                    {repo.stargazers_count} stars
                  </li>
                </ul>
              </button>
            ))}
          </div>
          <h1 className="heading">Followers</h1>
          <div className="prof">
            {follows.map((follow) => (
              <div className="card2"key={follow.id}>
                <img src={follow.avatar_url}></img>
                <h2 className="task">{follow.login}</h2>
                <button>
                  view<a href={follow.html_url} target="_blank"></a>
                  {follow.login}
                </button>
              </div>
            ))}
          </div>
          <h1 className="heading">following</h1>
          <div className="prof">
            {followings.map((foll) => (
              <div className="card2" key={foll.id}>
                <img src={foll.avatar_url} alt={foll.login} />
                <h2 className="task">{foll.login}</h2>
                <button>
                  <a
                    href={foll.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View {foll.login}
                  </a>
                </button>
              </div>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};

export default Gitprofile;
