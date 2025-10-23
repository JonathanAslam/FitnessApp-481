import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import './App.css';
import AppContent from './pages/appcontent/AppContent';

function App() {

  return (
    <>
      <Router>
        <AppContent/>
      </Router>
    </>
  )
}

export default App
