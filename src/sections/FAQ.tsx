'use client';

import { useState, useRef } from 'react';
import Container from '@/components/Container';
import { FAQ as FAQ_ITEMS } from '@/constants/faq';
import { useFadeIn } from '@/lib/gsap';
import title from '@/assets/sectionTitle/title_section5.svg';
import arrowUp from '@/assets/icons/ArrowUp.svg';
import gsap from 'gsap';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const titleRef = useFadeIn<HTMLImageElement>({
    duration: 0.8,
    delay: 0.2,
  });

  const toggleItem = (index: number) => {
    const isOpening = openIndex !== index;

    // 이전에 열려있던 항목 닫기
    if (openIndex !== null && openIndex !== index) {
      const prevContentEl = contentRefs.current[openIndex];
      if (prevContentEl) {
        gsap.to(prevContentEl, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        });
      }
    }

    setOpenIndex(isOpening ? index : null);

    const contentEl = contentRefs.current[index];
    if (!contentEl) return;

    if (isOpening) {
      gsap.to(contentEl, {
        height: 'auto',
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    } else {
      gsap.to(contentEl, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  };

  return (
    <section
      id="faq"
      className="border-t border-b border-(--stroke)">
      <Container className="py-0 flex items-start">
        <img
          ref={titleRef}
          src={title}
          width={546}
          height={320}
          alt="자주 묻는 질문"
        />

        <div className="w-full">
          {FAQ_ITEMS.map((item, index) => (
            <div
              className="p-10 border-b border-l border-(--stroke)"
              key={item.q}>
              <button
                onClick={() => toggleItem(index)}
                className="text-title1 text-white text-start flex justify-between w-full cursor-pointer">
                <span>{item.q}</span>
                <img
                  src={arrowUp}
                  alt=""
                  aria-hidden="true"
                  className={`shrink-0 h-8 w-8 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                ref={(el) => {
                  contentRefs.current[index] = el;
                }}
                className="overflow-hidden"
                style={{
                  height: 0,
                  opacity: 0,
                }}>
                <p className="text-body1 mt-6 text-(--opacity-w060)">
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
