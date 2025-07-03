import React from "react";
import './App.css';
import Navbar from "./Components/Navbar";
import Movielist from "./Components/Movielist/Movielist";
const App = () => {
  return(
   <div className="app">
<Navbar />
<Movielist />

   </div>
  )
};

export default App;
