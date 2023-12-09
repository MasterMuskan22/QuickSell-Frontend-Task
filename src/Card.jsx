import React from 'react'
import './card.css'

const card = ({id,title,tag,name}) => {
    console.log(name);
    name = name[0].toUpperCase() + name[1].toUpperCase()
    function titlecase(str){
        if (typeof str === 'string') 
        str = str.toLowerCase()
        str = str.split(' ')
        for (var i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
        }
        return str.join(' ')
    }
  return (
    <div className="container">
        <div className="id">
            <p>{id.toUpperCase()}</p>
            <p style={{textAlign:'right', borderRadius:'50%',padding:'2px',border:'1px solid black',background:'green',color:'white'}}>{name}</p>
        </div>
        <div className="title">
            {/* <input type="checkbox"></input> */}
            {titlecase(title)}</div>
        <div className="tag">
                <span>&nbsp;</span>{titlecase(tag)}
        </div>

    </div>
  )
}

export default card