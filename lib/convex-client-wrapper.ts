"use client";

import { ConvexReactClient } from "convex/react";

let convexClient: ConvexReactClient | null = null;

export function getConvexClient() {
  if (!convexClient) {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!convexUrl) {
      throw new Error("NEXT_PUBLIC_CONVEX_URL environment variable is not set");
    }
    convexClient = new ConvexReactClient(convexUrl);
  }
  return convexClient;
}