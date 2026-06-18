import "./globals.css";
import AuthProvider from "@/components/auth/AuthProvider";

export const metadata = {
  title: "Codely",
  description: "Build simple apps and tools with AI, without coding.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
