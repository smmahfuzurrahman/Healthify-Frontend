import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import Lottie from "lottie-react";
import Login from "@/components/auth/Login";
import SignUp from "@/components/auth/SignUp";
import auth from "@/assets/animation/auth.json";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-around">
        <div>
          <Lottie animationData={auth} loop={true} className="w-[400px]" />
        </div>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-[400px]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signUp">Sign-up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Login />
          </TabsContent>
          <TabsContent value="signUp">
            <SignUp setActiveTab={setActiveTab} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Auth;
