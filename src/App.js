import React, { useEffect, useState } from "react";
// import div from "reactjs-div";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";
import { DataStore } from "@aws-amplify/datastore";
<<<<<<< HEAD
import { Events, Users } from "./models";
import { FaBars, FaChevronLeft } from "react-icons/fa";
import Profile from "./Profile";
import Home from "./Home";
=======
import { Events } from "./models";
import { FaBars } from "react-icons/fa";

>>>>>>> parent of 001b6c9 (update: events loaded)
Amplify.configure(awsconfig);

function App() {
  const [events, setEvents] = useState([]);
<<<<<<< HEAD
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
=======
  const [menuOpen, setMenuOpen] = useState(false);
  const [newSize, setNewSize] = useState(0)

  function openMenu() {
      setMenuOpen({ menuOpen: !menuOpen });
      setNewSize({newSize: 210})
>>>>>>> parent of 001b6c9 (update: events loaded)
  }
  function closeMenu() {
    setMenuOpen({ menuOpen: !menuOpen });
      setNewSize({newSize: 0})
  }
<<<<<<< HEAD
  async function fetchData() {
    const events = await DataStore.query(Events);
    setEvents(events);
    console.log("Events retrieved successfully!", events);
  }
=======
  
>>>>>>> parent of 001b6c9 (update: events loaded)
  // Fetch on events on load
  useEffect(() => {
    async function fetchData() {
      const events = await DataStore.query(Events);
      setEvents(events);
      console.log("Events retrieved successfully!", events);
    }
    fetchData();
<<<<<<< HEAD

    async function fetchUser() {
      const user = await DataStore.query(Users);
      setuser(user);
      console.log("user retrieved successfully!", user);
    }
    fetchData();
    getData();
=======
>>>>>>> parent of 001b6c9 (update: events loaded)
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
<<<<<<< HEAD
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
=======
    <div className="App" style={{ zIndex: 0, marginLeft:{newSize} }}>
      <nav>
        {menuOpen ? (
          <nav
            style={{
              height: "100vh",
              width: "200px",
              position: "absolute",
              zIndex: 2,
              backgroundColor: "wheat",
            }}
          >
            <button
              style={{
                //   backgroundColor: "white",
                padding: 5,
                marginTop: 10,
                width: "100%",
              }}
            >
              <span
                style={{ padding: "5px", width: "100%" }}
                onClick={closeMenu}
              >
                <FaBars />
              </span>
            </button>
          </nav>
        ) : (
          <nav
            style={{
              height: "100vh",
              width: "50px",
              position: "absolute",
              zIndex: 2,
              backgroundColor: "wheat",
            }}
          >
            <button
              style={{
                width: "100%",
                backgroundColor: "transparent",
                border: 0,
                padding: 5,
                marginTop: 10,
              }}
            >
              <span style={{ padding: "5px" }} onClick={openMenu}>
                <FaBars />
              </span>
            </button>
          </nav>
        )}
      </nav>
      <div style={{ height: "300px", overflow: "hidden" }}>hi</div>
      <div
        style={{ display: "flex", flexDirection: "column" }}
        className="App-header"
      >
        {/* <button onClick={fetchData}>Add Event</button> */}
        <div>hi</div>
        {events.length ? (
          <div
            style={{
              width: "80%",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignContent: "center",
              alignItems: "center",
              paddingTop: "40%",
              padding: 10,
>>>>>>> parent of 001b6c9 (update: events loaded)
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
<<<<<<< HEAD
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
=======
            {events.map((event) => (
              <div
                className="Event-card"
                style={{
                  height: "210px",
                  backgroundColor: "white",
                  margin: 30,
                  width: "200px",
                  padding: 10,
                  borderRadius: 10,
                  display: "flex",
                  flexDirection: "column",
                }}
                key={event.id}
              >
                <div style={{ color: "black" }}>image goes here</div>
                <p style={{ color: "black" }}>{event.title}</p>
              </div>
            ))}
          </div>
        ) : (
          <h3>No Events to load</h3>
        )}
        <AmplifySignOut />
>>>>>>> parent of 001b6c9 (update: events loaded)
      </div>
    </Router>
    
  );
}

export default withAuthenticator(App);
