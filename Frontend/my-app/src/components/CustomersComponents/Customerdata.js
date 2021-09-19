import React from 'react'
function CustomerData (props){
    return(
        <div >
          <p>Name:{props.firstName} {props.lastName}</p> 
          <p> Status:{props.status}</p>
          <input type='button' value='Activate '/>
           <input type='button' value='Deactivate' onClick={props.deactivateUser}/>
           <input type='button' value='Reset password'/>
           <input type='button' value='All Transactions'/>
           <input type='button' value='All Log'/>
        </div>
    )
}

export default CustomerData