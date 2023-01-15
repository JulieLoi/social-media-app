
import { Autocomplete, TextField } from '@mui/material';
import { Country, State, City }  from 'country-state-city';
import { useEffect, useState } from 'react';


/**
 * Location Component
 * Select a country, state, city
 */
const Location = ({ setLocation }) => {

    // Country
    const [countrySelect, setCountrySelect] = useState("");
    const countryOptions = (Country.getAllCountries()).map((country) => ({label: country.name, id: country.isoCode}));

    // State
    const [stateSelect, setStateSelect] = useState("");
    const [stateOptions, setStateOptions] = useState([]);

    // City
    const [citySelect, setCitySelect] = useState("");
    const [cityOptions, setCityOptions] = useState([]);
    
    useEffect(() => {
        let location = "";
        if (citySelect !== "") {
            location = `${citySelect}, `;
        }
        if (stateSelect !== "") {
            location += `${stateSelect.label}, `;
        }
        if (countrySelect !== "") {
            location += `${countrySelect.label}`;
        }
        setLocation(location)
        
    }, [countrySelect, stateSelect, citySelect])

    // Location
    return (
        <>

            <Autocomplete disablePortal required
                id="country-location" 
                options={countryOptions}
                onInputChange={(e) => {

                    // Textfield, Selected Option
                    const textInput = e.target.value;
                    const selectedOption = e.target.innerText;  

                    // An Option is Selected
                    if (textInput === 0) {

                        // Set Selected Country
                        const selectedCountry = countryOptions.find((option) => option.label === selectedOption);
                        setCountrySelect(selectedCountry);

                        // Get States of Selected Country
                        const getStates = State.getStatesOfCountry(selectedCountry.id).map((state) => ({
                            label: state.name, id: state.isoCode
                        }));
                        setStateOptions(getStates)

                        // Choosing a different country (Reset State/City)
                        if (selectedOption !== countrySelect.label) {
                            setStateSelect(""); 
                            setCitySelect(""); setCityOptions([]);
                        }

                    }

                    // Clear Country Select (Reset All)
                    else if (textInput === undefined || textInput === "") {
                        setCountrySelect("");
                        setStateOptions([]); setStateSelect("");
                        setCityOptions([]); setCitySelect(""); 
                    }

                }}
                
                isOptionEqualToValue={(option, value) => {
                    return value === undefined || value === "" || option.label === value.label;
                }}
                renderInput={(params) => <TextField {...params} label="Country" />}
                sx={{ gridColumn: "span 2" }}
            />

            
            <Autocomplete disablePortal
                id="state-location"
                options={stateOptions}
                disabled={countrySelect.label === "" || stateOptions.length === 0}
                onInputChange={(e) => {

                    if (e) {
                        // Textfield, Selected Option
                        const textInput = e.target.value;
                        const selectedOption = e.target.innerText;  

                        // An Option is Selected
                        if (textInput === 0) {

                            // Set Selected State
                            const selectedState = stateOptions.find((option) => option.label === selectedOption);
                            setStateSelect(selectedState);
                            
                            // Get Cities of Selected State
                            const getCities = City.getCitiesOfState(countrySelect.id, selectedState.id).map((city) => ({
                                label: city.name, id: city.isoCode
                            }));
                            setCityOptions(getCities);

                            // Choosing a different state (Reset City)
                            if (selectedOption !== selectedState.label) {
                                setCitySelect(""); 
                            }
                        }

                        // Clear State Select (Reset All)
                        else if (textInput === undefined || textInput === "") {
                            setStateSelect("");
                            setCityOptions([]); setCitySelect(""); 
                        }
                    }
                }}
                inputValue={stateSelect.label ? stateSelect.label : ""}
                renderInput={(params) => <TextField {...params} label="State" />}
                sx={{ gridColumn: "span 1" }}
            />

            <Autocomplete disablePortal
                id="city-location"
                options={cityOptions}
                disabled={stateSelect.label === "" || cityOptions.length === 0}
                onInputChange={(e) => {

                    if (e) {
                        // Textfield, Selected Option
                        const textInput = e.target?.value;
                        const selectedOption = e.target?.innerText; 

                        // An Option is Selected
                        if (textInput === 0) { setCitySelect(selectedOption); }

                        // Clear City Select 
                        else if (textInput === undefined || textInput === "") {
                            setCitySelect(""); 
                        }
                    }
                }}
                inputValue={citySelect}
                renderInput={(params) => <TextField {...params} label="City" />}
                sx={{ gridColumn: "span 1" }}
            />

        </>
    )
}

export default Location;