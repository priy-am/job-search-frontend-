import BrowseByCategory from "@/components/BrowseByCategory";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import JobsOfDay from "@/components/JobsOfDay";
import NewsAndBlogs from "@/components/NewsAndBlogs";
import SubscribeSection from "@/components/SubscribeSection";


export default function Home() {
  return (
    <div>
      <HeroSection/>
      <BrowseByCategory/>
      <JobsOfDay/>
      <NewsAndBlogs/>
      <SubscribeSection/>
    </div>
  );
}
