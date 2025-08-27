const ArrowUpRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-up-right size-4">
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

const footerLink = [
  {
    title: 'LinkedIn',
    href: 'https://linkedin.com/in/your-profile', // Update with your actual LinkedIn URL
  },
  {
    title: 'GitHub',
    href: 'https://github.com/MISTERXYMISTER', // Fixed: removed extra spaces
  },
  {
    title: 'Twitter',
    href: 'https://twitter.com/your-profile', // Update with your actual Twitter URL
  }
];

export const Footer = () => {
  return (
    <footer className="relative overflow-x-clip"> {/* Fixed: removed -z-10 */}
      <div className="absolute h-[400px] w-[1600px] bottom-0 left-1/2 -translate-x-1/2 bg-emerald-300/30 
      [mask-image:radial-gradient(50%_50%_at_bottom_center,black,transparent)] -z-40"></div>
      <div className="container">
        <div className="border-t border-white/15 py-6 text-sm flex flex-col md:flex-row md:justify-between items-center gap-8">
          <div className="text-white/40">
          &copy; 2025. All rights reserved
          </div>
          <nav className="flex flex-col items-center gap-8 md:flex-row">
            {footerLink.map((link) => (
              <a 
                href={link.href} // Fixed: removed quotes around {link.href}
                key={link.title} 
                className="inline-flex items-center gap-1.5 cursor-pointer"
                target="_blank" // Added: opens links in new tab
                rel="noopener noreferrer" // Added: security best practice
              >
                <span className="font-semibold">{link.title}</span>
                <ArrowUpRight />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};