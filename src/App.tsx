import React, { type ComponentType, type ReactElement } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { DefaultLayout } from "./Layouts";
import { privateRoutes, publicRoutes } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route, index) => {
          let Layout: ComponentType<{ children: ReactElement }> = DefaultLayout;
          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout == null) {
            Layout = React.Fragment;
          } else {
            Layout = DefaultLayout;
          }
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}

        {privateRoutes.map((route, index) => {
          let Layout: ComponentType<{ children: ReactElement }> = DefaultLayout;
          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout == null) {
            Layout = React.Fragment;
          } else {
            Layout = DefaultLayout;
          }
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path as string}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
