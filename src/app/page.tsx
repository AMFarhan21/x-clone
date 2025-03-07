import LeftSidebar from "./components/LeftSidebar";




const Home = () => {
  return (
    <div className="w-full h-full flex justify-center items-center relative">
      <div className="max-w-screen-xl w-full h-full flex relative">
        {/* left sidebar for navigation */}
        <LeftSidebar />
        <main className="ml-64 p-4 w-[700px] h-full min-h-screen flex-col border-l border-r border-gray-600/50">
          <div className="text-sm font-bold flex justify-around pb-5 border-b border-gray-600/50">
            <div>For you</div>
            <div>Following</div>
          </div>

          
          <div className="text-sm font-bold flex h-3xl space-x-3 py-5 border-b border-gray-600/50">
            <div className="w-10 h-10 bg-slate-400 rounded-full"></div>
            <div className="flex flex-col border-b border-gray-600/50">
              <div>
                <input type="text" placeholder="What is happening?!" className="font-normal" />
              </div>
              <div className="flex justify-between w-full items-center">
                <div className="flex space-x-2 ">
                  <div className="w-4 h-4 bg-slate-400 rounded-full"></div>
                  <div className="w-4 h-4 bg-slate-400 rounded-full"></div>
                  <div className="w-4 h-4 bg-slate-400 rounded-full"></div>
                </div>
                <button className="bg-slate-600 p-2 rounded-full" >Post</button>
              </div>
            </div>
          </div>
        </main>
        <section></section>
      </div>
    </div>
  )
}

export default Home