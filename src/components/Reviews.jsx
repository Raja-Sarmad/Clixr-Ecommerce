import React from "react";

const reviewsData = [
  {
    name: "Ali Mehdi",
    rating: 5,
    comment: "Absolutely stunning artworks! The creativity is unmatched.",
    image: "/Gallery/image41.jpeg"
  },
  {
    name: "Sara Khan",
    rating: 4.8,
    comment: "Loved the colors and textures. Highly recommend!",
    image: "/Gallery/image42.jpeg"
  },
  {
    name: "Ahmed Raza",
    rating: 5,
    comment: "A perfect collection of modern art pieces.",
    image: "/Gallery/image43.jpeg"
  }
];

const Reviews = () => {
  return (
    <div className="bg-black min-h-screen py-24 px-4 md:px-16 text-white">
      <h1 className="text-[50px] md:text-[80px] font-bold text-center mb-16">
        Customer Reviews
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {reviewsData.map((r, i) => (
          <div
            key={i}
            className="bg-zinc-900 rounded-3xl p-6 flex flex-col items-center text-center shadow-2xl border border-white/10 hover:scale-105 transition-transform duration-500"
          >
            <img
              src={r.image}
              alt={r.name}
              className="w-28 h-28 rounded-full object-cover mb-4 border-2 border-[#0b6472]"
            />
            <h3 className="text-xl font-bold mb-2">{r.name}</h3>
            <p className="text-yellow-400 mb-2">{'★'.repeat(Math.round(r.rating))}</p>
            <p className="text-gray-300">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;