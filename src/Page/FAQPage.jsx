import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqData = [
  {
    question: "What is the Art Gallery?",
    answer:
      "Art Gallery is an online platform where artists can showcase their paintings and collectors can explore and discover unique artworks from talented creators.",
  },
  {
    question: "How can I buy a painting?",
    answer:
      "You can browse the gallery, open any artwork you like, view its details, and proceed with the purchase through the platform.",
  },
  {
    question: "Can I sell my artwork on this platform?",
    answer:
      "Yes. Artists can submit their artwork through the 'Sell Art' section. Once reviewed, the artwork may be listed in the gallery for collectors to explore.",
  },
  {
    question: "Are the artworks original?",
    answer:
      "Yes. The gallery focuses on displaying original artworks created by artists. Each submission is reviewed before appearing in the gallery.",
  },
  {
    question: "Can I request a custom painting?",
    answer:
      "Yes. You can use the Customize page to send your idea or concept. Artists may contact you to create a personalized artwork.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery usually takes 5–10 business days depending on the artist’s location and the shipping method used.",
  },
  {
    question: "What type of art is available in the gallery?",
    answer:
      "The gallery includes different styles such as abstract art, modern art, landscape paintings, digital art, and other creative artworks.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can contact us through the Customize or Contact section by sending your email and message.",
  }
];

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white px-5 py-32 relative overflow-hidden">

      {/* background glow */}
      <div className="absolute w-[500px] h-[500px] bg-[#0b6472] opacity-20 blur-[160px] rounded-full top-10 left-10"></div>
      <div className="absolute w-[400px] h-[400px] bg-[#0b6472] opacity-20 blur-[150px] rounded-full bottom-10 right-10"></div>

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Title */}
        <h1 className="text-5xl font-extrabold text-center mb-6 bg-gradient-to-r from-[#0b6472] to-[#5ce1e6] bg-clip-text text-transparent">
          Frequently Asked Questions
        </h1>

        <p className="text-gray-300 text-center mb-12 font-mono text-sm">
          Everything you need to know about our Art Gallery and how our platform works.
        </p>

        {/* FAQ list */}
        <div className="space-y-5">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-[0_0_30px_rgba(11,100,114,0.15)]"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-5 text-left"
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                <FaChevronDown
                  className={`transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeIndex === index && (
                <div className="px-6 pb-6 text-gray-300 text-sm leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default FAQPage;