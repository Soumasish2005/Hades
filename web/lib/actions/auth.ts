"use client";

import { signIn, signOut } from "next-auth/react";

export const loginWithGoogle = async () => {
  try {
    await signIn("google", { 
      callbackUrl: "/dashboard",
      redirect: true 
    });
  } catch (error) {
    console.error("Google login error:", error);
    throw error;
  }
};

export const loginWithGitHub = async () => {
  try {
    await signIn("github", { 
      callbackUrl: "/dashboard",
      redirect: true 
    });
  } catch (error) {
    console.error("GitHub login error:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut({ 
      callbackUrl: "/",
      redirect: true 
    });
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

export const loginWithCredentials = async (email: string, password: string) => {
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    
    if (result?.error) {
      throw new Error(result.error);
    }
    
    return result;
  } catch (error) {
    console.error("Credentials login error:", error);
    throw error;
  }
};