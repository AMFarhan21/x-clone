import LeftSidebar from "../components/LeftSidebar";
import MainComponent from "../components/MainComponent";
import RightSection from "../components/RightSection";
import AuthModel from "@/components/AuthModel";


const Home = async () => {
  return (
    <div className="w-full h-full flex justify-center items-center relative ">

      <div className="max-w-screen-xl w-full h-full flex relative">
        <AuthModel />
        <LeftSidebar />
        <MainComponent />
        <RightSection />
      </div>
    </div>
  )
}

export default Home