import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import countries from './countries';

// Define the country type based on your countries data structure
interface Country {
  label: string;
  code: string;
  phone: string;
  currency: string;
}

interface AutoCompleteCountriesProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  variant?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
}

const AutoCompleteCountries: React.FC<AutoCompleteCountriesProps> = ({ 
  value, 
  onChange, 
  label = "Choose a country",
  placeholder,
  error,
  helperText,
  disabled = false,
  required = false 
}) => {
  // Find the country object based on the string value (could be label, code, phone, or currency)
  const getCountryFromString = (countryString?: string): Country | null => {
    if (!countryString) return null;
    
    return countries.find((country: Country) => 
      country.label === countryString || 
      country.code === countryString ||
      country.phone === countryString ||
      country.currency === countryString
    ) || null;
  };

  // Convert country object back to string (you can customize this based on your needs)
  const getStringFromCountry = (country: Country | null): string => {
    if (!country) return '';
    return country.label; // or country.code, or whatever format you prefer
  };

  const selectedCountry = getCountryFromString(value);

  const handleChange = (event: React.SyntheticEvent, newValue: Country | null): void => {
    const stringValue = getStringFromCountry(newValue);
    onChange?.(stringValue);
  };

  return (
    <Autocomplete<Country>
      size='small'
      fullWidth
      id="country-select-demo"
      options={countries}
      value={selectedCountry}
      onChange={handleChange}
      autoHighlight
      disabled={disabled}
      getOptionLabel={(option: Country) => option.label}
      renderOption={(props, option: Country) => {
        const { key, ...optionProps } = props;
        return (
          <Box
            key={key}
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...optionProps}
          >
            <img
              loading="lazy"
              width="20"
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              alt=""
            />
            {option.label} ({option.code}) +{option.phone} {option.currency}
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          fullWidth
          error={error}
          helperText={helperText}
          required={required}
          slotProps={{
            htmlInput: {
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            },
          }}
        />
      )}
    />
  );
};

export default AutoCompleteCountries;