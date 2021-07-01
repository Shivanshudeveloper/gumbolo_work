import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.min.css";
import { Navbar } from "./components/index.js";
const InvoiceGenerator = lazy(() =>
  import("./views/invoice-generator/invoice-generator")
);
const InvoiceList = lazy(() => import("./views/invoice-list/invoice-list"));
const Settings = lazy(() => import("./views/settings/settings"));

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Navbar />
          <div className="container-fluid mt-3">
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route exact path="/" component={InvoiceGenerator} />
                <Route path="/invoices" component={InvoiceList} />
                <Route path="/settings" component={Settings} />
                <Route render={() => <h1>404 Error</h1>} />
              </Switch>
            </Suspense>
          </div>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
