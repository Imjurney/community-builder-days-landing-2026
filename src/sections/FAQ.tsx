'use client';

import { useState } from 'react';
import Container from '@/components/Container';
import { FAQ as FAQ_ITEMS } from '@/constants/faq';
import { useFadeIn } from '@/lib/gsap';
import title from '@/assets/sectionTitle/title_section5.svg';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const titleRef = useFadeIn<HTMLImageElement>({
    duration: 0.8,
    delay: 0.2,
  });

  return (
    <section
      id="faq"
      className="py-20 border-t border-b border-brand-stroke">
      <Container className="py-0 flex items-start">
        <img
          ref={titleRef}
          src={title}
          width={546}
          height={320}
          alt="자주 묻는 질문"
        />

        <div className="space-y-4 max-w-3xl">
          {FAQ_ITEMS.map((item, index) => (
            <div key={item.q}>
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-start justify-between gap-4 hover:bg-card/50 transition-colors duration-200">
                <span className="text-left text-body1 font-semibold text-white">
                  {item.q}
                </span>
                <span
                  className={`flex-shrink-0 text-primary text-2xl transition-transform duration-300 ${
                    openIndex === index ? 'rotate-45' : ''
                  }`}>
                  +
                </span>
              </button>

              {openIndex === index && (
                <div className="px-6 pb-5 border-t border-brand-stroke/40">
                  <p className="text-white">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
