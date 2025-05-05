import React from "react";
import Header from "./components/Header/Header";
import Search from "./components/Searchbar/Search";
import Layout from "./components/Layout/Layout";
import Footer from "./components/Footer/Footer";
import "./App.css";

const App = () => {
	return (
		<>
			<Header />
			<Search />
			<Layout />
			<Footer />
		</>
	);
};
export default App;
