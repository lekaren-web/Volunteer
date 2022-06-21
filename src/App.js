import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";
import { DataStore } from "@aws-amplify/datastore";
import { Events } from "./models";
import { FaBars } from "react-icons/fa";

Amplify.configure(awsconfig);

function App() {
  const [events, setEvents] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [newSize, setNewSize] = useState(0)

  function openMenu() {
      setMenuOpen({ menuOpen: !menuOpen });
      setNewSize({newSize: 210})
  }
  function closeMenu() {
    setMenuOpen({ menuOpen: !menuOpen });
      setNewSize({newSize: 0})
  }
  
  // Fetch on events on load
  useEffect(() => {
    async function fetchData() {
      const events = await DataStore.query(Events);
      setEvents(events);
      console.log("Events retrieved successfully!", events);
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
            }}
          >
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
      </div>
    </div>
  );
}

export default withAuthenticator(App);
