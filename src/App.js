import React from 'react';
import classes from './App.css';
import Select from 'react-select'; 
import IntegrationReactSelect from "./Components/Search";
 
function App(props) {

  const {classes} = props;
  
  return (
    <div >  
      <IntegrationReactSelect />
      {/* 

      Even this Will give the same Output as the above one gives.
      <Select options={ techCompanies } isMulti/> 
       */}
    </div>
  );
}

export default (App);
