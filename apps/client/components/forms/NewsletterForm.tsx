'use client';

import { useState, FormEvent } from 'react';
import styles from './NewsletterForm.module.css';

interface NewsletterFormProps {
  variant?: 'default' | 'blog' | 'sidebar';
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function NewsletterForm({ variant = 'default' }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;

    setStatus('submitting');

    try {
      const response = await fetch('https://formspree.io/f/mqeqbrzv', {
        method: 'POST',
        body: JSON.stringify({ email, _subject: 'Newsletter Subscription' }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  }

  const containerClass = (variant === 'blog' || variant === 'sidebar') ? styles.blogVariant : styles.defaultVariant;

  return (
    <form onSubmit={handleSubmit} className={`${styles.form} ${containerClass}`}>
      {status === 'success' ? (
        <div className={styles.successMessage}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          <span>Thanks for subscribing!</span>
        </div>
      ) : (
        <>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={status === 'submitting'}
            className={styles.input}
          />
          <button
            type="submit"
            disabled={status === 'submitting'}
            className={`btn btn-primary ${styles.button} ${status === 'error' ? styles.errorBtn : ''}`}
          >
            {status === 'submitting' ? (
              <span className={styles.spinner}></span>
            ) : status === 'error' ? (
              'Try Again'
            ) : (
              'Subscribe'
            )}
          </button>
        </>
      )}
    </form>
  );
}
