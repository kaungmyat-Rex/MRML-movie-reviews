import Nav from "./components/Nav";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TrandingSlider } from "./components/Tranding";
import Search from "./components/Search";
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
        <div className="mr-5 ml-5">
          <Nav />
          <Search />
          <TrandingSlider />
        </div>
      </QueryClientProvider>
    </div>
  );
}

export default App;
