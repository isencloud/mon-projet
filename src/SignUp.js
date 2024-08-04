import React, { useState } from 'react';
import { auth, firestore } from './firebase';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      await firestore.collection('utilisateurs').doc(userCredential.user.uid).set({
        email: email,
        createdAt: new Date()
      });
      alert('Compte créé avec succès');
    } catch (error) {
      console.error('Erreur lors de la création du compte:', error);
    }
  };

  return (
    <div>
      <h2>Créer votre compte</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
        />
        <button type="submit">Créer un compte</button>
      </form>
    </div>
  );
};

export default SignUp;
