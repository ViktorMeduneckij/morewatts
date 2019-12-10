import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import athleteIcon from "../../../images/cyclist.svg";
import LoadingSpinner from "../../LoadingSpinner";

const Participants = ({ eventId }) => {
  const [participants, setParticipants] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserSubscribed, setIsUserSubscribed] = useState(false);
  const userName = "Viktor Meduneckij";

  useEffect(() => {
    if (!participants) {
      fetchParticipants();
    }
  });

  const fetchParticipants = () => {
    fetch("/api/v.1.0/event/" + eventId)
      .then(response => {
        if (!response.ok) {
          return;
        }
        return response.json();
      })
      .then(data => {
        if (!data) {
          return;
        }
        setParticipants(data.subscribers);
        setIsUserSubscribed(
          data.subscribers.find(item => item.name === userName) ? true : false
        );
      });
  };

  const handleParticipantsClick = () => {
    if (!isUserSubscribed) {
      triggerSubscribe();
    }
  };

  const triggerSubscribe = () => {
    if (isLoading === false) {
      setIsLoading(true);
      fetch(`/api/v.1.0/event/subscribe/${eventId}/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userName,
        }),
      })
        .then(response => {
          if (!response.ok) {
            setTimeout(() => {
              setIsLoading(false);
            }, 3000);
            return;
          }
          return response.json();
        })
        .then(data => {
          if (!data) {
            setTimeout(() => {
              setIsLoading(false);
            }, 3000);
            return;
          }
          setParticipants(data.subscribers);
          setTimeout(() => {
            setIsLoading(false);
          }, 3000);
        });
    }
  };

  return (
    participants && (
      <div>
        {participants.map((sub, index) => (
          <span key={index} className="athlete flex items-center my-2">
            <img
              src={athleteIcon}
              alt=""
              style={{ maxWidth: "40px", paddingRight: "5px" }}
            />
            <div className="whitespace-no-wrap">{sub.name}</div>
          </span>
        ))}
        {!isLoading ? (
          <button
            className="success mt-3"
            onClick={() => handleParticipantsClick()}
          >
            Prisijungsiu
          </button>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    )
  );
};

Location.Participants = {
  eventId: PropTypes.string,
};

export default Participants;
