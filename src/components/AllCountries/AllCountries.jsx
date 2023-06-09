import React, { useState, useEffect } from "react";
import { apiURL } from "../Utilities/GetApi.jsx";
import SearchInput from "../Search/SearchInput.jsx";
import FilterCountry from "../FilterCountry/FilterCountry.jsx";
import { Link } from "react-router-dom";


const AllCountries = () => {
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const getAllCountries = async () => {
        try {
            const res = await fetch(`${apiURL}/all`);

            if (!res.ok) throw new Error("Something went wrong!");

            const data = await res.json();
            setCountries(data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
        }
    };

    const getCountryByName = async (countryName) => {
        try {
            if (countryName.trim() === "") {
                // Boş arama yapılıyor, uyarı mesajı göster
                alert("Please enter a country name.");
                return;
            }

            const res = await fetch(`${apiURL}/name/${countryName}`);

            if (!res.ok) throw new Error("Not found any country!");

            const data = await res.json();
            setCountries(data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
        }
    };

    const getCountryByRegion = async (regionName) => {
        try {
            const res = await fetch(`${apiURL}/region/${regionName}`);

            if (!res.ok) throw new Error("Failed..........");

            const data = await res.json();
            console.log(data)
            setCountries(data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setError(false);
        }
    };

    useEffect(() => {
        getAllCountries();
    }, []);

    return (
        <div className="allCountryWrapper">
            <div className="countryTop">
                <div className="search">
                    <SearchInput onSearch={getCountryByName} />
                </div>
                <div className="filter">
                    <FilterCountry onSelect={getCountryByRegion} />
                </div>
            </div>

            <div className="countryBottom">
                {isLoading && !error && <h4>Loading........</h4>}
                {error && !isLoading && <h4>{error}</h4>}

                {countries?.map((country) => (
                    <Link to={`/country/${country.name.common}`} key={country.name.common}>
                        <div className="countryCard">
                            <div className="countryImg">
                                <img src={country.flags.png} alt="" />
                            </div>

                            <div className="countryData">

                                <h3>{country.name.common}</h3>
                                <h6>Official Name: {country.name.official}</h6>
                                <h6>Capital: {country.capital}</h6>
                                <h6>Population: {new Intl.NumberFormat().format(country.population)}</h6>
                                <h6>Region: {country.region}</h6>
                                <h6>Area: {country.area}</h6>

                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AllCountries;
