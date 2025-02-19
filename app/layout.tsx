import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import "./globals.css";
import ThemeWrapper from "@/wrapper/theme/theme.wrapper";
import ProgressBarWrapper from "@/wrapper/progress-bar/progress.bar.wrapper";
import NextAuthWrapper from '@/wrapper/next-auth/next.auth.wrapper';
import { quicksand } from '@/wrapper/theme/theme';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={quicksand.className}>

        <AppRouterCacheProvider>

          <ThemeWrapper>

            <NextAuthWrapper>
              <ProgressBarWrapper>

                {children}

              </ProgressBarWrapper>
            </NextAuthWrapper>

          </ThemeWrapper>

        </AppRouterCacheProvider>

      </body>
    </html>
  );
}
