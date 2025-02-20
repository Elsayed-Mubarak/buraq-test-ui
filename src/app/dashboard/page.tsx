"use client";
import { redirect } from "next/navigation";
import "react-phone-input-2/lib/style.css";

function MyApp() {
  return redirect("/dashboard/analytics");
}

export default MyApp;
