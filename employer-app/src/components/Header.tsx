import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_COMPANY_REQUEST } from "../redux/actions/companyActions";
import { RootState } from "../redux/store";

const Header = () => {
  const dispatch = useDispatch();
  const company = useSelector((state: RootState) => state.company.data);
  const isLoading = useSelector((state: RootState) => state.company.isLoading);
  const error = useSelector((state: RootState) => state.company.error);

  useEffect(() => {
    dispatch(FETCH_COMPANY_REQUEST());
  }, []);

  if (isLoading) {
    return <div>...loading</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  const companyInfo = company?.companyInfo;

  if (!companyInfo) {
    return <p>No Company Info</p>;
  }

  const { companyName, companyMotto, companyEst } = companyInfo;

  return (
    <header className="header">
      <div className="logo">
        <a href="/">
          <img src="/logo.png" alt="WestPac" title="WestPac" />
        </a>
      </div>
      <div className="header-title">
        <h1>{companyName}</h1>
      </div>
      <div className="header-inner">
        <span>{companyMotto}</span>
        <span>Since ({new Date(companyEst).toLocaleDateString()})</span>
      </div>
    </header>
  );
};

export default Header;
