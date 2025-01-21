import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import "./globals.css";
import { ToastContainer } from "react-toastify";
import ThemeWrapper from "@/wrapper/theme/theme.wrapper";
import ProgressBarWrapper from "@/wrapper/progress-bar/progress.bar.wrapper";
import NextAuthWrapper from '@/wrapper/next-auth/next.auth.wrapper';
import HorizontalScrollbarWrapper from '@/wrapper/horizontal-scrollbar/horizontal.scrollbar.wrapper';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>

        <AppRouterCacheProvider>

          <ThemeWrapper>

            <NextAuthWrapper>
              <HorizontalScrollbarWrapper>
                <ProgressBarWrapper>

                  {children}

                  <ToastContainer />

                </ProgressBarWrapper>
              </HorizontalScrollbarWrapper>
            </NextAuthWrapper>

          </ThemeWrapper>

        </AppRouterCacheProvider>

      </body>
    </html>
  );
}
