'use client';

import { useState, FormEvent } from 'react';
import styles from './page.module.css';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/mqeqbrzv', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        const data = await response.json();
        if (data.errors) {
          setErrorMessage(data.errors.map((err: { message: string }) => err.message).join(', '));
        } else {
          setErrorMessage('Something went wrong. Please try again.');
        }
        setStatus('error');
      }
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className={styles.formCard}>
        <div className={styles.successMessage}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="#4caf50">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <h2>Message Sent!</h2>
          <p>Thank you for contacting us. We'll get back to you within 24-48 hours.</p>
          <button
            onClick={() => setStatus('idle')}
            className="btn btn-outline-primary"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.formCard}>
      <h2>Send us a Message</h2>

      {status === 'error' && (
        <div className={styles.errorAlert}>
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.contactForm}>
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="name" className={styles.label}>Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className={styles.input}
              placeholder="John Doe"
              required
              disabled={status === 'submitting'}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="email" className={styles.label}>Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.input}
              placeholder="john@example.com"
              required
              disabled={status === 'submitting'}
            />
          </div>
          <div className="col-12">
            <label htmlFor="subject" className={styles.label}>Subject</label>
            <select
              id="subject"
              name="subject"
              className={styles.input}
              required
              disabled={status === 'submitting'}
            >
              <option value="">Select a subject</option>
              <option value="Gratuity Calculation Question">Gratuity Calculation Question</option>
              <option value="UAE Labor Law Question">UAE Labor Law Question</option>
              <option value="Technical Issue">Technical Issue</option>
              <option value="Feedback">Feedback</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="message" className={styles.label}>Message</label>
            <textarea
              id="message"
              name="message"
              className={styles.textarea}
              rows={5}
              placeholder="How can we help you?"
              required
              disabled={status === 'submitting'}
            />
          </div>
          <div className="col-12">
            <button
              type="submit"
              className="btn btn-primary btn-lg w-100"
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? (
                <>
                  <span className={styles.spinner}></span>
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
