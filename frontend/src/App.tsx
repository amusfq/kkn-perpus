import { useLayoutEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Cookies from 'js-cookie';
import { isExpired } from "react-jwt";
import useStore from "./../store/store";

const Profile = lazy(() => import("./pages/Admin/Profile"));
const Home = lazy(()=> import("./pages/Home"));
const Header = lazy(()=> import("./components/Header"));
const Footer = lazy(()=> import("./components/Footer"));
const Loading = lazy(()=> import("./components/Loading"));
const NotFound = lazy(()=> import("./pages/NotFound"));
const BookBySlug = lazy(()=> import("./pages/Search/BookBySlug"));
const BookDetail = lazy(()=> import("./pages/BookDetail"));
const Dashboard = lazy(()=> import("./pages/Admin/Dashboard"));
const AdminLayout = lazy(()=> import("./pages/Admin"));
const User = lazy(()=> import("./pages/Admin/User"));
const Book = lazy(()=> import("./pages/Admin/Book"));
const History = lazy(()=> import("./pages/Admin/History"));
const Author = lazy(()=> import("./pages/Admin/Author"));
const Publisher = lazy(()=> import("./pages/Admin/Publisher"));
const Category = lazy(()=> import("./pages/Admin/Category"));
const Search = lazy(()=> import("./pages/Search"));
const CreateUpdateBook = lazy(()=> import("./pages/Admin/Book/CreateUpdateBook"));
const CreateUpdateCategory = lazy(()=> import("./pages/Admin/Category/CreateUpdateCategory"));
const CreateUpdateAuthor = lazy(()=> import("./pages/Admin/Author/CreateUpdateAuthor"));
const CreateUpdatePublisher = lazy(()=> import("./pages/Admin/Publisher/CreateUpdatePublisher"));
const CreateUpdateUser = lazy(()=> import("./pages/Admin/User/CreateUpdateUser"));
const Shelf = lazy(()=> import("./pages/Admin/Shelf"));
const CreateUpdateShelf = lazy(()=> import("./pages/Admin/Shelf/CreateUpdateShelf"));
const Language = lazy(() => import("./pages/Admin/Language"));
const CreateUpdateLanguage = lazy(() => import("./pages/Admin/Language/CreateUpdateLanguage"));

interface Props {
  children: any;
}

const Wrapper = ({ children }: Props) => {
  const { setIsLoading, setUser } = useStore();
  const location = useLocation();
  const token = Cookies.get('token');
  useLayoutEffect(() => {
    if (token && isExpired(token)) {
      Cookies.remove('token');
      setUser(undefined);
    }
    document.documentElement.scrollTo(0, 0);
    setIsLoading(true);
  }, [location.pathname]);
  return children;
};

function App() {
  const { isLoading } = useStore();
  return (
    <>
      <Suspense fallback={<Loading />}>
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
                        path='profile'
                        element={
                          <AdminLayout title="Profile">
                            <Profile />
                          </AdminLayout>
                        }
                      />
                    <Route path="history">
                      <Route
                        index
                        element={
                          <AdminLayout title="Daftar Peminjaman">
                            <History />
                          </AdminLayout>
                        }
                      />
                    </Route>
                    <Route path="user">
                      <Route
                        index
                        element={
                          <AdminLayout title="Daftar Pengguna">
                            <User />
                          </AdminLayout>
                        }
                      />
                      <Route
                        path="create"
                        element={
                          <AdminLayout title="Tambah Pengguna">
                            <CreateUpdateUser />
                          </AdminLayout>
                        }
                      />
                      <Route
                        path=":id"
                        element={
                          <AdminLayout title="Ubah Pengguna">
                            <CreateUpdateUser />
                          </AdminLayout>
                        }
                      />
                    </Route>
                    <Route path="book">
                      <Route
                        index
                        element={
                          <AdminLayout title="Daftar Buku">
                            <Book />
                          </AdminLayout>
                        }
                      />
                      <Route
                        path="create"
                        element={
                          <AdminLayout title="Tambah Buku">
                            <CreateUpdateBook />
                          </AdminLayout>
                        }
                      />
                      <Route
                        path=":slug"
                        element={
                          <AdminLayout title="Ubah Buku">
                            <CreateUpdateBook />
                          </AdminLayout>
                        }
                      />
                    </Route>
                    <Route path="author">
                      <Route
                        index
                        element={
                          <AdminLayout title="Daftar Penulis">
                            <Author />
                          </AdminLayout>
                        }
                      />
                      <Route
                        path="create"
                        element={
                          <AdminLayout title="Tambah Penulis">
                            <CreateUpdateAuthor />
                          </AdminLayout>
                        }
                      />
                      <Route
                        path=":id"
                        element={
                          <AdminLayout title="Ubah Penulis">
                            <CreateUpdateAuthor />
                          </AdminLayout>
                        }
                      />
                    </Route>
                    <Route path="shelf">
                      <Route
                        index
                        element={
                          <AdminLayout title="Daftar Rak Buku">
                            <Shelf />
                          </AdminLayout>
                        }
                      />
                      <Route
                        path="create"
                        element={
                          <AdminLayout title="Tambah Rak Buku">
                            <CreateUpdateShelf />
                          </AdminLayout>
                        }
                      />
                      <Route
                        path=":id"
                        element={
                          <AdminLayout title="Ubah Rak Buku">
                            <CreateUpdateShelf />
                          </AdminLayout>
                        }
                      />
                    </Route>
                    <Route path="category">
                      <Route
                        index
                        element={
                          <AdminLayout title="Daftar Kategori">
                            <Category />
                          </AdminLayout>
                        }
                      />
                      <Route
                        path="create"
                        element={
                          <AdminLayout title="Tambah Kategori">
                            <CreateUpdateCategory />
                          </AdminLayout>
                        }
                      />
                      <Route
                        path=":slug"
                        element={
                          <AdminLayout title="Ubah Kategori">
                            <CreateUpdateCategory />
                          </AdminLayout>
                        }
                      />
                    </Route>
                    <Route path="publisher">
                      <Route
                        index
                        element={
                          <AdminLayout title="Daftar Penerbit">
                            <Publisher />
                          </AdminLayout>
                        }
                      />
                      <Route
                        path="create"
                        element={
                          <AdminLayout title="Tambah Penerbit">
                            <CreateUpdatePublisher />
                          </AdminLayout>
                        }
                      />
                      <Route
                        path=":id"
                        element={
                          <AdminLayout title="Ubah Penerbit">
                            <CreateUpdatePublisher />
                          </AdminLayout>
                        }
                      />
                    </Route>
                    <Route path="language">
                      <Route
                        index
                        element={
                          <AdminLayout title="Daftar Bahasa">
                            <Language />
                          </AdminLayout>
                        }
                      />
                      <Route
                        path="create"
                        element={
                          <AdminLayout title="Tambah Bahasa">
                            <CreateUpdateLanguage />
                          </AdminLayout>
                        }
                      />
                      <Route
                        path=":id"
                        element={
                          <AdminLayout title="Ubah Bahasa">
                            <CreateUpdateLanguage />
                          </AdminLayout>
                        }
                      />
                    </Route>
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
      </Suspense>
    </>
  );
}

export default App;
