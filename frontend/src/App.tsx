import { useLayoutEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import Loading from "./components/Loading";
import useStore from "./../store/store";
import NotFound from "./pages/NotFound";

interface Props {
  children: any;
}

const Wrapper = ({ children }: Props) => {
  const { setIsLoading } = useStore();
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
    setIsLoading(true);
  }, [location.pathname]);
  return children;
};

function App() {
  const { isLoading } = useStore();
  return (
    <>
      <BrowserRouter>
        <Wrapper>
          <>
            {isLoading && <Loading />}
            <Header />
            <div className="min-h-[calc(100vh-8rem)] md:mt-16">
              <Routes>
                <Route path="/">
                  <Route index element={<Home />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </div>
            <Footer />
          </>
        </Wrapper>
        <ToastContainer pauseOnFocusLoss={false} />
      </BrowserRouter>
    </>
  );
}

export default App;
