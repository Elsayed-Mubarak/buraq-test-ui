import QueryProvider from "@/components/wrappers/QueryProvider";
import ToasterProvider from "@/components/wrappers/ToasterProvider";
import "./globals.css";
import 'react-quill/dist/quill.snow.css';
import "react-phone-input-2/lib/style.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <html lang="en">
        <body>
          <div>{children}</div>
          <div id="popup-root"></div>
          <ToasterProvider />
        </body>
      </html>
    </QueryProvider>
  );
}
