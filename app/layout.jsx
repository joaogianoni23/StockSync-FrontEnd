import { Arimo } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "./globals.css";

const arimo = Arimo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arimo",
});

export const metadata = {
  title: "StockSync - Sistema de Gestão de Estoque",
  description: "Sistema profissional de gestão de estoque para empresas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={arimo.className}>
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

