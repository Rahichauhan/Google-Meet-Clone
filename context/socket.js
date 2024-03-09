import { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { createContext } from "react";
const socketContext=createContext(null);
export const useSocket=()=>{
    const socket=useContext(socketContext)
    return socket
}
export const SocketProvider=(props)=>{
    const {children}=props;
    const[socket,setSocket]=useState(null);
    useEffect(()=>{
        const connection=io()
        console.log("connection",connection)
        setSocket(connection);
    },[])
    socket?.on('connect_error',async(error)=>{
        console.log('Error establishinh error',error);
        await fetch('/api/socket');
    })
    return(<socketContext.Provider value={socket}>
      {children}
    </socketContext.Provider>)
}