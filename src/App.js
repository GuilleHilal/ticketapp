import './App.css';
import QrScanner from 'qr-scanner';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { VechaiProvide } from "@vechaiui/react";
import { Button } from "@vechaiui/react"



function App() {
  const video = document.getElementById('qr-video');

  const [nombre, setNombre] = useState('')
  const [invitados,setInvitados]=useState([])
  const [apellido, setApellido] = useState('')
  const [completo, setCompleto] = useState('')
  const [llego, setLlego] = useState('')
  const [APIData, setAPIData] = useState('')
  const camQrResult = document.getElementById('cam-qr-result');

  const qrScanner = new QrScanner(video, result => setResult(camQrResult, result), {
    onDecodeError: error => {
        camQrResult.textContent = error;
        camQrResult.style.color = 'inherit';
    },
    highlightScanRegion: true,
    highlightCodeOutline: true,
});


  function setResult(label, result) {
    console.log(result.data);
    label.textContent = result.data;
    qrScanner.stop()

    alert("La persona puede ingresar")
    qrScanner.start()
    
  }
  
  
  // useEffect(() => {
  // // const flashToggle = document.getElementById('flash-toggle');
    
  //     // qrScanner.start()
  //     // flashToggle.addEventListener('click', () => {
  //     //   qrScanner.toggleFlash()
  //     // });
    
  //   //   fetchInvitados();

    
  //   }, []);


  const fetchInvitados=async()=>{
    const response=await Axios('https://sheet.best/api/sheets/854cf07d-67b0-4328-adf0-5f41c55fbb67');
    setInvitados(response.data)    
  }
 


  return (
    
    <div>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"></link>

      <div id="video-container">
        <video id="qr-video">
        </video>
      </div>  

      <div className="flex flex-wrap w-full p-8 space-x-2">

      <Button variant="ghost">Flash</Button>

      </div>
     
      <hr size="3px" color="black" />

      <table className="table table-striped">
        

    <tbody>
    <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Completo</th>
            <th>Llegó?</th>

      </tr>
      {
        invitados.map((item) => (
            <tr key={item.id}>
                <td>{item.nombre}</td>
                <td>{item.apellido}</td>
                <td>{item.completo}</td>
                <td>{item.llego}</td>

                <td/>
            </tr>
        ))
                    }
         
    </tbody>
</table>
    

    </div>
    
  )
}

export default App;
