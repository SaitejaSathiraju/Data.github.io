const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/optimize', (req, res) => {
  const { servers } = req.body;
  
  // Prepare the data for the Python script
  const power = servers.map(s => s.power).join(',');
  const cooling = servers.map(s => s.cooling).join(',');
  const workload = servers.map(s => s.workload).join(',');

  // Call the Python script with the necessary parameters
  exec(`python3 optimize.py "${power}" "${cooling}" "${workload}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).send("Server error");
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return res.status(500).send("Optimization error");
    }
  

    // Parse the Python output and send it back to the client
    const result = JSON.parse(stdout);
    res.json(result);
  });
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
