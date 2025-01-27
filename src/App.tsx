import React from "react";
import Header from "../src/components/header/header";
import Footer from "./components/footer/footer";

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-6 space-y-4">
        
      </main>
      <Footer />
    </div>
  );
};

export default App;
