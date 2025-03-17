import { CoursePurchasedWrapper } from '@/wrapper/course-purchased/course.purchased.wrapper';
import NextAuthWrapper from '@/wrapper/next-auth/next.auth.wrapper';
import ProgressBarWrapper from "@/wrapper/progress-bar/progress.bar.wrapper";
import { quicksand } from '@/wrapper/theme/theme';
import ThemeWrapper from "@/wrapper/theme/theme.wrapper";
import { UserAvatarWrapper } from '@/wrapper/user-avatar/user.avatar.wrapper';
import { UserExpertWrapper } from '@/wrapper/user-expert/user.expert.wrapper';
import UserProgressWrapper from '@/wrapper/user-progress/user.progress.wrapper';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import "./globals.css";

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

                <UserExpertWrapper>
                  <UserProgressWrapper>
                    <CoursePurchasedWrapper>
                      <UserAvatarWrapper>
                        {children}
                      </UserAvatarWrapper>
                    </CoursePurchasedWrapper>
                  </UserProgressWrapper>
                </UserExpertWrapper>

              </ProgressBarWrapper>
            </NextAuthWrapper>

          </ThemeWrapper>

        </AppRouterCacheProvider>

      </body>
    </html>
  );
}
