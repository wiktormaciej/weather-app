import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { WeatherTable } from "./components/WeatherTable";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={"app"}>
        <WeatherTable />
      </div>
    </QueryClientProvider>
  );
}

export default App;
