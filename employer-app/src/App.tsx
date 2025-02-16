import Layout from "./layouts/Layout";
import Company from "./components/Company";
import Search from "./components/Search";
import Pagination from "./components/Pagination";

const App = () => {
  return (
    <>
      <Layout>
        <Search />
        <Company />
        <Pagination />
      </Layout>
    </>
  );
};

export default App;
