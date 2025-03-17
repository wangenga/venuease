import countries from "world-countries";

const formattedCountries = countries
    .filter((country) => country.region === "Africa")
    .map((country) => ({
    value: country.cca2,
    label: country.name.common,
    flag: `https://flagcdn.com/24x18/${country.cca2.toLowerCase()}.png`,
    latlng: country.latlng,
    region: country.region,
}));

const useCountries =() => {

    const getAll = () => formattedCountries;
    const getByValue = (value: string) =>{
        return formattedCountries.find((item) => item.value === value);
    }

    return {getAll, getByValue};
};

export default useCountries;