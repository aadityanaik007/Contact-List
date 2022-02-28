import React from "react";

class AddContact extends React.Component{
    state = {
        'name':'',
        'email':''
    }

    add =(e)=>{
        e.preventDefault();
        if(this.state.name === '' || this.state.email === ''){
            alert("All fields are mandatory!!");
            return;
        }
        this.props.addContactHandler(this.state);
        this.setState({'name':'','email':''})
        this.props.history.push('/')
    }

    render(){
        return(
            <div className='ui main'>
                <h2>Add Contact</h2>
                <form className='ui form' onSubmit={this.add} id="AddContactForm">
                    <div className='field'>
                        <label>Name</label>
                        <input type="text" name="name" placeholder='Name' onChange={(e)=>{
                            this.setState({'name':e.target.value});
                        }}/>
                    </div>
                    <div className='field'>
                        <label>Email</label>
                        <input type="text" name="email" placeholder='Email' onChange={(e)=>{
                            this.setState({'email':e.target.value});
                        }}/>
                    </div>
                    <button className='ui button blue'>Add</button>
                </form>
            </div>
        )
    }
}



// const AddContact = (props) => {
//   let [name, setName] = useState("");
//   let [email, setEmail] = useState("");

//   const add = (e) => {
//     e.preventDefault();
//     // console.log(name,email);
//     if(name==='' || email===''){
//         alert("Both the fields should be mandatory!!")
//         return;
//     }
//     else{
//         let s = {'name':name['name'],'email':email['email']}
//         props.addContactHandler(s)
//         // console.log('s',s);
//         setName('');setEmail('')
//         // console.log(props);
//         // props.history.push("/");
//     }
// };


//   return (
//     <div className="ui main">
//       <h2>Add Contact</h2>
//       <form className="ui form" onSubmit={add} id="AddContactForm">
//         <div className="field">
//           <label>Name</label>
//           <input type="text" name="name" placeholder="Name" onChange={(e)=>setName({'name':e.target.value})}/>
//         </div>
//         <div className="field">
//           <label>Email</label>
//           <input type="text" name="email" placeholder="Email" onChange={(e)=>setEmail({'email':e.target.value})}/>
//         </div>
//         <button className="ui button blue">Add</button>
//       </form>
//     </div>
//   );
// };

export default AddContact;
