
import BrowseByCategory from "@/components/home/BrowseByCategory";
import ChatBot from "@/components/ChatBot";
import HeroSection from "@/components/home/HeroSection";
import JobsOfDay from "@/components/home/JobsOfDay";
import NewsAndBlogs from "@/components/home/NewsAndBlogs";
import SubscribeSection from "@/components/utlis/SubscribeSection";
import PrettyLoader from "@/components/utlis/PreetyLoader";


export default function Home() {

  return (
    <div>
      <HeroSection />
      <BrowseByCategory />
      <JobsOfDay />
      <NewsAndBlogs />
      <SubscribeSection />
      <ChatBot/>
      {/* <PrettyLoader/> */}
    </div>
  );
}
