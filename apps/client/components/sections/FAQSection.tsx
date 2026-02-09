'use client';

import { useState } from 'react';
import type { FAQItem } from '@gratuity/shared/types';

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
  subtitle?: string;
}

export default function FAQSection({
  faqs,
  title = 'Frequently Asked Questions',
  subtitle,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section faq-section">
      <div className="container">
        <div className="section-title">
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="accordion" id="faqAccordion">
              {faqs.map((faq, index) => (
                <div key={index} className="accordion-item">
                  <h3 className="accordion-header">
                    <button
                      className={`accordion-button ${openIndex !== index ? 'collapsed' : ''}`}
                      type="button"
                      onClick={() => toggleFAQ(index)}
                      aria-expanded={openIndex === index}
                    >
                      {faq.question}
                    </button>
                  </h3>
                  <div
                    className={`accordion-collapse collapse ${openIndex === index ? 'show' : ''}`}
                  >
                    <div className="accordion-body">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .faq-section {
          background: #ffffff;
        }

        .accordion-item {
          border: none;
          margin-bottom: 1rem;
          border-radius: 0.5rem !important;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
        }

        .accordion-button {
          font-weight: 500;
          font-size: 1.125rem;
          padding: 1.25rem 1.5rem;
          background: white;
          color: #212529;
        }

        .accordion-button:not(.collapsed) {
          background: #f8f9fa;
          color: #0066cc;
          box-shadow: none;
        }

        .accordion-button:focus {
          box-shadow: none;
          border-color: transparent;
        }

        .accordion-button::after {
          transition: transform 0.3s ease;
        }

        .accordion-body {
          padding: 1.25rem 1.5rem;
          line-height: 1.7;
          color: #6c757d;
        }

        h3 {
          margin: 0;
        }

        @media (max-width: 768px) {
          .accordion-button {
            font-size: 1rem;
            padding: 1rem 1.25rem;
          }

          .accordion-body {
            padding: 1rem 1.25rem;
          }
        }
      `}</style>
    </section>
  );
}
