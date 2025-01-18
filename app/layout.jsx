import "./styles/globals.css";

export const metadata = {
  title: "issue Logger v1.0.0",
  description: "defects | issue logger - techValley Zambia ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
