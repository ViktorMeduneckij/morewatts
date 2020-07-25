import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { Button } from "@material-ui/core";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import {
  TextField,
} from "@material-ui/core";

import athleteIcon from "../../../images/cyclist.svg";
import LoadingSpinner from "../../LoadingSpinner";

const Participants = ({ eventId, isMw }) => {
  const [participants, setParticipants] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserSubscribed, setIsUserSubscribed] = useState(false);
  const [shouldDisplayMw, setShouldDisplayMw] = useState(null);
  const [maxPpl, setMaxPpl] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [userDefinedName, setUserName] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const [formError, setError] = useState(false);
  const subscribeUrl = `/api/v.1.0/event/subscribe/${eventId}/`;
  const unsubscribeUrl = `/api/v.1.0/event/unsubscribe/${eventId}/`;

  let userName;
  if (Cookies.get("username")) {
    userName = Cookies.get("username").toLocaleLowerCase()
  };

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
      setShouldDisplayMw(Cookies.get("morewatts"));
    } else {
      setShouldDisplayMw(true);
    }

    checkIfMaxPpl();
  }, [participants, isMw, shouldDisplayMw, fetchParticipants]);

  const openSubscribeModal = () => {
    setDisplayModal(true);
  }

  const handleParticipantsClick = () => {
    if (!isUserSubscribed) {
      openSubscribeModal();
    } else {
      triggerSubscribe(unsubscribeUrl);
    }
  };

  const triggerSubscribe = url => {
    let userExists;
    if (userDefinedName) {
      userExists = participants.find(item => (item.name).toLocaleLowerCase() === userDefinedName.toLocaleLowerCase())
    } else if (userName) {
      userExists = participants.find(item => (item.name).toLocaleLowerCase() === userName.toLocaleLowerCase())
    }

    if (userExists && url === subscribeUrl) {
      setError('Toks dalyvis jau registruotas.');
    } else {
      Cookies.set('username', userDefinedName || userName);

      const preparedUsername = (userDefinedName || userName).toLocaleLowerCase()

      if (isLoading === false) {
        setIsLoading(true);
        fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: preparedUsername,
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

        setDisplayModal(false)
      }
    }
  };

  return (
    <>
      {participants && (
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
                  <div className="whitespace-no-wrap capitalize">{sub.name}</div>
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
      )}
      <Modal open={displayModal} onClose={() => setDisplayModal(false)} center>
        <div className="p-4">
          <p>Norėdami prisijungti, turite nurodyti savo vardą ir pavardę(arba pirmą pavardės raidę).</p>
          <div className="my-5 w-full event-form-item capitalize">
            <TextField
              id="name"
              variant="outlined"
              label="Vardas"
              onChange={e => setUserName(e.target.value)}
              value={userDefinedName || userName || ""}
            />
          </div>
          {formError && (
            <p className="mb-5 text-m text-red-700 font-bold">
              {formError}
            </p>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={() => triggerSubscribe(subscribeUrl)}
          >
            Pirmyn
          </Button>
          <p className="text-xs mt-3">Spausdami pirmyn sutinkate, kad Jūsų vardas bus išsaugotas slapukuose (angl. cookies) ateities dalyvavimui.</p>
        </div>
      </Modal>
    </>
  );
};

Location.Participants = {
  eventId: PropTypes.string,
  isMw: PropTypes.bool,
};

export default Participants;
