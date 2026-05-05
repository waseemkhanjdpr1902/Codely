export const metadata = {
  title: "Codely AI",
  description: "Build apps with AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white">
        {children}
      </body>
    </html>
  );
}
