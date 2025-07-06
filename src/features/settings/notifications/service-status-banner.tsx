"use client"

import { AlertTriangle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export const ServiceStatusBanner = () => {
    const [isVisible, setIsVisible] = useState(true)
    if (!isVisible) return null

    return (
        <div className="relative bg-gradient-to-r from-red-500 via-red-600 to-red-700 dark:from-red-600 dark:via-red-700 dark:to-red-800 shadow-lg border-b border-red-800/20 dark:border-red-900/30">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-20 dark:opacity-10">
                <div
                    className="absolute inset-0 bg-white/5 dark:bg-white/10"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: "60px 60px",
                    }}
                ></div>
            </div>

            <div className="relative px-4 py-3 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                            <div className="flex items-center justify-center w-8 h-8 bg-white/20 dark:bg-white/30 rounded-full backdrop-blur-sm">
                                <AlertTriangle className="w-4 h-4 text-white" />
                            </div>
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                                <p className="text-sm font-semibold text-white">Service Unavailable</p>
                                <span className="hidden sm:inline text-white/60 dark:text-white/50">•</span>
                                <p className="text-sm text-white/90 dark:text-white/80 mt-1 sm:mt-0">
                                    We&apos;re working on its functionality. Thank you for your patience.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsVisible(false)}
                            className="text-white hover:bg-white/20 dark:hover:bg-white/30 p-2 rounded-full transition-all duration-200 hover:scale-110"
                        >
                            <X className="size-4" />
                            <span className="sr-only">Dismiss notification</span>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Bottom accent line */}
            <div className="h-1 bg-gradient-to-r from-red-400 via-red-300 to-red-400 dark:from-red-500 dark:via-red-400 dark:to-red-500"></div>
        </div>
    )
}