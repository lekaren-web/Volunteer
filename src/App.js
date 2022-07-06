import React, { useEffect, useState } from "react";
// import div from "reactjs-div";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";
import { DataStore } from "@aws-amplify/datastore";
import { Events, Users } from "./models";
import { FaBars, FaChevronLeft } from "react-icons/fa";
import Profile from "./Profile";
import Home from "./Home";
Amplify.configure(awsconfig);

function App() {
  const [events, setEvents] = useState([]);
  const [user, setuser] = useState(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("1970-01-01Z");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(
    "https://intermountainhealthcare.org/-/media/images/modules/blog/posts/2019/03/volunteering-is-good-for-you-and-your-kids.jpg?la=en&h=504&w=896&mw=896&hash=12B60E2046185023A7BB36AF203332C86DB664AE"
  );
  let NavOpen = false;
  const [newSize, setNewSize] = useState(0);
  let slideIndex = 0;
  const [formOpen, setFormOpen] = useState(false);
  showSlides();

  const [profileData, setProfileData] = useState(null);

  function getData() {
    axios({
      method: "GET",
      url: "/profile",
    })
      .then((response) => {
        const res = response.data;
        setProfileData({
          profile_name: res.name,
          about_me: res.about,
          image: res.image,
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  function showSlides() {
    if (!document.getElementsByClassName("mySlides").length) {
      return;
    }
    let i;
    let slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;

    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 7000); // Change image every 7 seconds
  }
  function openNav() {
    document.getElementById("mySidenav").style.width = "280px";
    document.getElementById("App").style.marginLeft = "280px";
    // document.getElementById("filters").style.marginLeft = "280px";
    document.getElementById("profile").style.width = "150px";
    document.getElementById("profile").style.height = "150px";
    document.getElementById("profile").style.borderRadius = "75px";
    
  }

  function closeNav() {
    document.getElementById("mySidenav").style.width = "70px";
    document.getElementById("App").style.marginLeft = "8px";
    // document.getElementById("filters").style.marginLeft = "70px";
    document.getElementById("profile").style.width = "50px";
    document.getElementById("profile").style.height = "50px";
    document.getElementById("profile").style.borderRadius = "25px";
  }

  function navToggle() {
    if (NavOpen) {
      closeNav();
      NavOpen = false;
    } else {
      openNav();
      NavOpen = true;
    }
  }
  async function fetchData() {
    const events = await DataStore.query(Events);
    setEvents(events);
    console.log("Events retrieved successfully!", events);
  }
  // Fetch on events on load
  useEffect(() => {
    async function fetchData() {
      const events = await DataStore.query(Events);
      setEvents(events);
      console.log("Events retrieved successfully!", events);
    }
    fetchData();

    async function fetchUser() {
      const user = await DataStore.query(Users);
      setuser(user);
      console.log("user retrieved successfully!", user);
    }
    fetchData();
    getData();
  }, []);

  // useEffect(() => {
  // Writing to the database
  async function addData() {
    await DataStore.save(
      new Events({
        title,
        date,
        description,
        image,
      })
    );
    return setDescription(""), setDate(""), setTitle("");
  }

  // },[])
  // Read from database  !
  // const events = await DataStore.query(Events);
  // console.log("Events retrieved successfully!", JSON.stringify(events, null, 2));

  return (
    <Router>
      <div className="App" style={{ zIndex: 0, marginLeft: { newSize } }}>
        <nav
          id="mySidenav"
          style={{
            height: "100vh",
            width: "70px",
            position: "fixed",
            zIndex: 20,
            backgroundColor: "#91b7c7",
            boxShadow: "0px 0px 0px 1px rgba(0, 0, 0, 0.03)",
            paddingTop: 30,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            id="profile"
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: "black",
              overflow: "hidden",
            }}
          >
            <img
              style={{ width: "100%", height: "auto" }}
              src={profileData ? profileData.image : ""}
            />
          </div>
          <button
            style={{
              width: "100%",
              backgroundColor: "transparent",
              border: 0,
              padding: 5,
              marginTop: 10,
            }}
            onClick={navToggle}
          >
            <span>
              <span id="menu" style={{ padding: "3px" }}>
                <FaBars style={{ height: "50px", color: "white" }} />
              </span>
            </span>
          </button>
          <div
            id="openmenu"
            style={{ display: "none", textAlign: "center", color: "white" }}
          >
            {/* <FaChevronLeft  styled={{position: 'relative', top: 0, right: 100}}/> */}
            <Link to="/profile">Profile</Link>

          </div>
        </nav>
 
      </div>
      <div id="App">
      <Routes>
        <Route path="/profile" element={<Profile/>} />
        <Route path="/" element={<Home/>} />
      </Routes>
      </div>
    </Router>
    
  );
}

export default withAuthenticator(App);
