import { IoLocationOutline } from "react-icons/io5";
import { PiBuildingsFill } from "react-icons/pi";
import { FaBook } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";  
import "../assets/global.css";
import { useState } from "react";


const Profile=()=>{
    const[data,setData]=useState({}) ;
    const[username,setUsername]=useState("") ;
      const[repositories,setRespositories]=useState([]);
    const onchangeHandler = e =>{
        setUsername(e.target.value)
    };

     const submitHandler=async e => {
        e.preventDefault();
       
        const profile = await fetch(`https://api.github.com/users/${username}`); 
          const profilejson= await profile.json();
           console.log(profilejson);
          
          const repos = await fetch(profilejson.repos_url);
          const repojson = await repos.json();
          console.log(repojson);


            if (profilejson){
                setData(profilejson);
                setRespositories(repojson);
               
            }

     };
     return(
        <section className="header">
        <h1>Github Finder</h1>
        <p>
          By <a href="https://github.com/AnthonyNgunjiri/">Anthony Ngunjiri</a>
        </p>
        <span className="fill">
          <input
            type="text"
            placeholder="Enter user"
           onChange={onchangeHandler}
          />
          <button type="submit" onClick={submitHandler }>Search</button>
        </span>
        <section className="profile">
        <div className="git">
          <div className="img">
            <img src={data.avatar_url} alt="avatar" />
          </div>
          <div>
            <h2>{data.name} </h2>
            <p>{data.login}</p>
            <p>{data.bio}</p>
            <button className="btn">
              <FaArrowUpRightFromSquare />
              <a href={data.html_url} target="_blank" rel="noopener noreferrer">
                View on Github
              </a>
            </button>
            <p>
              <IoLocationOutline />
              {data.location}
            </p>
            <p>
              <FaBook />
              {data.public_repos} Repositories
            </p>
            <p>
              <IoIosPeople />
              {data.followers} Followers
            </p>
            <p>
              <IoIosPeople />
              {data.following} Following
            </p>
          </div>
        </div>
        <div className="repo">{repositories.map(repo =>(<div className=""> 
          <div className="card"><a href={repo.html_url}></a></div>
        </div>)
          
        )}
  </div>
      </section> 
     






        </section>
        );
};
export  default Profile;
        