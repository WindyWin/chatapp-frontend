import { createContext, useContext, useEffect, useState } from "react";
import { io, Manager } from "socket.io-client";
import { AuthContext } from "./AuthProvider";
//socket context and provider
const SocketContext = createContext({});


const SocketProvider = ({ children }: any) => {
    const [socket, setSocket] = useState<any>();
    const { user } = useContext(AuthContext);

    useEffect(
        () => {
            if (user.uid) {
                // const newSocket = new Manager("http://localhost:8080", {
                //     auth: { userId: user.uid },
                // });
                const newSocket = io("http://localhost:8080", {
                    auth: { userId: user.uid },
                });

                setSocket(newSocket);
                newSocket.emit("online", user.uid);
                return () => {
                    newSocket.close();
                }
            }
        }, [user]);

    return (
        <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
    );
};

export { SocketContext, SocketProvider };

