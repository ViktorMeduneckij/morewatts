import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { Button } from "@material-ui/core";

import athleteIcon from "../../../images/cyclist.svg";
import LoadingSpinner from "../../LoadingSpinner";

const Participants = ({ eventId, isMw }) => {
  const [participants, setParticipants] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserSubscribed, setIsUserSubscribed] = useState(false);
  const [shouldDisplayMw, setShouldDisplayMw] = useState(null);
  const [maxPpl, setMaxPpl] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const subscribeUrl = `/api/v.1.0/event/subscribe/${eventId}/`;
  const unsubscribeUrl = `/api/v.1.0/event/unsubscribe/${eventId}/`;

  const userName = Cookies.get("name");

  const fetchParticipants = useCallback(() => {
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
        if (data.maxPeople) {
          setMaxPpl(data.maxPeople);
        }
      });
  }, [eventId]);

  const checkIfMaxPpl = () => {
    if (maxPpl !== false) {
      if (participants.length >= maxPpl) {
        const doesExist = participants.find(item => item.name === userName);
        if (!doesExist) {
          setDisabled(true);
        }
      }
    }
  };

  useEffect(() => {
    if (!participants) {
      fetchParticipants();
    }

    if (isMw) {
      setShouldDisplayMw(Cookies.get("mw"));
    } else {
      setShouldDisplayMw(true);
    }

    checkIfMaxPpl();
  }, [participants, isMw, shouldDisplayMw, fetchParticipants]);

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
        {maxPpl && (
          <div>
            {participants.length}/{maxPpl} užimta{" "}
          </div>
        )}
        {participants.length > 0 && (
          <>
            {!maxPpl && (
              <span
                className="italic pb-1 mb-1"
                style={{
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                {participants.length} žada dalyvauti
              </span>
            )}
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
          </>
        )}
        {participants.length <= 0 && (
          <p className="text-gray-500">Būk pirmas prisijungęs</p>
        )}
        {!isLoading ? (
          <div className="mt-3">
            <Button
              variant="contained"
              color={isUserSubscribed ? "secondary" : "primary"}
              onClick={() => handleParticipantsClick()}
              disabled={shouldDisplayMw === "false" || disabled}
              style={!shouldDisplayMw ? { pointerEvents: "none" } : {}}
            >
              {isUserSubscribed ? "Apsigalvojau" : "Prisijungsiu"}
            </Button>
          </div>
        ) : (
          <LoadingSpinner />
        )}
        {disabled && (
          <div className="text-red-700 pt-3">
            Visos vietos į šią treniruotę rezervuotos.
          </div>
        )}
        {shouldDisplayMw === "false" && (
          <p className="mt-3 text-orange-600">
            Ši treniruotė skirta tik MoreWatts nariams.
          </p>
        )}
      </div>
    )
  );
};

Location.Participants = {
  eventId: PropTypes.string,
  isMw: PropTypes.bool,
};

export default Participants;
