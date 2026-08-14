import "./globals.css";

export const metadata = {
  title: "StudyNova — Smart Tools for Students",
  description: "Free academic calculators, study planners, focus tools and student utilities designed to help students study smarter.",
};

export default function RootLayout({ children }) {
  return <html lang="en" className="h-full scroll-smooth antialiased"><body className="min-h-full font-sans">{children}</body></html>;
}
