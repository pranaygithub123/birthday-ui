"use client";

import { useSearchParams } from "next/navigation";
import BirthdayWish from "../components/BirthdayWish";

export default function BirthdayPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Bhai";
  const message =
    searchParams.get("message") ||
    "Wishing you happiness and success always ❤️";

  return <BirthdayWish name={name} message={message} />;
}
