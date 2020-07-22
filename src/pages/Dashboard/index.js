import React, {useEffect, useState, useMemo} from 'react';
// para criar links para que o usuario va para outra rota
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';
import socketio from 'socket.io-client';

export default function Dashboard(){
    const [spots, setSpots] = useState([]);

    const [requests, setRequests] = useState([]);

    const user_id = localStorage.getItem('user');
        // passando o id do usuario para o backend
    const socket = useMemo(() => socketio('http://localhost:3333',{
        query: { user_id },
    }), [user_id]);
    // para disparar uma funcao assim que o componente for exibido em tela
    useEffect(() => {
        
        // indicando o que ocorre quando a mensagem hello for recebida
        socket.on('booking_request', data =>{
            setRequests([...requests, data]);
        })
    }, [requests, socket]);

    useEffect( () => {
        async function loadSpots(){
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard',{
                headers: {user_id}
            });
            setSpots(response.data);
        }

        loadSpots();
    }, []);

    async function handleAccept(id) {
        await api.post(`bookings/` + id + `approvals`);

        setRequests(requests.felter(request => request._id !== id));
    }
    async function handleReject(id) {
        await api.post(`bookings/` + id + `rejections`);

        setRequests(requests.felter(request => request._id !== id));
    }

    return(
        <> 
            <ul className = "notifications"> 
                {requests.map(request =>(
                    <li key = {request._id}>
                        <p>
                            <strong>{request.user.email}</strong> esta solicitando uma reserva
                            em <strong>{request.spot.company}</strong> para a data: {request.date}
                        </p>
                        <button className = "accept" onClick = {() => handleAccept(request._id)}>ACEITAR</button>
                        <button className= "reject" onClick = {() => handleReject(request._id)}>REJEITAR</button>
                    </li>
                ))}
            </ul>
            <ul className = "spot-list">
                {spots.map(spot => (
                    <li key= {spot._id}>
                        <header style= {{backgroundImage: 'url('+ spot.thumbnail_url+')'}}></header>
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? 'R$' + spot.price + '/dia' : 'GRATUITO'}</span>
                    </li>
                ))}

            </ul>
            
            <Link to = "/new">
                    <button className = "btn">cadastrar novo spot</button>
            </Link>
        </>
    )
}