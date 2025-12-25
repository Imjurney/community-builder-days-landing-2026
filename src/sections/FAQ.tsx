'use client';

import { useState, useRef } from 'react';
import Container from '@/components/Container';
import { FAQ as FAQ_ITEMS } from '@/constants/faq';
import { useFadeIn } from '@/lib/gsap';
import title from '@/assets/sectionTitle/title_section5.svg';
import titleSm from '@/assets/sectionTitle/title_section5_sm.svg';
import arrowUp from '@/assets/icons/ArrowUp.svg';
import gsap from 'gsap';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const titleRef = useFadeIn<HTMLImageElement>({
    duration: 0.8,
    delay: 0.2,
  });

  const toggleItem = (id: string) => {
    const isOpening = openId !== id;

    // 이전에 열려있던 항목 닫기
    if (openId !== null && openId !== id) {
      const prevContentEl = contentRefs.current[openId];
      if (prevContentEl) {
        gsap.to(prevContentEl, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        });
      }
    }

    setOpenId(isOpening ? id : null);

    const contentEl = contentRefs.current[id];
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
      <Container className="py-0 flex flex-col xl:flex-row items-start">
        <img
          ref={titleRef}
          className="hidden xl:block"
          src={title}
          width={546}
          height={320}
          alt="자주 묻는 질문"
        />
        <img
          width={360}
          ref={titleRef}
          className="xl:hidden block w-full"
          src={titleSm}
          alt="자주 묻는 질문"
        />

        <div className="w-full">
          {FAQ_ITEMS.map((item) => (
            <div
              className="p-5 xl:p-10 border-b border-l border-(--stroke)"
              key={item.id}>
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                className="faq-list-title text-white text-start flex justify-between w-full cursor-pointer">
                <span>{item.q}</span>
                <img
                  src={arrowUp}
                  alt=""
                  aria-hidden="true"
                  className={`shrink-0 h-8 w-8 transition-transform duration-300 ${
                    openId === item.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                ref={(el) => {
                  contentRefs.current[item.id] = el;
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
