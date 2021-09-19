import React from 'react'
import axios from 'axios'
import CustomerData  from './Customerdata'
import auth from '../auth'

class Customers extends React.Component{
    state = {customers:[]}

    componentDidMount(){
        axios.get('http://localhost:1234/customers',auth()).then(response=>{
            //console.log(response.data.customer[0].status);
            let copy = {...this.state};
            copy.customers = response.data.customer;
            this.setState(copy);
            
        })

    }
    deactivateUserStatus = ()=>{
        if(this.state.customers[0].status === 'active'){
            //console.log(this.state.customers[0].status);
            let copy = {...this.state};
            copy.customers[0].status ='in active';
            this.setState(copy);
            
        }

        //console.log('clicked')
        // let copy = {...this.state};      
        // // if(copy.customers.status === 'active')
        // //     {console.log(copy.customers.status)}
        // //     this.setState(copy);
        // //this.setState(copy)
        //     console.log(this.customers.status)
        
        
    }

    render(){
        return (
            <div >
                <h1 className='title'> Customers</h1>
                <div>{
                    this.state.customers.map(item=>{
                        return<CustomerData
                        firstName={item.firstName}
                        lastName={item.lastName}
                        status={item.status}
                        deactivateUser={()=>{this.deactivateUserStatus()}} />
                    }
                )}
                   
                </div>

            </div>
        )
    }
}

export default Customers