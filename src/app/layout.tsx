import "./globals.css";

export const metadata = {
  title: "Mofako Invoice",
  description: "Create invoices effortlessly",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
