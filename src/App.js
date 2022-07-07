import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { FaBars, FaChevronLeft } from "react-icons/fa";
import Profile from "./Profile";
import Home from "./Home";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";
import { DataStore } from "@aws-amplify/datastore";
import { Events, Users } from "./models";
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

  const [profileData, setProfileData] = useState(null);
  const [eventData, setEventData] = useState(null);

  // function getData() {
  //   fetch("/profile").then((response) => {
  //     if (response.status == 200){
  //       return response.json()
  //     }}).then(data => setProfileData(data))
  //     .catch((error) => {
  //       if (error.response) {
  //         console.log(error.response);
  //         console.log(error.response.status);
  //         console.log(error.response.headers);
  //       }
  //     });
  // }
  // function fetchData() {
  //   fetch("/events").then((response) => {
  //     if (response.status == 200){
  //       return response.json()
  //     }}).then(data => setEventData(data.events))
  //     .catch((error) => {
  //       if (error.response) {
  //         console.log(error.response);
  //         console.log(error.response.status);
  //         console.log(error.response.headers);
  //       }
  //     });
  //     console.log('here',eventData)
  // }

   // Fetch on events on load

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
        <Route path="/" element={<Home prop={eventData}/>} />
      </Routes>
      </div>
    </Router>
    
  );
}

export default App;
