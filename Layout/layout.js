import React, { createRef, useEffect } from "react";
import { Container } from "semantic-ui-react";
import HeadTags from "./HeadTags";
import nprogress from "nprogress";
import Router from "next/router";
import Chat from "../pages/Chat";
import Navbar from "./Navbar";
import Footer from "./footer";

function Layout({ children, user }) {
  const contextRef = createRef();

  useEffect(() => {
    const handleRouteChangeStart = () => {
      nprogress.start();
    };

    const handleRouteChangeComplete = () => {
      nprogress.done();
    };

    const handleRouteChangeError = () => {
      nprogress.done();
    };

    Router.events.on("routeChangeStart", handleRouteChangeStart);
    Router.events.on("routeChangeComplete", handleRouteChangeComplete);
    Router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      Router.events.off("routeChangeStart", handleRouteChangeStart);
      Router.events.off("routeChangeComplete", handleRouteChangeComplete);
      Router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, []);

  return (
    <>
      <HeadTags />

      {user ? (
        <Chat user={user} />
      ) : (
        <>
          <Navbar />
          <Container style={{ paddingTop: "3.77rem" }} text>
            {children}
          </Container>
        </>
      )}
      <Footer />
    </>
  );
}

export default Layout;
