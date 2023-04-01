import { Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import {FaFemale,FaMale,FaPowerOff,FaPlusCircle,FaTrash,FaUserCircle,FaUserEdit} from 'react-icons/fa';
import ReactLoading from "react-loading";
import styled from 'styled-components';
import FileUploader from "./components/FileUploader";
const apiUrl = 'http://localhost:8000/api/'


function App() {
  const [data, setData] = useState([]); 
  const [file, setFile] = useState()

  const removeFile = (file) => {
    const {name} = file;
    return fetch(apiUrl+`/${file.name}`, {method: "DELETE",
     headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }, 
     }).then(response => response.json().catch(error => error));
  }




  function handleChange(event) {
    setFile(event.target.files[0])
  }
  
  function handleSubmit(event) {
    event.preventDefault()
    
    const formData = new FormData();
    formData.append('file', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios.post(apiUrl+'/upload', formData, config).then((response) => {
      console.log(response.data);
    });

  }


   useEffect(() => {
    fetch(apiUrl)
          .then(response => response.json())    // 4. Setting *dogImage* to the image url that we received from the response above
          .then(data => setData(data))
          .catch(err => err)
     
     console.log(data)   
 },[])
 return(
  <>
        <form onSubmit={handleSubmit}>
          
          <input name="file" type="file" onChange={handleChange}/>
          <button type="submit">Upload</button>
        </form>
  <TableWrapper>
   <table>
    <thead>
      <tr>
          <th>Name</th>
          <th>size</th>
          <th>Date</th>
          <th>Remove</th>
      </tr>
    </thead>
      <tbody>
       {
        data != null && data.map((file,index) => (
        <tr key={index}>
          <td>{file.name}</td>
          <td>{file.size}</td>
          <td>{file.date}</td>
          <td><FormButtons color="red" onClick={() => removeFile(file)} ><span><FaTrash /></span></FormButtons></td>
       </tr>
        ))
      }     
      </tbody>

     <tfoot>
     <tr>
        <th>Name</th>
        <th>size</th>
        <th>Date</th>
        <th>Remove</th>
      </tr>
     </tfoot> 
    
   
   </table>
  </TableWrapper>
 </> 
);
}

export default App;

const TableWrapper = styled.div`
  position: relative;
  top:10%;
  display:flex;
  flex-direction:column;
  margin: 0rem 0rem;
  padding: 2rem 8rem;
  table {
    width:100%;
    border:solid whitegrey 2px;
    border-radius: 25px;
    justify-self: center;
    padding: 1rem 0rem;
    background: #282c34;
  }
  
  thead,tfoot {
    margin: 3rem 0.25rem;
    background: #282c34;
    color:white;
  }
tfoot > tr > td {
  border-top:solid grey 2px;
  
}
  tbody > tr > td {
    padding:0.5rem 8rem;
    border-top:solid grey 1px;
    color:white;
    text-transform:uppercase;
    font-size:11px;
  }
  @media only screen and (max-width: 700px) {
  position: relative;
  top:10%;
  display:flex;
  flex-direction:column;
  margin: 0rem 0rem;
  padding: 2rem 0rem;
  margin-left:0px;
  table {
    width:50%;
    border:solid whitegrey 2px;
    border-radius: 0px;
    padding: 1rem 0rem;
    background: #282c34;
  }
  }
  @media only screen and (max-width: 500px) {
    margin-left:0px;
  }
`;


export const FormButtons = styled.button`
    background:${props => props.color};
    color:white;
    font-size:1rem;
    padding:1.2rem 0.7rem;
    padding-top: 0.2rem;
    margin:0rem 0rem;
    cursor:pointer;
    border:none;
    border-radius:3px;
    max-height:1vh;
   
  `;

  export const LoadingEffectConatiner = styled.div`
  position:absolute;
  left:40%;
  `;