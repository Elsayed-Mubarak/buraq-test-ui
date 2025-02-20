import React from "react";

type Props = {
  children: React.ReactNode;
};
export const metadata = {
  title: "Contacts | Buraq",
};
export default function ContactsLayout({ children }: Props) {
  return children;
}
