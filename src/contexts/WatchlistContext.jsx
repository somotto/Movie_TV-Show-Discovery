"use client"

import { createContext, useContext, useReducer, useEffect } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"

const WatchlistContext = createContext()

const watchlistReducer = (state, action) => {
    switch (action.type) {
        case "LOAD_WATCHLIST":
            return action.payload

        case "ADD_TO_WATCHLIST":
            const existingIndex = state.findIndex(
                (item) => item.id === action.payload.id && item.type === action.payload.type,
            )
            if (existingIndex !== -1) {
                return state
            }
            return [...state, { ...action.payload, dateAdded: new Date().toISOString() }]

        case "REMOVE_FROM_WATCHLIST":
            return state.filter((item) => !(item.id === action.payload.id && item.type === action.payload.type))

        case "UPDATE_WATCHLIST_ITEM":
            return state.map((item) =>
                item.id === action.payload.id && item.type === action.payload.type
                    ? { ...item, ...action.payload.updates }
                    : item,
            )

        case "CLEAR_WATCHLIST":
            return []

        default:
            return state
    }
}

export const WatchlistProvider = ({ children }) => {
    const [storedWatchlist, setStoredWatchlist] = useLocalStorage("watchlist", [])
    const [watchlist, dispatch] = useReducer(watchlistReducer, storedWatchlist)

    useEffect(() => {
        dispatch({ type: "LOAD_WATCHLIST", payload: storedWatchlist })
    }, [storedWatchlist])

    useEffect(() => {
        setStoredWatchlist(watchlist)
    }, [watchlist, setStoredWatchlist])

    const addToWatchlist = (item) => {
        dispatch({ type: "ADD_TO_WATCHLIST", payload: item })
    }

    const removeFromWatchlist = (id, type) => {
        dispatch({ type: "REMOVE_FROM_WATCHLIST", payload: { id, type } })
    }

    const updateWatchlistItem = (id, type, updates) => {
        dispatch({ type: "UPDATE_WATCHLIST_ITEM", payload: { id, type, updates } })
    }

    const isInWatchlist = (id, type) => {
        return watchlist.some((item) => item.id === id && item.type === type)
    }

    const clearWatchlist = () => {
        dispatch({ type: "CLEAR_WATCHLIST" })
    }

    const getWatchlistByStatus = (status) => {
        return watchlist.filter((item) => item.status === status)
    }

    const value = {
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        updateWatchlistItem,
        isInWatchlist,
        clearWatchlist,
        getWatchlistByStatus,
    }

    return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>
}

export const useWatchlist = () => {
    const context = useContext(WatchlistContext)
    if (!context) {
        throw new Error("useWatchlist must be used within a WatchlistProvider")
    }
    return context
}