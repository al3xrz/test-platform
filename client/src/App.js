import './App.css';
import NavBar from './NavBar.jsx'
import ListBox from './TableBox';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios'

const API_PATH = 'http://127.0.0.1:5000'

function App() {
  const [items, setItems] = useState([])
  const [message, setMessage] = useState('')
  useEffect(() => {
    axios.get(`${API_PATH}/log`)
      .then(response => setItems(response.data.payload))
  }, [])

  const pushData = (message) => {
    axios.post(`${API_PATH}/log`, { message })
      .then(response => setItems(response.data.payload))
  }

  const clearData = () => {
    axios.delete(`${API_PATH}/log`)
      .then(response => setItems(response.data.payload))
  }

  return (
    <div className="App">
      <NavBar />
      <Box pt={3} mt={4} sx={{ border: "solid lightgray 1px", borderRadius: "6px" }}>
        <Box mt={2} height={"50px"} color={'WindowText'} display="flex"
          justifyContent="center" flexDirection={'row'} alignItems={'baseline'} sx={{ gap: "6px" }} >
          <TextField id="standard-basic" label="сообщение" variant="standard" onChange={e => { setMessage(e.target.value) }} />
          <Button variant='contained' onClick={e => { pushData(message) }}>Отправить</Button>
          <Button variant='contained' color='error' onClick={e => clearData()}>Очистить</Button>
        </Box>
        <Box display={'flex'} justifyContent={'center'} mt={5}>
          <ListBox items={items} />
        </Box>

      </Box>
    </div>
  );
}

export default App;
