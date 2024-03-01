import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import Loading from 'components/shared-components/Loading';

const Dashboards = ({ match }) => {
  return(
  <Suspense fallback={<Loading cover="content"/>}>
    <Switch>
      <Route path={`${match.url}/default`} component={lazy(() => import(`./default`))} />
      <Route path={`${match.url}/analytic`} component={lazy(() => import(`./analytic`))} />
      <Route path={`${match.url}/sales`} component={lazy(() => import(`./sales`))} />
      <Route path={`${match.url}/scans/add-product`} component={lazy(() => import(`./Scans/add-product`))} />
      <Route path={`${match.url}/scans`} component={lazy(() => import(`./Scans/product-list`))} />
      <Route path={`${match.url}/agents/add-agent`} component={lazy(() => import(`./Agents/add-agent`))} />
      <Route path={`${match.url}/agents`} component={lazy(() => import(`./Agents/agent-list`))} />
      <Route path={`${match.url}/domains/add-domains`} component={lazy(() => import(`./Domains/add-domains`))} />
      <Route path={`${match.url}/domains`} component={lazy(() => import(`./Domains/domains-list`))} />
      <Route path={`${match.url}/keywords/add-keyword`} component={lazy(() => import(`./Keywords/add-keywords`))} />
      <Route path={`${match.url}/keywords`} component={lazy(() => import(`./Keywords/keywords-list`))} />
      <Route path={`${match.url}/users/add-user`} component={lazy(() => import(`./Users/add-users`))} />
      <Route path={`${match.url}/users`} component={lazy(() => import(`./Users/users-list`))} />
      <Redirect from={`${match.url}`} to={`${match.url}/default`} />
    </Switch>
  </Suspense>
)};

export default Dashboards;