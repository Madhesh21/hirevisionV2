import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  showAuth?: boolean;
  userName?: string;
  showNavigation?: boolean;
  showBackToMain?: boolean;
  backToMainUrl?: string;
}

const Header = ({ showAuth = true, userName, showNavigation = false, showBackToMain = true, backToMainUrl = "/" }: HeaderProps) => {
  return (
    <header className="w-full border-b border-border bg-card">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-semibold text-foreground">
          HireVision
        </Link>

        <div className="flex items-center gap-4">
          {userName && (
            <span className="text-sm text-muted-foreground">
              Welcome, {userName}
            </span>
          )}
          
          {showNavigation && (
            <>
              {showBackToMain && (
                <Button variant="outline" asChild>
                  <Link to={backToMainUrl}>Back to Main</Link>
                </Button>
              )}
              <Button variant="outline" asChild>
                <Link to="/chat">AI Interview</Link>
              </Button>
            </>
          )}

          {showAuth && !userName && (
            <>
              <Button variant="ghost" asChild>
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
            </>
          )}

          {userName && (
            <Button variant="outline">
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
