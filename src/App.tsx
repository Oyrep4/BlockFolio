import './App.css';

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>BlockFolio</h1>
        <p className="tagline">Your Work, Your Reputation, Anywhere</p>
      </header>
      <main className="main-content">
        <div className="buttons-container">
          <button className="login-button freelancer">Freelancer</button>
          <button className="login-button employer">Employer</button>
        </div>
      </main>
    </div>
  );
}

export default App
