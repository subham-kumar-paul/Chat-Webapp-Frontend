import React, { useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  Chat  from "./components/Chat";
import  Login  from "./components/Login";
import  Navbar  from "./components/Navbar";
import { AuthContextProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Conversations from './components/Conversations';
import { ActiveConversations } from "./components/ActiveConversations";
import { NotificationContextProvider } from "./contexts/NotificationContext"


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthContextProvider>
              <NotificationContextProvider>
                <Navbar />
              </NotificationContextProvider>
            </AuthContextProvider>
          }
        >
          <Route
            path=""
            element={
              <ProtectedRoute>
                <Conversations />
              </ProtectedRoute>
            }
          />
          <Route
            path="conversations/"
            element={
              <ProtectedRoute>
                <ActiveConversations />
              </ProtectedRoute>
            }
          />
          <Route
            path="chats/:conversationName"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}