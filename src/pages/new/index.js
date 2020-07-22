// useMemo observa o valor de uma variavel para caso ela se modifique ele mude o valor de outra variavel
import React, { useState, useMemo} from 'react';
import camera from '../../assets/camera.svg';
import './styles.css';
import api from '../../services/api';

export default function New({ history }){
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    
    const preview = useMemo(() =>{
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
        },[thumbnail])

    async function handleSubmit(event){
        event.preventDefault();

        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('companyl', company);
        data.append('techs', techs);
        data.append('price', price);

         await api.post('/spots', data, {
            headers: {user_id}
        })
        history.push('/dashboard');
    }
    return (
        <form onSubmit= {handleSubmit}>
            <label 
            id= "thumbnail" 
            style = {{backgroundImage: 'url(' + preview + ')'}}
            className={thumbnail ? 'has-thumbnail' : ''}
            >
                <input type= "file" onChange= {event => setThumbnail(event.target.files[0])}/>
                <img src = {camera} alt = "Select img"></img>
            
            </label>

            <label htmlFor= "company">EMPRESA *c</label>
            <input
                id = "company"
                placeholder = "sua empresa incrivel"
                value = {company}
                onChange = {event => setCompany(event.target.value)} />

            <label htmlFor = "techs">TECNOLOGIAS <span>separadas por virgula</span></label>
            <input
                id = "techs"
                placeholder = "Quais tecnologias usam?"
                value = {techs}
                onChange = {event => setTechs(event.target.value)}
            /> 
            
            <label htmlFor = "price">valor da diaria <span>em branco para gratuito</span></label>
            <input
                id = "techs"
                placeholder = "valor cobrado por dia?"
                value = {price}
                onChange = {event => setPrice(event.target.value)}
            />
            <button type= "submit" className= "btn">cadastrar</button>
        </form>
    )
}