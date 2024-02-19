import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
export default function MyAutocomplete(props) {
    return (
        <Autocomplete
            multiple={props.multiple}
            sx={props.sx}
            freeSolo={props.freeSolo || false}
            size={props.size}
            style={props.style}
            onChange={(e, value) => { props.onChange(value) }}
            options={props.options}
            value={props.value || null}
            disableClearable={props.disableClearable}
            autoHighlight
            disabled={props.disabled}
            getOptionLabel={(option) => option}
            renderOption={(props, option) => (
                <li {...props}>{option}</li>
            )}
            renderInput={(params) => (
                <TextField
                    required={props.required}
                    {...params}
                    label={props.label}
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'off', // disable autocomplete and autofill
                    }}
                />
            )}
        />
    )
}