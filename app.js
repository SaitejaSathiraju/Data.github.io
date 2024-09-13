import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [servers, setServers] = useState([{ power: '', cooling: '', workload: '' }]);
  const [results, setResults] = useState(null);

  const addServer = () => {
    setServers([...servers, { power: '', cooling: '', workload: '' }]);
  };

  const handleChange = (index, field, value) => {
    const newServers = [...servers];
    newServers[index][field] = value;
    setServers(newServers);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/optimize', { servers });
      setResults(response.data);
    } catch (error) {
      console.error("Error in optimization:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Energy-Efficient Data Center Optimization</h1>
      <div className="space-y-4">
        {servers.map((server, index) => (
          <div key={index} className="flex space-x-2">
            <input
              type="number"
              placeholder="Power (Watts)"
              value={server.power}
              onChange={(e) => handleChange(index, 'power', e.target.value)}
              className="p-2 border rounded w-full"
            />
            <input
              type="number"
              placeholder="Cooling Power (Watts)"
              value={server.cooling}
              onChange={(e) => handleChange(index, 'cooling', e.target.value)}
              className="p-2 border rounded w-full"
            />
            <input
              type="number"
              placeholder="Workload (Units)"
              value={server.workload}
              onChange={(e) => handleChange(index, 'workload', e.target.value)}
              className="p-2 border rounded w-full"
            />
          </div>
        ))}
        <button onClick={addServer} className="bg-blue-500 text-white px-4 py-2 rounded">Add Server</button>
        <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">Optimize</button>
      </div>

      {results && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold">Optimization Results</h2>
          <p>Total Energy Consumption: {results.totalEnergy} Watts</p>
          <ul>
            {results.solution.map((res, idx) => (
              <li key={idx}>{res.server}: {res.status}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
