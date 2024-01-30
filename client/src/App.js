import React from "react";
//import { RouterProvider, createBrowserRouter } from "react-router-dom";

//COMPONENTS
import { Header } from "./component/header/";
import { Footer } from "./component/footer/";
import { Carousel } from "./component/carousel/";

//PAGES
import { Home } from "./pages/home/";

function App() {
  return (
    <div className="App">
      <Header/>
      <Carousel/>
      <Home/>
      <Footer/>
    </div>
  );
}

export default App;
