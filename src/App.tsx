import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Weather } from "./components/Weather";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={"app"}>
        <Weather />
      </div>
    </QueryClientProvider>
  );
}

export default App;
