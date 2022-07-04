import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";
import { DataStore } from "@aws-amplify/datastore";
import { Events, Users } from "./models";
import { FaBars, FaChevronLeft } from "react-icons/fa";
import planting from "./planting.png";
Amplify.configure(awsconfig);

function App() {
  const [events, setEvents] = useState([]);
  const [user, setuser] = useState(null);
  let NavOpen = false;
  const [newSize, setNewSize] = useState(0);
  let slideIndex = 0;
  showSlides();

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
    document.getElementById("carousel").style.marginLeft = "460px";
    document.getElementById("carousel").style.width = "60%";
    // document.getElementById("filters").style.marginLeft = "280px";
    document.getElementById("upcoming").style.marginLeft = "410px";
    document.getElementById("profile").style.width = "150px";
    document.getElementById("profile").style.height = "150px";
    document.getElementById("profile").style.borderRadius = "75px";
    document.getElementById("openmenu").style.display = "block";
    document.getElementById("menu").style.display = "none";
  }

  function closeNav() {
    document.getElementById("mySidenav").style.width = "70px";
    document.getElementById("App").style.marginLeft = "8px";
    document.getElementById("carousel").style.marginLeft = "255px";
    // document.getElementById("filters").style.marginLeft = "70px";
    document.getElementById("upcoming").style.marginLeft = "150px";
    document.getElementById("profile").style.width = "40px";
    document.getElementById("profile").style.height = "40px";
    document.getElementById("profile").style.borderRadius = "20px";
    document.getElementById("openmenu").style.display = "none";
    document.getElementById("menu").style.display = "block";
    document.getElementById("carousel").style.width = "70%";
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
  }, []);

  // useEffect(() => {
  // Writing to the database
  async function addData() {
    try {
      await DataStore.save(
        new Events({
          title: "Lorem ipsum dolor sit amet",
          date: "1970-01-01Z",
          description: "Lorem ipsum dolor sit amet",
        })
      );
    } catch (error) {
      console.log("Error retrieving events", error);
    }
  }

  // },[])
  // Read from database  !
  // const events = await DataStore.query(Events);
  // console.log("Events retrieved successfully!", JSON.stringify(events, null, 2));

  return (
    <div className="App" style={{ zIndex: 0, marginLeft: { newSize } }}>
      <nav
        id="mySidenav"
        style={{
          height: "100vh",
          width: "70px",
          position: "fixed",
          zIndex: 20,
          backgroundColor: "#9CAFb7",
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
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "#595959",
          }}
        ></div>
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
          <h4>Chat</h4>
          <AmplifySignOut />
        </div>
      </nav>
      {/* Slideshow container  */}
      <div
        style={{
          height: "400px",
          marginBottom: 30,
          paddingTop: 40,
          marginLeft: 255,
        }}
        className="slideshow-container"
        id="carousel"
      >
        {/* Full-width images with number and caption text */}
        {events.length ? (
          <>
            {events.map((event) => (
              <div
                className="mySlides"
                style={{
                  borderRadius: 13,
                  boxShadow: "1px 1px 2px 1px #9CAFb7",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  <div class="left">
                    <h1>left</h1>
                  </div>

                  <div class="right">
                    <h1>right</h1>
                  </div>
                </div>
                {/* <a class="prev" onclick="plusSlides(-1)">
                  &#10094;
                </a>
                <a class="next" onclick="plusSlides(1)">
                  &#10095;
                </a> */}
              </div>
            ))}
          </>
        ) : (
          <div className="mySlides">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARwAAACxCAMAAAAh3/JWAAAAA1BMVEUbqPBsarW2AAAASElEQVR4nO3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIALA8UNAAFusnLHAAAAAElFTkSuQmCC"
              style={{ width: "100%" }}
            />
            {/* <div
                  style={{
                    position: "absolute",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <p>Caption Text</p>
                </div> */}
            <a class="prev" onclick="plusSlides(-1)">
              &#10094;
            </a>
            <a class="next" onclick="plusSlides(1)">
              &#10095;
            </a>
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginLeft: 150,
        }}
        id="upcoming"
      >
        <h1
          style={{
            textAlign: "left",
            color: "#344966",
            position: "static",
            width: "100%",
            alignSelf: "flex-start",
          }}
        >
          Upcoming Events
        </h1>
      </div>
      <div
        id="App"
        style={{ display: "flex", flexDirection: "column", padding: 30 }}
        className="App-header"
      >
        {/* <button onClick={fetchData}>Add Event</button> */}
        {/* <div id="filters">
          filters
        </div> */}

        {events.length ? (
          <div
            style={{
              width: "90%",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignContent: "center",
              alignItems: "center",
              paddingTop: "40%",
              padding: 10,
              marginLeft: 70,
            }}
          >
            {events.map((event) => (
              <div
                className="Event-card"
                style={{
                  height: "270px",
                  backgroundColor: "white",
                  margin: 20,
                  width: "250px",
                  borderRadius: 10,
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "1px 1px 2px 1px rgba(0, 0, 255, .1)",
                  overflow: "clip",
                }}
                key={event.id}
              >
                <img
                  src={event.image}
                  style={{ width: "100%", borderRadius: "10, 10, 0, 0" }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 8,
                    width: "100%",
                  }}
                >
                  <p
                    style={{
                      color: "black",
                      textAlign: "left",
                      marginBottom: -10,
                      color: "grey",
                    }}
                  >
                    {event.title}
                  </p>
                  <p
                    style={{
                      color: "black",
                      textAlign: "left",
                      color: "grey",
                      fontSize: 12,
                    }}
                  >
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h3>No Events to load</h3>
        )}
      </div>
    </div>
  );
}

export default withAuthenticator(App);
