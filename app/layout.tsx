import "./globals.css";
// If you have a file like css/style.css, link it like this:
import "../css/style.css"; 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
