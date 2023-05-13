import Nav from "./components/Nav";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TrandingSlider } from "./components/Tranding";
import Search from "./components/Search";
import WatchBefore from "./components/WatchBefore";
import CeleNews from "./components/CeleNews";
function App() {
  const Client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <div className="App">
      <QueryClientProvider client={Client}>
        <div className="mr-5 ml-5 sm:mr-8 sm:ml-8 md:mr-20 md:ml-20">
          <Nav />
          <Search />
          <TrandingSlider />
          <WatchBefore />
          <CeleNews />
        </div>
      </QueryClientProvider>
    </div>
  );
}

export default App;
