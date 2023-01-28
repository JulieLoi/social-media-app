
import { useEffect, useState } from 'react';
import { Country, State, City }  from 'country-state-city';

import { Select, InputLabel, MenuItem, Box } from '@mui/material';

/**
 * Location Component
 * Select a country, state, city
 */
const Location = ({ setLocation, givenLocation="" }) => {

    // Country Options
    const countryOptions = (Country.getAllCountries()).map((country) => ({label: country.name, id: country.isoCode}));

    // Initial State of Country, State, City
    const initialState = {
        country: "", 
        state: "", stateOptions: [],
        city: "", cityOptions: [],
    }

    // Existing Given Location
    if (givenLocation !== "") {
        const myArray = givenLocation.split(", ").reverse();
        
        // Initial Country
        if (myArray.length >= 1) { 
            const countryIndex = countryOptions.findIndex((country) => country.label === myArray[0]);
            initialState.country = countryIndex;

            // Initial State
            if (myArray.length >= 2) {

                // Country Object ---
                const country = countryOptions[countryIndex];

                // Get State Options of Selected Country
                const stateOptions = State.getStatesOfCountry(country.id).map((state) => ({
                    countryCode: state.countryCode, id: state.isoCode, label: state.name, 
                }));
                initialState.stateOptions = stateOptions;

                const stateIndex = stateOptions.findIndex((state) => state.label === myArray[1]);
                initialState.state = stateIndex;

                // State Object ---
                const state = stateOptions[stateIndex];

                // Get City Options of Selected State
                const cityOptions = (City.getCitiesOfState(state.countryCode, state.id)).map((city) => ({
                    countryCode: city.countryCode, stateCode: city.stateCode, label: city.name
                }));
                initialState.cityOptions = cityOptions;
                
                // Initial City
                if (myArray.length === 3) { 
                    const cityIndex = cityOptions.findIndex((city) => city.label === myArray[2]);
                    initialState.city = cityIndex; 
                }
            }
        }
    }

    // Country Index
    const [countrySelect, setCountrySelect] = useState(initialState.country);
    

    // State Index / State Options
    const [stateSelect, setStateSelect] = useState(initialState.state);
    const [stateOptions, setStateOptions] = useState(initialState.stateOptions);

    // City Index / City Options
    const [citySelect, setCitySelect] = useState(initialState.city);
    const [cityOptions, setCityOptions] = useState(initialState.cityOptions);
    
    useEffect(() => {
        let location = "";
        if (citySelect !== "") {
            location = `${cityOptions[citySelect].label}, `;
        }
        if (stateSelect !== "") {
            location += `${stateOptions[stateSelect].label}, `;
        }
        if (countrySelect !== "") {
            location += `${countryOptions[countrySelect].label}`;
        }
        setLocation(location)
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countrySelect, stateSelect, citySelect])

    // Location
    return (
        <>

            {/* COUTNRY SELECT */}
            <Box fullwidth="true" sx={{ gridColumn: "span 2" }}>
            <InputLabel id="country-label">Country</InputLabel>
            <Select fullWidth disabled={countryOptions.length === 0}
                labelId="country-label" id="country-select"
                label="Country" value={countrySelect}
                onChange={(e) => {

                    // Select a Country
                    const value = e.target.value;
                    if (value !== countrySelect) {
                        setCountrySelect(value);
                        setStateSelect("");         // Reset State Select
                        setCitySelect("");          // Reset City Select
                        setCityOptions([]);         // Reset City Options

                        // Reset State Options
                        if (value !== "") {
                            const countryCode = countryOptions[value].id;
                            const states = (State.getStatesOfCountry(countryCode)).map((state) => ({
                                countryCode: state.countryCode, id: state.isoCode, label: state.name, 
                            }))
                            setStateOptions(states);
                        }
                        else { setStateOptions([]); }
                    }
                }}
            >
                <MenuItem value=""><i>None</i></MenuItem>
                {countryOptions.map((country, index) => (
                    <MenuItem key={country.id} value={index}>{country.label}</MenuItem>
                ))}
            </Select>
            </Box>

            {/* STATE SELECT */}
            <Box fullwidth="true">
            <InputLabel id="state-label">State</InputLabel>
            <Select fullWidth disabled={stateOptions.length === 0}
                labelId="state-label" id="state-select"
                label="State" value={stateSelect}
                onChange={(e) => {
                    
                    // Select a State
                    const value = e.target.value;
                    if (value !== stateSelect) {
                        setStateSelect(e.target.value);
                        setCitySelect("");                  // Reset City

                        // Reset City Options
                        if (value !== "") {
                            const state = stateOptions[value];
                            const cities = (City.getCitiesOfState(state.countryCode, state.id)).map((city) => ({
                                countryCode: city.countryCode, stateCode: city.stateCode, id: city.isoCode, label: city.name
                            }));
                            setCityOptions(cities)
                        }
                        else { setCityOptions([]); }
                    }
                }}
            >
                <MenuItem value=""><i>None</i></MenuItem>
                {stateOptions.map((state, index) => (
                    <MenuItem key={`${state.countryCode}-${state.id}`} value={index}>{state.label}</MenuItem>
                ))}
            </Select>
            </Box>
            
            {/* City SELECT */}
            <Box fullwidth="true">
            <InputLabel id="city-label">City</InputLabel>
            <Select fullWidth disabled={cityOptions.length === 0}
                labelId="city-label" id="city-select"
                label="City" value={citySelect}
                onChange={(e) => setCitySelect(e.target.value) }
            >
                <MenuItem value=""><i>None</i></MenuItem>
                {cityOptions.map((city, index) => (
                    <MenuItem key={`${city.countryCode}-${city.stateCode}-${city.label}`} value={index}>{city.label}</MenuItem>
                ))}
            </Select>
            </Box>

        </>
    )
}

export default Location;