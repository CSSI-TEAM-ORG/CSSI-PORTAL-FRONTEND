import ProfileFaculty from "./profileupdatefaculty";
import ProfileStudent from "./profileupdatestudent";
import Profilengo from "./profileupdatengo";
export default function Profileupdate(props){
    // const pstate="faculty";
    if(props.pstate.toLowerCase()=="student"){
        return(
            <><ProfileStudent updateprof={props.updateprof}/></>
        )
    }
    else if(props.pstate.toLowerCase()=="faculty"){
        return(
            <><ProfileFaculty updateprof={props.updateprof}/></>
        )
    }
    else{
        return(
            <><Profilengo updateprof={props.updateprof}/></>
        )
    }
}