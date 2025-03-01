import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import "./globals.css";
import ThemeWrapper from "@/wrapper/theme/theme.wrapper";
import ProgressBarWrapper from "@/wrapper/progress-bar/progress.bar.wrapper";
import NextAuthWrapper from '@/wrapper/next-auth/next.auth.wrapper';
import { quicksand } from '@/wrapper/theme/theme';
import { CoursePurchasedWrapper } from '@/wrapper/course-purchased/course.purchased.wrapper';
import { UserAvatarWrapper } from '@/wrapper/user-avatar/user.avatar.wrapper';
import UserProgressWrapper from '@/wrapper/user-progress/user.progress.wrapper';

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

                <UserProgressWrapper>
                  <CoursePurchasedWrapper>
                    <UserAvatarWrapper>
                      {children}
                    </UserAvatarWrapper>
                  </CoursePurchasedWrapper>
                </UserProgressWrapper>

              </ProgressBarWrapper>
            </NextAuthWrapper>

          </ThemeWrapper>

        </AppRouterCacheProvider>

      </body>
    </html>
  );
}
