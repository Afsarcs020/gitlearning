import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AnnouncementsPage from "../pages/AnnouncementsPage";

const RouterPage = (props) => {
  return (
    <Router basename={props.pageInfo.basePath}>
      <Switch>
        <Route path="/">
          <AnnouncementsPage {...props} />
        </Route>
      </Switch>
    </Router>
  );
};

export default RouterPage;
