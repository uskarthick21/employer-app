import Header from "../components/Header";
import Footer from "../components/Footer";
interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return (
    <div className="container">
      <Header />
      <main className="main-container">{children}</main>
      <Footer />
    </div>
  );
};
export default Layout;
