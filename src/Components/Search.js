import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Select from 'react-select';
import { emphasize, makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import Avatar from '@material-ui/core/Avatar';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import { Divider } from '@material-ui/core';

const suggestions = [
      { label: "Apple", value: 1 },
      { label: "Facebook", value: 2 },
      { label: "Netflix", value: 3 },
      { label: "Amazon", value: 4 },
      { label: "Jabong", value: 5 },
      { label: "React", value: 6 },
      { label: "JavaScript", value: 7 },
      { label: "HTML", value: 8 },
      { label: "CSS", value: 9 },
      { label: "MaterialUI", value: 10 },
      { label: "Ollie Odwyer", value: 1 },
      { label: "Davis Holford", value: 2 },
      { label: "Nenita Herrman", value: 3 },
      { label: "Judith Haag", value: 4 },
      { label: "Lecia Monteiro", value: 5 },
      { label: "Dorla Wofford", value: 6 },
      { label: "Corinne Sweatt", value: 7 },
      { label: "Clifford Calles", value: 8 },
      { label: "Soo Gertz", value: 9 },
      { label: "Renay Goodner", value: 10 }
].map(suggestion => ({
  value: suggestion.value,
  label: suggestion.label,
  icon: TagFacesIcon
}));

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: 450,
    minWidth: 290,
    marginTop: theme.spacing(4),
    marginRight: theme.spacing(5),
    marginLeft: theme.spacing(5),
  },
  input: {
    display: 'flex',
    padding: 0,
    height: 'auto',
    backgroundColor: 'ghostwhite',
    borderRadius: theme.spacing(2),
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
    backgroundColor: "#9e9e9e",
    fontSize: 16,
    color:'black'
  },
  chipFocused: {
     backgroundColor: "#9e9e9e"
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2),
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    bottom: 6,
    fontSize: 16,
    marginLeft: theme.spacing(2)
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(2),
    left: 0,
    right: 0,
  },
  divider: {
    marginTop: theme.spacing(40),
  },
  line:{
      height: theme.spacing(2),
  }
}));

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

inputComponent.propTypes = {
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any.isRequired,
    }),
  ]),
};

function Control(props) {
  const {
    children,
    innerProps,
    innerRef,
    selectProps: { classes, TextFieldProps },
  } = props;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: classes.input,
          ref: innerRef,
          children,
          ...innerProps,
        },
      }}
      {...TextFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  const { selectProps, innerProps = {}, children } = props;
  return (
    <Typography color="textSecondary" className={selectProps.classes.placeholder} {...innerProps}>
      {children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      avatar={<Avatar><TagFacesIcon /></Avatar>}
      label={props.children}
      className={clsx(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  ValueContainer,
};

export default function IntegrationReactSelect() {
  const classes = useStyles();
  const theme = useTheme();
  const [multi, setMulti] = React.useState(null);

  function handleChangeMulti(value) {
    setMulti(value);
  }

  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit',
      },
    }),
  };

  return (
    <Paper className={classes.root}>
      
        <div className={classes.line} />
        <Select
          classes={classes}
          styles={selectStyles}
          inputId="react-select-multiple"
          placeholder="Search or type any"
          options={suggestions}
          components={components}
          value={multi}
          onChange={handleChangeMulti}
          isMulti
        />
    <Divider className = {classes.divider}/>
    </Paper>
  );
}