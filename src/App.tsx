import Nav from "./components/Nav";
import "./App.css";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TrandingSlider } from "./components/Tranding";
import Search from "./components/Search";
import WatchBefore from "./components/WatchBefore";
import Footer from "./components/Footer";
// import CeleNews from "./components/CeleNews";
function App() {
  const Client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const [openTrandModel, setOpenTrandModel] = useState<boolean>(false);
  const [modeldata, setModelData] = useState([]) as any[];
  const [translateOverview, setTranslateOverview] = useState("");
  const [fullcast, setFullcast] = useState([]);
  const [trailar, setTrailar] = useState("");
  const [openSearchList, setopenSearchList] = useState(false);
  return (
    <div className={`App ${openTrandModel ? "app-fixed" : ""}`}>
      <QueryClientProvider client={Client}>
        <div className="mr-5 ml-5 sm:mr-8 sm:ml-8 md:mr-20 md:ml-20">
          <Nav />
          <Search
            openTrandModel={openTrandModel}
            setOpenTrandModel={setOpenTrandModel}
            openSearchList={openSearchList}
            setopenSearchList={setopenSearchList}
          />
          <TrandingSlider
            openTrandModel={openTrandModel}
            setOpenTrandModel={setOpenTrandModel}
            modeldata={modeldata}
            setModelData={setModelData}
            translateOverview={translateOverview}
            setTranslateOverview={setTranslateOverview}
            fullcast={fullcast}
            setFullcast={setFullcast}
            trailar={trailar}
            setTrailar={setTrailar}
            setopenSearchList={setopenSearchList}
          />
          <WatchBefore
            openTrandModel={openTrandModel}
            setOpenTrandModel={setOpenTrandModel}
            modeldata={modeldata}
            setModelData={setModelData}
            translateOverview={translateOverview}
            setTranslateOverview={setTranslateOverview}
            fullcast={fullcast}
            setFullcast={setFullcast}
            trailar={trailar}
            setTrailar={setTrailar}
            setopenSearchList={setopenSearchList}
          />
          {/* <CeleNews /> */}
        </div>
        <Footer />
      </QueryClientProvider>
    </div>
  );
}

export default App;
