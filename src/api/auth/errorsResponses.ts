import { NextResponse } from "next/server";

export const UnauthorizedResponse = () =>
  NextResponse.json({ error: "Unauthorized" }, { status: 401 });

export const forbiddenResponse = () =>
  NextResponse.json({ error: "Forbidden" }, { status: 403 });
