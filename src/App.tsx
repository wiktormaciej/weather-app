import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { WeatherTable } from "./components/WeatherTable";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={"app"}>
        <header>Weather</header>
        <WeatherTable />
        <footer></footer>
      </div>
    </QueryClientProvider>
  );
}

export default App;
