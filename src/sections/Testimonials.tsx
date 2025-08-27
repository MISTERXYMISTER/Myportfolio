import memojiAvatar1 from "@/assets/images/memoji-avatar-1.png";
import memojiAvatar2 from "@/assets/images/memoji-avatar-2.png";
import memojiAvatar3 from "@/assets/images/memoji-avatar-3.png";
import memojiAvatar4 from "@/assets/images/memoji-avatar-4.png";
import memojiAvatar5 from "@/assets/images/memoji-avatar-5.png";
import { SectionHeader } from "@/components/SectionHeader";
import { div } from "framer-motion/client";
import Image from "next/image";
import grainImage from "@/assets/images/grain.jpg";
import { Card } from "@/components/Card";
import { Fragment } from "react";

const testimonials = [
{
name: "Gaming Community Member",
position: "Player @ SonicRun",
text: "The SonicRun game is incredibly polished with smooth controls and engaging mechanics. The attention to detail in the level design and character movement is exceptional. It's clear this developer understands what makes platformers fun!",
avatar: memojiAvatar1,
},
{
name: "Indie Game Enthusiast",
position: "Content Creator @ GameReviews",
text: "Super Mango is a brilliant homage to classic platformers with creative twists. The vibrant visuals, challenging levels, and nostalgic feel demonstrate impressive game development skills. It brought back childhood memories while feeling fresh and original.",
avatar: memojiAvatar2,
},
{
name: "Awards Committee Member",
position: "Judge @ Web Design Awards",
text: "The animated website that won the award is a masterpiece of frontend development. The seamless animations, innovative interactions, and flawless performance showcase exceptional technical ability and creative vision. Truly deserving of recognition!",
avatar: memojiAvatar3,
},
{
name: "Fellow Developer",
position: "Senior Engineer @ TechStudio",
text: "I've examined the code behind these projects and it's remarkably clean, well-structured, and optimized. The technical implementation of the game physics and website animations demonstrates deep understanding of JavaScript and modern web technologies.",
avatar: memojiAvatar4,
},
{
name: "Game Development Student",
position: "Learner @ CodingAcademy",
text: "These projects have been incredibly inspirational for my own learning journey. The games show what's possible with dedication to the craft, and the award-winning website demonstrates how to push the boundaries of web animation and user experience.",
avatar: memojiAvatar5,
},
];

export const TestimonialsSection = () => {
  return (
    <div id="testimonials" className="py-16 lg:py-24">
      <div className="container">
        <SectionHeader
          eyebrow="Happy Clients"
          title="What Clients Say about Me"
          description="Dont just take my word for it. Hear what my clients have to say about working with me."
        />
        <div className="mt-12 lg:mt-20 flex overflow-x-clip [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)] py-4">
          <div className="flex gap-8 flex-none animate-move-left [animation-duration:90s] hover:[animation-play-state:paused]">
            {[...new Array(2)].fill(0).map((_, index) => (
              <Fragment key={index}>
                {testimonials.map(testimonial => (
                  <Card key={testimonial.name} 
                  className="max-w-xs p-6 md:p-8 md:max-w-md hover:-rotate-3 transition duration-300">
                    <div className="flex gap-4 items-center">
                  <div className="size-14 bg-gray-700 inline-flex rounded-full flex-shrink-0 items-center justify-center">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="max-h-full"
                    />
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-white/40">{testimonial.position}</div>
                  </div>
                </div>
                <p className="mt-4 md:mt-6 text-sm md:text-base">{testimonial.text}</p>
              </Card>
            ))}
            </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
