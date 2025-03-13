import React, { useState } from 'react';
import ComponentOne from './component/componentone';
import ComponentTwo from './component/componenttwo';
import ComponentThree from './component/componentthree';
import './App.css'; // Import the styles

function App() {
  const [currentComponent, setCurrentComponent] = useState("one");

  return (
    <div className="app">
      {/* Sidebar Navigation */}
      <div className="sidebar">
        <h2>📂 Menu</h2>
        <button 
          className={currentComponent === "one" ? "active" : ""}
          onClick={() => setCurrentComponent("one")}
        >
          📋 Add Name
        </button>
        <button 
          className={currentComponent === "two" ? "active" : ""}
          onClick={() => setCurrentComponent("two")}
        >
          🛠 Pembayaran
        </button>
        <button 
          className={currentComponent === "three" ? "active" : ""}
          onClick={() => setCurrentComponent("three")}
        >
          🔢 Keterlambatan
        </button>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {currentComponent === "one" && <ComponentOne />}
        {currentComponent === "two" && <ComponentTwo />}
        {currentComponent === "three" && <ComponentThree />}
      </div>
    </div>
  );
}

export default App;
