import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SignIn = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-light tracking-tight text-foreground">
          Hire<span className="font-semibold">Vision</span>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Welcome back! Sign in to your account
        </p>
      </div>

      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                className="bg-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="bg-input"
              />
            </div>

            <Button className="w-full" size="lg">
              Sign In
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              New to HireVision?{" "}
              <Link to="/signup" className="font-medium text-foreground hover:underline">
                Create an account
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>

      <Link
        to="/"
        className="mt-6 text-sm text-muted-foreground hover:text-foreground"
      >
        ← Back to Home
      </Link>
    </div>
  );
};

export default SignIn;
