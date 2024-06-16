import { create } from "zustand";

const useProfileSettings = create((set) => ({
  avatar: "",
  github: "",
  username: "",
  description: "",
  view: "",
  respository: "",
  followers: "",
  following: "",
  location: "",
  stars: "",
  forks:"",
  repos:"",

  setAvatar: (avatar) => set(() => ({ avatar })),
  setGithub: (github) => set(() => ({ github })),
  setName: (username) => set(() => ({ username })),
  setDescription: (description) => set(() => ({ description })),
  setView: (view) => set(() => ({ view })),
  setRespository: (respository) => set(() => ({ respository })),
  setFollowers: (followers) => set(() => ({ followers })),
  setFollowing: (following) => set(() => ({ following })),
  setLocation: (location) => set(() => ({ location })),
  setStars: (stars) => set(() => ({ stars })),
  setForks: (forks) => set(() => ({ forks })),

  fetchUserProfile: async (github) => {
    try {
      const response = await fetch(`https://api.github.com/users/${github}`);
      
      const data = await response.json();
      set({
        avatar: data.avatar_url,
        github: data.login,
        username: data.name,
        description: data.bio,
        view: data.html_url,
        respository: data.public_repos,
        followers: data.followers,
        following: data.following,
        location: data.location,
         stars:data.stargazers_count,
         forks:data.forks_count,
      });
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  },
}));

export default useProfileSettings;
