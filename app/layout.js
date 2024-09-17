import "./globals.css";

export const metadata = {
  title: "Harmony.AI",
  description: "Discover, Curate, Recommend",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
