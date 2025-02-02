'use client'
import { useState } from 'react';

export default function Dashboard() {
  const [platform, setPlatform] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call the API route to start the scraping process
    const response = await fetch('/api/crawl', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ platform, username, password }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <h1>Social Media Investigator</h1>
      <form onSubmit={handleSubmit} className=''>
        <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
          <option value="">Select Platform</option>
          <option value="facebook">Facebook</option>
          <option value="twitter">Twitter</option>
          <option value="instagram">Instagram</option>
        </select>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Start Investigation</button>
      </form>
    </div>
  );
}
