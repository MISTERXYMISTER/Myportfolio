const ArrowUpRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-up-right size-4"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
);
import grainImage from "@/assets/images/grain.jpg";

export const Contact = () => {
  return (
    <div id="contact" className="py-16 pt-12 lg:py-24 lg:pt-20">
      <div className="container">
        <div className="bg-gradient-to-r from-emerald-300 to-sky-400 text-gray-900 py-8 px-10 rounded-3xl text-center md:text-left relative overflow-hidden z-0">
          <div className="absolute inset-0 opacity-5 -z-10"
            style={{ backgroundImage: `url(${grainImage})` }}>
          </div>
          <div className="flex flex-col md:flex-row gap-8 md:gap-6 items-center">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl">Lets create something amazing together</h2>
              <p className="text-sm md:text-base mt-2">
                Ready to start your project? Contact Me now! I can help you achieve your goals and bring your ideas to life.
              </p>
            </div>
            <div>
              <button className="text-white bg-gray-900 inline-flex items-center px-6 h-12 rounded-xl gap-2 w-max border border-gray-900">
                <span className="font-semibold">Contact Me</span>
                <ArrowUpRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
