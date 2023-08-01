import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];



function Button({ children ,onClick}) {
  return <button className="button" onClick={onClick}>{children}</button>;
}

export default function App() {

  const [showAddFriend , setShowAddFriend] = useState(false)
  const [friendsarr , setfriendsarr] = useState(initialFriends);
  const [showSideDisplay , setSideDisplay]  = useState(null);

  function handlerarra(newcomer){
    setfriendsarr((news) => [...friendsarr , newcomer])
    setShowAddFriend(false)
  }
  function handler(){
    setShowAddFriend((show)=> (!show))
  }

  function handler2(friendInfo){
    console.log(friendInfo.name)
    setSideDisplay(friendInfo)
  }


  function handler7(value){
       console.log(value)
       setfriendsarr(friendsarr.map((fri)=> fri.id === showSideDisplay.id ? {...fri ,balance: fri.balance + value}: fri))
       setSideDisplay(null)
  }
  return (
    <div className="app">
      <div className="sidebar">
         <FriendList friends={friendsarr} func3={handler2} />
        { showAddFriend && <AddFriend  func2 = {handlerarra}/>}
        <Button onClick={handler} children={showAddFriend ? "Close": "Add Friend"}/>
      </div>
      { showSideDisplay && <FormSplitBill func5={showSideDisplay} func6={handler7} /> }
    </div>
  );
}

function FriendList({friends , func3}) {
  //const friends = initialFriends;
  return (
    <ul>
      {friends.map((friend) => (
        <Friending friendInfo={friend} key={friend.id}  func3 = {func3}/>
      ))}
    </ul>
  );
}

function Friending({ friendInfo, key , func3 }) {


  return (
    <li>
      <img src={friendInfo.image} alt={friendInfo.name} />
      <h1>{friendInfo.name}</h1>
      
        {friendInfo.balance > 0 && (
          <p className="green">
            {friendInfo.name} owns you {Math.abs(friendInfo.balance)}$
          </p>
        )}

        {friendInfo.balance < 0 && (
          <p className="red">
            you  owns  {friendInfo.name} {Math.abs(friendInfo.balance)}$
          </p>
        )}

        {friendInfo.balance == 0 && (
          <p>You and {friendInfo.name} are even</p>
        )}
      
      <Button children="Select" onClick={()=>func3(friendInfo)} />
    </li>
  );
}



function AddFriend({func2}) {

  const [name,setName] = useState('');
  const [image,setImage] = useState('https://i.pravatar.cc/48?u=499476');


  function formsubmission(e){
      e.preventDefault()

   /* so now here we try to create the object for the given details which the user has given to us as well..
      so finally back we append those to the big array that gets rendered back as the component as well...
    */

  const info ={
    name,
    image,
    balance: 0
  }


  setName('');
  setImage('');
   
  console.log(info);
  func2(info); 
  }

  return (
    <form className="add-form-friend" onSubmit={formsubmission}>
      <label> 🍟 Friend Name</label>
      <input type="text" value={name}  onChange={(e)=>setName(e.target.value)}/>

      <label> 🙅‍♂️ Image URL:-</label>
      <input type="text"  value={image} onChange={(e)=>setImage(e.target.value)}/>
      <Button children="Add" />
    </form>
  );
}



function FormSplitBill({func5, func6}){
  const [val1,setVal1] = useState('');
  const [val2 , setVal2] = useState('');
  const [val3,setVal3] = useState("You");
  var res = Number(val1 - val2)

  if(res <0 ){
    res = 0;
  }


  function handler5(e){
    e.preventDefault();

    if(!val1 || !val2){
      return;
    }
 
     if(val3 === "You"){
          func6(res)
     }else{
         func6(-val2)
     }
  }
  return(
    <form className="form-split-bill" onSubmit={handler5} >
       <h2>Split a Bill with {func5.name}</h2>

       <label>💰Bill Value</label>
       <input value={val1} onChange={(e)=>setVal1(e.target.value)}/>

       <label> 🕴️Your Expense</label>
       <input  value={val2}  onChange={(e)=>setVal2(e.target.value)} />

       <label> 🧑‍🤝‍🧑{func5.name} Expense</label>
       <input value={res} />
      
      <label>💷 Who is paying the bill</label>
      <select>
        <option value="You" >You</option>
        <option value="friend">{func5.name}</option>
      </select>
        <Button  children="Split Bill"/>
    </form>
  )
}