import "./styles/globals.css";

export const metadata = {
  title: "issue Logger v1.0.0",
  description: "mvp app ,next js front end ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
