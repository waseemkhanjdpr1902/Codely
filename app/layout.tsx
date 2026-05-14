import "./globals.css";

export const metadata = {
  title: "Codely",
  description: "AI app builder",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
