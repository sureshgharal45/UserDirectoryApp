import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Clock from "./Clock";
import ProfilePage from "./ProfilePage";

const UserDetails = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [currentTime, setCurrentTime] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [clockRun, setClockRun] = useState(true);
  const intervalRef = useRef(null);
  const [pausedTime, setPausedTime] = useState(0);
  const [initialized, setInitialized] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [selectedCountryTime, setSelectedCountryTime] = useState("");
  const pausedTimeRef = useRef(0);
  const selectedCountryTimerRef = useRef(null);

  useEffect(() => {
    // fetch data for the countries, user and its related posts
    const fetchData = async () => {
      try {
        const countriesData = await axios.get(
          "http://worldtimeapi.org/api/timezone"
        );
        setCountries(countriesData.data);

        if (!initialized) {
          setInitialized(true);
        }

        const userResponse = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        setUserProfile(userResponse.data);
        const postsResponse = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
        );
        setUserPosts(postsResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [initialized, userId]);

  useEffect(() => {
    let timer;
    //digital timer logic
    if (clockRun) {
      timer = setInterval(() => {
        setPausedTime((prevTime) => prevTime + 1);
        setCurrentTime(getFormattedTime(pausedTime));
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [clockRun, pausedTime]);
  
  //Time formatted logic
  const getFormattedTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((timeInSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${hours} : ${minutes} : ${seconds}`;
  };

  //handle pause and resume clock 
  const handleResumePauseClock = () => {
    if (selectedCountry) {
      if (clockRun) {
        clearInterval(selectedCountryTimerRef.current);
        pausedTimeRef.current = pausedTime;
        setClockRun(false);
      } else {
        if (selectedCountryTimerRef.current) {
          startSelectedCountryTimer(selectedCountryTime);
        }
      }
    } else {
      if (clockRun) {
        clearInterval(intervalRef.current);
      } else {
        startClock(currentTime);
      }
      setClockRun(!clockRun);
      pausedTimeRef.current = pausedTime;
    }
  };

  //handle back button to navigate back to users directory
  const handleBackButton = () => {
    navigate("/");
  };

  //logic for selected country's timer
  const startSelectedCountryTimer = (startTime) => {
    clearInterval(selectedCountryTimerRef.current);
    const [hours, minutes, seconds] = startTime.split(":");
    const totalSeconds = +hours * 3600 + +minutes * 60 + +seconds;

    pausedTimeRef.current = totalSeconds;

    selectedCountryTimerRef.current = setInterval(() => {
      pausedTimeRef.current += 1;
      setSelectedCountryTime(getFormattedTime(pausedTimeRef.current));
    }, 1000);

    setClockRun(true);
  };

  useEffect(() => {
    if (!selectedCountry) {
      setSelectedCountryTime(getFormattedTime(pausedTimeRef.current));
    }
  }, [selectedCountry]);

  //handle selected country time
  const handleSelectCountry = async (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    try {
      if (country) {
        clearInterval(selectedCountryTimerRef.current);
        //fetch selected country
        const responseData = await axios.get(
          `http://worldtimeapi.org/api/timezone/${country}`
        );
        const selectedTime = responseData.data.datetime
          .split("T")[1]
          .split(".")[0];
        startSelectedCountryTimer(selectedTime);
      } else {
        clearInterval(selectedCountryTimerRef.current);
        setClockRun(false);
        setSelectedCountryTime(getFormattedTime(pausedTimeRef.current));
      }
    } catch (error) {
      console.log(error);
    }
  };

  //logic for start digital clock (to increment after paused)
  const startClock = (startTime) => {
    clearInterval(intervalRef.current);
    const [hours, minutes, seconds] = startTime.split(":");
    const totalSeconds = +hours * 3600 + +minutes * 60 + +seconds;

    pausedTimeRef.current = totalSeconds;

    intervalRef.current = setInterval(() => {
      pausedTimeRef.current += 1;
      setSelectedCountryTime(getFormattedTime(pausedTimeRef.current));
    }, 1000);

    setClockRun(true);
  };

  useEffect(() => {
    if (!selectedCountry) {
      setSelectedCountryTime(getFormattedTime(pausedTimeRef.current));
    }
  }, [selectedCountry]);

  return (
    <div className="user-details">
      <Clock
        handleBackButton={handleBackButton}
        handleSelectCountry={handleSelectCountry}
        selectedCountry={selectedCountry}
        countries={countries}
        selectedCountryTime={selectedCountryTime}
        currentTime={currentTime}
        handleResumePauseClock={handleResumePauseClock}
        clockRun={clockRun}
      />
      <ProfilePage userProfile={userProfile} userPosts={userPosts} />
    </div>
  );
};

export default UserDetails;
