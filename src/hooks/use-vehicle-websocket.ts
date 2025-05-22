import { VehicleData } from "@/features/members/types";
import { useEffect, useState, useRef } from "react";

export const useVehicleWebSocket = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [vehicleData, setVehicleData] = useState<VehicleData[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<Event | null>(null);
    const latestData = useRef<Map<number, VehicleData>>(new Map());

    useEffect(() => {
        // Initialize WebSocket connection
        const ws = new WebSocket(process.env.NEXT_PUBLIC_SOCKET_SERVER_URI!);

        ws.onopen = () => {
            console.log("WebSocket Connected");
            setIsConnected(true);
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                const items = Array.isArray(data) ? data : [data];

                setVehicleData(prev => {
                    let hasUpdates = false;
                    const updatedData = [...prev];

                    items.forEach(item => {
                        const existingIndex = prev.findIndex(v => v.id === item.id);

                        if (existingIndex >= 0) {
                            // Update existing item if different
                            if (JSON.stringify(prev[existingIndex]) !== JSON.stringify(item)) {
                                updatedData[existingIndex] = item;
                                latestData.current.set(item.id, item);
                                hasUpdates = true;
                            }
                        } else {
                            // Add new item
                            updatedData.push(item);
                            latestData.current.set(item.id, item);
                            hasUpdates = true;
                        }
                    });

                    return hasUpdates ? updatedData : prev;
                });
            } catch (error) {
                console.error("Error parsing WebSocket data:", error);
            }
        };

        ws.onclose = () => {
            console.log("WebSocket Disconnected");
            setIsConnected(false);
        };

        ws.onerror = (error) => {
            console.error("WebSocket Error:", error);
            setError(error);
        };

        setSocket(ws);

        // Cleanup function
        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close();
            }
        };
    }, []);

    return {
        socket,
        vehicleData,
        isConnected,
        error,
    }
}