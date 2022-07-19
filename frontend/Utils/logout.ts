import Cookies from "js-cookie";

export default function logout(setUser: any, navigate: any) {
  Cookies.remove("token");
  setUser(undefined);
  navigate("/");
}
