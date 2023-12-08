import Modal from "react-modal";
import { Routes, Route } from "react-router-dom";


import { AuthProvider } from "./contexts/AuthContext";

Modal.setAppElement("#root");

import HeaderComponent from "./components/Header/Header";
import FooterComponent from "./components/Footer/Footer";
import Home from "./components/Home/Home";


import Login from "./components/AUTH/Login/Login";
import Register from "./components/AUTH/Register/Register";
import Profile from "./components/AUTH/Profile/Profile";
import CreateNews from "./components/NEWS/CREATE-NEWS/CreateNews";
import EditNews from "./components/NEWS/Edit_News/EditNews";
import NewsDetails from "./components/NEWS/News_Details/NewsDetails";
import SearchNews from "./components/NEWS/Search_News/SearchNews";


import AllNews from "./components/MainCategory/AllNews/AllNews";

import Bulgaria from "./components/MainCategory/Bulgaria/Bulgaria";
import World from "./components/MainCategory/World/World";
import Politics from "./components/MainCategory/Politics/Politics";
import Economics from "./components/MainCategory/Economics/Economics";
import Sports from "./components/MainCategory/Sports/Sports";
import Lifestyle from "./components/MainCategory/Lifestyle/Lifestyle";
import Analitics from "./components/MainCategory/Analitic/Analitics";


import NotFound from "./components/NotFound/NotFound";


import AuthGuard from "./components/GUARDS/AuthGuard";
import GuestGuard from "./components/GUARDS/GuestGuard";
import ErrorBounding from "./components/GUARDS/ErrorBounding"




function App() {
  return (
  < ErrorBounding >
  < AuthProvider >
   
      <HeaderComponent />
      <main id="site">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<AllNews />} />

        <Route path="/bg" element={<Bulgaria />} />
        <Route path="/world" element={<World />} />
        <Route path="/politics" element={<Politics />} />
        <Route path="/economic" element={<Economics />} />
        <Route path="/sport" element={<Sports />} />
        <Route path="/lifestyle" element={<Lifestyle />} />
        <Route path="/analitics" element={<Analitics />} />
        <Route path='/details/:newsID' element={<NewsDetails />} />
        <Route path="/search" element={<SearchNews />} />
        


       
{/* 
        <Route path="/createNews" element={ <CreateNews />  } />
        <Route path='/edit/:newsID' element={<EditNews />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}




   {/* GUARDSSSSS */}

        <Route element={<AuthGuard />}>

        <Route path="/createNews" element={<CreateNews />}></Route>
        <Route path='/edit/:newsID' element={<EditNews />}></Route>
        <Route path="/profile" element={<Profile />}></Route>

        </Route>

        <Route element={<GuestGuard />}> 

        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>

        </Route>
           
    

        <Route path="*" element={<NotFound />}></Route>


      </Routes> 

      </main>

      <FooterComponent />

      </AuthProvider>
    </ErrorBounding>
      
  );
}

export default App;
