"use client"

import { useState, useEffect } from "react"
import { validateApiKeys } from "../../utils/constants"
import Button from "./Button"

const ApiStatus = () => {
  const [apiErrors, setApiErrors] = useState([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const errors = validateApiKeys()
    setApiErrors(errors)
    setIsVisible(errors.length > 0)
  }, [])

  if (!isVisible) return null

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800">API Configuration Required</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>The following environment variables are missing:</p>
            <ul className="list-disc list-inside mt-1">
              {apiErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
            <div className="mt-3 p-3 bg-red-100 rounded-md">
              <p className="text-xs font-medium text-red-800 mb-2">To fix this:</p>
              <ol className="text-xs text-red-700 space-y-1">
                <li>
                  1. Get a free API key from{" "}
                  <a
                    href="https://www.themoviedb.org/settings/api"
                    className="underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    TMDB
                  </a>
                </li>
                <li>
                  2. Get a free API key from{" "}
                  <a
                    href="http://www.omdbapi.com/apikey.aspx"
                    className="underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    OMDb
                  </a>
                </li>
                <li>3. Add them to your environment variables in the v0 settings</li>
              </ol>
            </div>
          </div>
        </div>
        <div className="ml-3 flex-shrink-0">
          <Button onClick={() => setIsVisible(false)} variant="outline" size="small">
            Dismiss
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ApiStatus
