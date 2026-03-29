import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

const Home = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  return (
    <div className="flex h-screen">
      <Sidebar
        selectedState={selectedState}
        setSelectedState={setSelectedState}
        selectedDistrict={selectedDistrict}
        setSelectedDistrict={setSelectedDistrict}
      />
      <ChatWindow
        selectedState={selectedState}
        selectedDistrict={selectedDistrict}
      />
    </div>
  );
};

export default Home;
