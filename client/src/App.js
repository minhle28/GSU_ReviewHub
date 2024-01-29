import React from "react";
//import { RouterProvider, createBrowserRouter } from "react-router-dom";

//COMPONENTS
import { Header } from "./component/header/";
import { Footer } from "./component/footer/";
import { Carousel } from "./component/carousel/";

function App() {
  return (
    <div className="App">
      <Header/>
      <Carousel/>

      <Footer/>
    </div>
  );
}

export default App;
