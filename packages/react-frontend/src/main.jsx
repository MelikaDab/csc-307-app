//import React from "react";
import ReactDOMClient from "react-dom/client";
import "./main.css";
import MyApp from "./MyApp" // no suffix necessary for MyApp imprort. vite will look for any .js .ts or .tsx .jsx and convert it into js to 
// satisfy the import


// Create the container
const container = document.getElementById("root");

// Create a root
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the Root
root.render(<MyApp />);