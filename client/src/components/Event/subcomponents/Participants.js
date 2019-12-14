import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import athleteIcon from "../../../images/cyclist.svg";
import LoadingSpinner from "../../LoadingSpinner";

const Participants = ({ eventId }) => {
  const [participants, setParticipants] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserSubscribed, setIsUserSubscribed] = useState(false);
  const subscribeUrl = `/api/v.1.0/event/subscribe/${eventId}/`;
  const unsubscribeUrl = `/api/v.1.0/event/unsubscribe/${eventId}/`;

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
      triggerSubscribe(subscribeUrl);
    } else {
      triggerSubscribe(unsubscribeUrl);
    }
  };

  const triggerSubscribe = url => {
    if (isLoading === false) {
      setIsLoading(true);
      fetch(url, {
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
            }, 1000);
            return;
          }
          return response.json();
        })
        .then(data => {
          if (!data) {
            setTimeout(() => {
              setIsLoading(false);
            }, 1000);
            return;
          }
          setTimeout(() => {
            setIsLoading(false);
            setParticipants(data.subscribers);
            if (url === subscribeUrl) {
              setIsUserSubscribed(true);
            } else {
              setIsUserSubscribed(false);
            }
          }, 1000);
        });
    }
  };

  return (
    participants && (
      <div className="mt-4 lg:mt-0">
        {participants.length > 0 &&
          participants.map((sub, index) => (
            <span key={index} className="athlete flex items-center my-2">
              <img
                src={athleteIcon}
                alt=""
                style={{ maxWidth: "40px", paddingRight: "5px" }}
              />
              <div className="whitespace-no-wrap">{sub.name}</div>
            </span>
          ))}
        {participants.length <= 0 && (
          <p className="text-gray-500">Būk pirmas prisijungęs</p>
        )}
        {!isLoading ? (
          <button
            className={cx("mt-3 mw2", isUserSubscribed ? "warning" : "success")}
            onClick={() => handleParticipantsClick()}
          >
            {isUserSubscribed ? "Apsigalvojau" : "Prisijungsiu"}
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
