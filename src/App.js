import { useEffect, useState } from 'react';
import './App.css';
import './navbar.css'
import './table.css'
import Card from './Card.jsx';
import Navbar from './Navbar.jsx';
function App() {
  const [showsetting,setshowsetting] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupby,setgroupby] = useState('name')
  const [sortby,setsortby] = useState('name')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const jsonData = await response.json();

        setTickets(jsonData.tickets);
        setUsers(jsonData.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    console.log(tickets)
    console.log(users)
  }, []);
  const grouping = ()=>{
    var grouped = [];
    console.log(groupby)
    tickets.forEach(ticket =>{
      if(groupby==='userId' || groupby==='name')
      {
         const feature = ticket.userId
        if (!grouped[feature]) {
          grouped[feature] = [];
        }
        grouped[feature].push(ticket);
      }
      else {
        const feature = ticket.groupby
        console.log(feature)
        if (!grouped[feature]) {
          grouped[feature] = [];
        }
        grouped[feature].push(ticket);
      }
    })
    grouped.forEach((row) => {
      row.sort((a, b) => (a[1]-b[1]));
    });
    return grouped
  }
  const handleChange = (e) => {
    setgroupby(e.target.value);
  };

  const displayGroupedTicketDetails = () => {
    const groupednew  = grouping();
    console.log(groupednew)
    return (
      <div className='maindisplay' style={{ display:'flex', overflowY:'auto',maxWidth:'500%'}}>
        {Object.values(groupednew).map(arr => (
          <>
          <div><h2>{groupby === 'userId' || groupby === 'name' ? users.find(user => user.id === arr[0].userId)?.name : arr[0].groupby}</h2>
          <div key={arr[0].userId} style={{ padding: '1px', margin: '10px' }}>
            {arr.map(ticket => (
              <div key={ticket.id} style={{ marginBottom: '8px' }}>
                <Card
                  id={ticket.id}
                  title={ticket.title}
                  tag={ticket.tag.join(' ')}
                  name={users.find(user => user.id === ticket.userId).name}
                  availability={users.find(user => user.id === ticket.userId).available ? 'Available' : 'Not Available'}
                />
              </div>
            ))}
          </div>
          </div>
          </>
        ))}
      </div>
    );
  };


  return (
    <div className="App">
      <div className='navbar'>
        <div className='display'>
          Display &nbsp; <button onClick={(()=>{setshowsetting(!showsetting)})}>{">"}</button>
          {showsetting?<><div className='setting' >
              <div className='groupsetting'> 
                <div>
                  <label for="groupsetting">Grouping &nbsp; &nbsp; &nbsp; &nbsp;</label>
                  <select name="groupsetting" id="dd" value={groupby} onChange={handleChange}>
                    <option value="name">Name</option>
                    <option value="priority">Priority</option>
                    <option value="status">Status</option>
                  </select>
                </div>

               <div>
                <label for="ordersetting">Ordering &nbsp; &nbsp; &nbsp; &nbsp;</label>
                  <select name="groupsetting" id="dd">
                    <option value="Priority">Priority</option>
                    <option value="Stauts">Status</option>
                  </select>
               </div>
              </div>
          </div>
          </>:<></>}
        </div>
      </div>
      <div className='info'>
      {displayGroupedTicketDetails()}
      </div>
      
    </div>
  );
}

export default App;
