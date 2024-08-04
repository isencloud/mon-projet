import React, { useState } from 'react';
import './connexioninscription.css';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

function Message({ message, type }) {
  return (
    <div className={`message ${type}`}>
      {message}
    </div>
  );
}

function App() {
  const [isRightPanelActive, setRightPanelActive] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleSignUpClick = () => {
    setRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setRightPanelActive(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Compte créé avec succès :", userCredential.user);
      setMessage({ text: 'Compte créé avec succès !', type: 'success' });
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      setMessage({ text: `Erreur lors de l'inscription : ${error.message}`, type: 'error' });
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage({ text: 'Connexion réussie !', type: 'success' });
    } catch (error) {
      setMessage({ text: `Erreur de connexion : ${error.message}`, type: 'error' });
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setMessage({ text: 'Veuillez entrer votre adresse email', type: 'error' });
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage({ text: 'Email de réinitialisation envoyé !', type: 'success' });
    } catch (error) {
      setMessage({ text: `Erreur : ${error.message}`, type: 'error' });
    }
  };

  return (
    <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`}>
      {message.text && <Message message={message.text} type={message.type} />}
      <div className="form-container sign-up-container">
        <form onSubmit={handleSignUp}>
          <h1>Créer votre compte</h1>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input type="tel" placeholder="Téléphone portable" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          <button type="submit">CRÉER UN COMPTE</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form onSubmit={handleSignIn}>
          <h1>Se connecter</h1>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="button" onClick={handleForgotPassword}>Mot de passe oublié ?</button>
          <button type="submit">CONNEXION</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Bienvenue !</h1>
            <p>Pour rester connecté avec nous, veuillez vous connecter avec vos informations personnelles</p>
            <button className="ghost" onClick={handleSignInClick}>CONNEXION</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Nouveau ici ?</h1>
            <p>Entrez vos informations personnelles et commencez votre aventure avec nous</p>
            <button className="ghost" onClick={handleSignUpClick}>CRÉER UN COMPTE</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;