import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { WeatherCards } from "./components/WeatherCards";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={"app"}>
        <WeatherCards />
      </div>
    </QueryClientProvider>
  );
}

export default App;
