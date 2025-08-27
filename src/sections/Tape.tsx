import { Fragment } from "react";

const StarIcon = () => (
<svg className="size-6 text-gray-900 -rotate-12" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 1C12 1 12 8 10 10C8 12 1 12 1 12C1 12 8 12 10 14C12 16 12 23 12 23C12 23 12 16 14 14C16 12 23 12 23 12C23 12 16 12 14 10C12 8 12 1 12 1Z" fill="currentColor"/>
</svg>
)

const words=[
  "Performant",
  "Secure",
  "Interactive",
  "Scalable",
  "Maintainable",
  "Accessible",
  "Search Optimized",
  "User-Friendly",
  "Usable",
  "Reliable",
]
export const TapeSection = () => {
  return (
    <div className="py-16 lg:py-24 overflow-x-clip">
      <div className="bg-gradient-to-r from-emerald-300 to-sky-400  -rotate-3 -mx-1">
        <div className="flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        >
          <div className="flex flex-none gap-4 py-3 pr-4 animate-move-left [animation-duration:16s]"
          >
            {[...new Array(2)].fill(0).map((_, idx) => (
              <Fragment key={idx}>
                {words.map(word => (
                  <div key={word} className="inline-flex gap-4 items-center">
                    <span className="text-gray-900 uppercase font-bold text-sm">{word}</span>
                    <StarIcon />
                  </div>
                ))}
              </Fragment>
            ))}
            
          </div>
        </div>
      </div>
    </div>
  );
};
