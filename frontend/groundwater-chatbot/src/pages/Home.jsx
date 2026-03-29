import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

const Home = () => {
  const [selectedState, setSelectedState] = useState("");

  return (
    <div className="flex h-screen">
      <Sidebar
        selectedState={selectedState}
        setSelectedState={setSelectedState}
      />
      <ChatWindow selectedState={selectedState} />
    </div>
  );
};

export default Home;
