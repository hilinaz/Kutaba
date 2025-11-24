import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import AuthLayout from "../layout/AuthLayout"
import SignUpCard from "../features/auth/components/SignUpCard"
import Landing from "../pages/Landing";
import SignInCard from "../features/auth/components/SignInCard";
import MainLayout from "../layout/MainLayout";

import TransactionPage from "../features/transactions/page/TransactionPage";
import CategoriesPage from "../features/categories/pages/CategoriesPage";
import AccountPage from "../features/account/page/AccountPage";
import HomePage from "../features/Home/page/HomePage";
import ProfilePage from "../features/profile/pages/ProfilePage";
import BudgetPage from "../features/Budget/page/BudgetPage";


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* landing */}
        <Route path="/" element={<Landing />} />

        {/* Auth */}
        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<SignUpCard />}></Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/signin" element={<SignInCard />}></Route>
        </Route>

        {/* home */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/transactions" element={<TransactionPage />}></Route>
          <Route path="/categories" element={<CategoriesPage />}></Route>
          <Route path="/accounts" element={<AccountPage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/budget" element={<BudgetPage />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter
