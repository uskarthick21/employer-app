import Layout from "./layouts/Layout";
import Company from "./components/Company";
import Search from "./components/Search";

const App = () => {
  return (
    <>
      <Layout>
        <Search />
        <Company />
      </Layout>
    </>
  );
};

export default App;
