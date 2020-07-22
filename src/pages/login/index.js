import React, {useState} from 'react';
import api from '../../services/api';

export default function Login( { history } ){
    // useState retorna um vetor. setEmail serve pra atualizar o valor da variavel email
  const [email, setEmail] = useState('');
  
  async function handleSubmit( event ){
    event.preventDefault();
    
    const response = await api.post('/sessions', { email})

    const { _id } = response.data;
    // para salvar no banco de dados da aplicação
    localStorage.setItem('user', _id);

    history.push('/dashboard');
  }
    return (
        <>
            <p>
            Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
            </p>
            
            <form onSubmit = {handleSubmit}>
            <label htmlFor= "email">E-MAIL *c</label>
            <input 
                type="email" 
                id= "email" 
                placeholder="Seu melhor email" 
                value ={email}
                onChange = {event => setEmail(event.target.value)}
            />
            <button className= "btn"type= "submit">Entrar</button>
            </form>
        </>
    )
}
