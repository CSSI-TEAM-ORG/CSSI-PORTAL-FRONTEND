// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import '../Styles/AccountPage.css';
import Profilengo from './profilengo';
import Profilefaculty from './profilefaculty';
import Profilestudent from './profilestudent';
export default function Profileuser({updateprof,pstate}){

  if(pstate.toLowerCase()=="student"){
    return(
      <Profilestudent profupdate={updateprof}/>
    );
  }
  else if(pstate.toLowerCase()=="faculty"){
    return(
      <Profilefaculty profupdate={updateprof}/>
    );
  }
  else{
    return(
      <Profilengo profupdate={updateprof}/>
    )
  }

}