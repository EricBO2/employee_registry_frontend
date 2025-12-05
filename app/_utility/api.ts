"use client"

import { useRouter } from "next/navigation"


export async function apiFetch<T>(
  url: string,
  options: RequestInit = {},
  router?: ReturnType<typeof useRouter>
): Promise<T | null> {
  let res: Response
  
  try {
    // FETCH (network + HTTP errors)
    res = await fetch(url, {
      credentials: "include", // Include cookies for JWT auth
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    })
  } catch (networkError) {
    console.error("Network error:", networkError)
    return null
  }
  
  
  // EXPIRED / INVALID TOKEN
  if (res.status === 401 || res.status === 403) {
    console.warn("Session expired. Redirecting to login…")
    
    //TODO  resuts import { NextResponse } from "next/server" ANSWER det verkar som next response inte fungerar
     if (router) {
    router.replace("/login");
  } else {
    window.location.href = "/login"; 
  }
    
    return null
  }

  // HTTP ERROR
  if (!res.ok) {
    console.error("HTTP Error:", res.status, res.statusText)
    return null
  }

  // SAFE JSON PARSE
  let json: any
  try {
    json = await res.json()
  } catch (err) {
    console.error("Response is not valid JSON:", err)
    return null
  }
  

  // JSON IS NULL
  if (json == null) {
    console.error("JSON is null or undefined")
    return null
  }

  // API LOGIC FAILED (if your API uses success/error)
  if (json.success === false) {
    console.error("API logic error:", json.error)
    return null
  }

  // RETURN EITHER json.data OR JUST json
  return (json.data ?? json) as T
}