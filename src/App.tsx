import Nav from "./components/Nav";
import "./App.css";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TrandingSlider } from "./components/Tranding";
import Search from "./components/Search";
import WatchBefore from "./components/WatchBefore";
import Footer from "./components/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none" }}
      onClick={onClick}
    />
  );
}
function App() {
  const Client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const [openTrandModel, setOpenTrandModel] = useState<boolean>(false);
  const [modeldata, setModelData] = useState<[]>([]);
  const [translateOverview, setTranslateOverview] = useState<string>("");
  const [fullcast, setFullcast] = useState<[]>([]);
  const [trailar, setTrailar] = useState<string>("");
  const [openSearchList, setopenSearchList] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [apitype, setApitype] = useState("movie");
  const [searchType, setSearchType] = useState("movie");
  const settings = {
    autoplay: true,
    fade: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SampleNextArrow />,
  };
  return (
    <div className={`App ${openTrandModel ? "app-fixed" : ""}`}>
      <QueryClientProvider client={Client}>
        <div className="mr-5 ml-5 sm:mr-8 sm:ml-8 md:mr-20 md:ml-20 relative">
          <div className="hidden lg:block  bg-white">
            <Slider {...settings} className="w-full absolute -z-0">
              <div className="image-main1">
                <div className="image-cover"></div>
              </div>
              <div className="image-main2">
                {" "}
                <div className="image-cover"></div>
              </div>
              <div className="image-main3">
                {" "}
                <div className="image-cover"></div>
              </div>
            </Slider>
          </div>
          <Nav />
          <Search
            openTrandModel={openTrandModel}
            setOpenTrandModel={setOpenTrandModel}
            openSearchList={openSearchList}
            setopenSearchList={setopenSearchList}
            searchType={searchType}
            setSearchType={setSearchType}
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
            loading={loading}
            apitype={apitype}
            setApitype={setApitype}
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
            setLoading={setLoading}
            loading={loading}
            apitype={apitype}
            setApitype={setApitype}
          />
        </div>
        {loading ? <></> : <Footer />}
      </QueryClientProvider>
    </div>
  );
}

export default App;
