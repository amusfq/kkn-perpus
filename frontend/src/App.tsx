import { useLayoutEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import Loading from "./components/Loading";
import useStore from "./../store/store";
import NotFound from "./pages/NotFound";
import BookBySlug from "./pages/Search/BookBySlug";
import BookDetail from "./pages/BookDetail";
import Dashboard from "./pages/Admin/Dashboard";
import AdminLayout from "./pages/Admin";
import User from "./pages/Admin/User";
import Book from "./pages/Admin/Book";
import History from "./pages/Admin/History";
import Author from "./pages/Admin/Author";
import Publisher from "./pages/Admin/Publisher";
import Category from "./pages/Admin/Category";
import Search from "./pages/Search";

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
                  <Route path="book/:slug" element={<BookDetail />} />
                  <Route path="category/:slug" element={<BookBySlug />} />
                  <Route path="search" element={<Search />} />
                  <Route path="admin">
                    <Route
                      index
                      element={
                        <AdminLayout title="Dashboard">
                          <Dashboard />
                        </AdminLayout>
                      }
                    />
                    <Route
                      path="history"
                      element={
                        <AdminLayout title="Daftar Riwayat Peminjaman">
                          <History />
                        </AdminLayout>
                      }
                    />
                    <Route
                      path="user"
                      element={
                        <AdminLayout title="Daftar Pengguna">
                          <User />
                        </AdminLayout>
                      }
                    />
                    <Route
                      path="book"
                      element={
                        <AdminLayout title="Daftar Buku">
                          <Book />
                        </AdminLayout>
                      }
                    />
                    <Route
                      path="author"
                      element={
                        <AdminLayout title="Daftar Penulis">
                          <Author />
                        </AdminLayout>
                      }
                    />
                    <Route
                      path="category"
                      element={
                        <AdminLayout title="Daftar Kategori">
                          <Category />
                        </AdminLayout>
                      }
                    />
                    <Route
                      path="publisher"
                      element={
                        <AdminLayout title="Daftar Penerbit">
                          <Publisher />
                        </AdminLayout>
                      }
                    />
                  </Route>
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
