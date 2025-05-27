import { VehicleData } from "@/features/members/types";
import { useGetAllVehicleInfoQuery } from "@/redux/features/vehicle/vehicleApi";
import { useEffect, useState, useRef } from "react";

export const useVehicleWebSocket = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [vehicleData, setVehicleData] = useState<VehicleData[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<Event | null>(null);
    const latestData = useRef<Map<number, VehicleData>>(new Map());
    const wsRef = useRef<WebSocket | null>(null);

    const { data: rtkData, isLoading: rtkLoading, refetch } = useGetAllVehicleInfoQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    useEffect(() => {
        // Initialize with RTK data if available
        if (rtkData && !rtkLoading) {
            setVehicleData(rtkData);
        }
    }, [rtkData, rtkLoading]);


    useEffect(() => {
        // Initialize WebSocket connection
        const ws = new WebSocket(process.env.NEXT_PUBLIC_SOCKET_SERVER_URI!);
        wsRef.current = ws;

        ws.onopen = () => {
            console.log("WebSocket Connected");
            setIsConnected(true);
            refetch();
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

                if (items.some(item => item.criticalUpdate)) {
                    refetch();
                }
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
            if (wsRef.current?.readyState === WebSocket.OPEN) {
                wsRef.current?.close();
            }
        };
    }, [refetch]);

    return {
        socket,
        vehicleData:  rtkLoading ? [] : vehicleData,
        isConnected,
        isLoading: rtkLoading,
        rtkData,
        error,
    }
}