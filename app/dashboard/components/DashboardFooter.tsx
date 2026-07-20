export default function DashboardFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="flex h-12 items-center justify-between px-6 text-sm text-muted-foreground">
        <span>
          © {currentYear} Workforce & Activity Management Platform (WAMP)
        </span>

        <span>Version 2.0</span>
      </div>
    </footer>
  );
}