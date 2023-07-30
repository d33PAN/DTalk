import { onAuthStateChanged } from "firebase/auth";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { auth } from "../firebase";
import { AuthenticationContext } from "./AuthenticationContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const currentUser = useContext(AuthenticationContext);
  const INITIAL_STATE = {
    chatId: null,
    user: {},
  };
  const chatReducer = (state, action) => {
    switch (action.type) {
      case "ChangeUser":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };

      default:
        return state;
    }
  };
  
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
