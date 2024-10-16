import Profileuser from "./profileuser";
import Profileupdate from "./profileupdate";
import {useState} from "react";
export default function AccountPage({role}) {
  const [update,setUpdate]=useState(false);
  function handleupdateprof(){
    // console.log(update);
    setUpdate(!update);
  }
  return (
  <>
  {!update ? <Profileuser pstate={role} updateprof={handleupdateprof} /> : <Profileupdate pstate={role} updateprof={handleupdateprof}/>}
  </>
  );
}