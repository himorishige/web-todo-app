import { Switch, Route } from 'react-router-dom';
import { Home, Page404 } from 'src/components/pages';

const Router: React.VFC = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="*">
        <Page404 />
      </Route>
    </Switch>
  );
};

export default Router;
