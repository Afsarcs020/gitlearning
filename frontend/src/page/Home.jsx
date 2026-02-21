import { Box } from "@ellucian/react-design-system/core";
import Navbar from "../components/Navbar";
import { Route, Switch } from "react-router-dom";
import CreatePage from "../pages/CreatePage";
import HomePage from "../pages/HomePage";
function Home() {
  return (
    <Box minHeight="100vh">
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/create" component={CreatePage} />
      </Switch>
    </Box>
  );
}

export default Home;
