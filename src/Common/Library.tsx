import * as React from "react";
import { Field } from "formik";
import {
  FormControl,
  TextField,
  InputLabel,
  MenuItem,
  Switch,
  FormControlLabel,
} from "@material-ui/core";
import RSelect from "react-select";
import { ISelectMenuList } from "../vm";

export const CustomTextField: React.FC<{
  name: string;
  label?: string;
  onBlurFunc?: Function;
  disabled?: boolean;
  multiline?: boolean;
  placeholder?: string;
  fullWidth?: boolean;
  size?: "medium" | "small";
  type?: "text" | "number" | "password";
  rows?: number;
}> = ({
  name,
  label,
  onBlurFunc,
  disabled,
  placeholder,
  multiline,
  fullWidth,
  size,
  type,
  rows,
}) => {
    if (fullWidth == null) fullWidth = true;

    return (
      <Field name={name}>
        {({
          field, // { name, value, onChange, onBlur }
          form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
          meta,
        }: any) => (
          <FormControl margin="normal" required fullWidth={fullWidth}>
            <TextField
              label={label || ""}
              name={field.name}
              type={type || "text"}
              error={meta.error && meta.touched && meta.error ? true : false}
              helperText={meta.error && meta.touched && meta.error}
              {...field}
              onBlur={(event) => {
                field.onBlur(event);
                onBlurFunc && onBlurFunc(field.value, field.name);
              }}
              fullWidth={fullWidth}
              size={size || "small"}
              autoFocus={false}
              multiline={multiline}
              rows={rows}
              placeholder={placeholder || ""}
              disabled={disabled}
              variant="outlined"
            />
          </FormControl>
        )}
      </Field>
    );
  };

export const CustomSelect: React.FC<{
  name: string;
  label?: string;
  onBlurFunc?: Function;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: "medium" | "small";
  menuList: Array<ISelectMenuList>;
}> = ({ name, label, onBlurFunc, disabled, fullWidth, menuList, size }) => {
  if (fullWidth == null) fullWidth = true;

  return (
    <Field name={name}>
      {({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }: any) => (
        <FormControl margin="normal" fullWidth={fullWidth}>
          <TextField
            label={label || ""}
            name={field.name}
            error={meta.error && meta.touched && meta.error ? true : false}
            helperText={meta.error && meta.touched && meta.error}
            {...field}
            onBlur={(event) => {
              field.onBlur(event);
              onBlurFunc && onBlurFunc(field.value, field.name);
            }}
            select
            fullWidth={fullWidth}
            size={size || "small"}
            autoFocus={false}
            // placeholder={placeholder || ''}
            disabled={disabled}
            variant="outlined"
          >
            {/* <MenuItem value=''>
              <em>None</em>
            </MenuItem> */}
            {menuList.map((d) => (
              <MenuItem value={d.value}>{d.label}</MenuItem>
            ))}
          </TextField>
        </FormControl>
      )}
    </Field>
  );
};
export const CustomSwitch: React.FC<{
  name: string;
  label?: string;
  disabled?: boolean;
  color?: "primary" | "secondary" | "default";
}> = ({ name, label, disabled, color }) => {
  return (
    <Field name={name}>
      {({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }: any) => (
        <FormControl margin="normal">
          <FormControlLabel
            control={
              <Switch
                name={name}
                {...field}
                disabled={disabled}
                checked={field.value}
                color={color || "primary"}
              />
            }
            label={label}
          />
        </FormControl>
      )}
    </Field>
  );
};

export interface ReactSelectProps {
  options: Array<ISelectMenuList>;
  value?: any;
  onChange: any;
  label?: string;
  isMulti?: boolean;
  isClearable?: boolean;
  values?: any;
  placeholder?: string;
}

export const ReactSelect: React.FC<ReactSelectProps> = ({
  options,
  value,
  onChange,
  label,
  isMulti,
  isClearable,
  values,
  placeholder,
}) => {
  return (
    <div className="mt-16 p-relative">
      {label && (
        <InputLabel className="custom-react-select-label">{label}</InputLabel>
      )}
      <RSelect
        className="react-select"
        value={
          value
            ? isMulti === true
              ? options?.filter((d) => value.includes(d.value))
              : options.find((d) => d.value === value)
            : isMulti === true
              ? []
              : undefined
        }
        isClearable={isClearable}
        isMulti={isMulti}
        // label={label}
        placeholder={placeholder || "Select options..."}
        onChange={(newValue: any) => {
          onChange(
            isMulti === true
              ? newValue
                ? newValue?.map((d: any) => d.value)
                : []
              : newValue?.value,
            values && values
          );
        }}
        options={options}
      />
    </div>
  );
};
