import { Switch, Route, Redirect } from 'react-router-dom';
import { DetailPage, Home, Page404 } from 'src/components/pages';

const Router: React.VFC = () => {
  return (
    <Switch>
      <Route
        path="/tasks"
        render={({ match: { url } }) => (
          <Switch>
            <Route exact path={url} render={() => <Redirect to="/" />} />
            <Route path={`${url}/:id`} component={DetailPage} />
            <Route path={`${url}/*`}>
              <Page404 />
            </Route>
          </Switch>
        )}
      />
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
