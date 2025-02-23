"use client";
import { useEffect } from "react";
import { Client } from "@stomp/stompjs";

export const useWebSocket = (onMessageReceived: (message: string) => void) => {
    useEffect(() => {
        const stompClient = new Client({
            brokerURL: "ws://localhost:8386/ws/websocket",
            heartbeatIncoming: 3000,
            heartbeatOutgoing: 3000,
            onConnect: () => {
                console.log("Connected to WebSocket");
                stompClient.subscribe("/topic/purchased", (message) => {
                    onMessageReceived(message.body);
                });
            },
            onDisconnect: () => {
                console.log("Disconnected from WebSocket");
            },
        });

        stompClient.activate();

        return () => {
            stompClient.deactivate();
        };
    }, [onMessageReceived]);
};
