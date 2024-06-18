import React, { useEffect, useState } from "react";
import "../assets/global.css";
import { IoLocationOutline } from "react-icons/io5";
import { FaBook } from "react-icons/fa"; 
import { IoIosPeople } from "react-icons/io";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { FaCodeFork } from "react-icons/fa6";

import useProfileSettings from "./Profilesettings";

const Gitprofile = () => {
  const [data, setData] = useState({});
  const [search, setSearch] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [follows, setFollows] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [loading, setLoading] = useState(false);
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
  const fetchUserProfile = useProfileSettings((state) => state.fetchUserProfile);

  useEffect(() => {
   
    const defaultUser = "github";
    fetchUserProfile(defaultUser).then(() => {
     
      fetchUserDetails(defaultUser);
    });
  }, []);

  const fetchUserDetails = async (username) => {
    setLoading(true);
    try {
      const profile = await fetch(`https://api.github.com/users/${username}`);
      const profileJson = await profile.json();

      const repos = await fetch(profileJson.repos_url);
      const repoJson = await repos.json();

      const followers = await fetch(profileJson.followers_url);
      const followersJson = await followers.json();

      const followingUrl = profileJson.following_url.replace("{/other_user}", "");
      const followings = await fetch(followingUrl);
      const followingsJson = await followings.json();

      setData(profileJson);
      setRepositories(repoJson);
      setFollows(followersJson);
      setFollowings(followingsJson);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    } finally {
      setLoading(false);
    }
  };

  const onchangeHandler = (e) => {
    setSearch(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    fetchUserProfile(search);
    fetchUserDetails(search);
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
              <h2>{userName}</h2>
              <p>{github}</p>
              <p className="details">{description}</p>
              <button className="btn">
                <FaArrowUpRightFromSquare />
                <a href={view} target="_blank" rel="noopener noreferrer">
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
          <h1 className="heading">Repositories</h1>
          <div className="repo">
            {repositories.map((repo) => (
              <button className="card" key={repo.id}>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  <h2 className="task">{repo.name}</h2>
                </a>
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
              <div className="card2" key={follow.id}>
                <img src={follow.avatar_url} alt={follow.login} />
                <h2 className="task">{follow.login}</h2>
                <button>
                  <a href={follow.html_url} target="_blank" rel="noopener noreferrer">
                    View {follow.login}
                  </a>
                </button>
              </div>
            ))}
          </div>
          <h1 className="heading">Following</h1>
          <div className="prof">
            {followings.map((foll) => (
              <div className="card2" key={foll.id}>
                <img src={foll.avatar_url} alt={foll.login} />
                <h2 className="task">{foll.login}</h2>
                <button>
                  <a href={foll.html_url} target="_blank" rel="noopener noreferrer">
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
