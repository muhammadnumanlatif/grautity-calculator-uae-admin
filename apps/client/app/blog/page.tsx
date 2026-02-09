import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_CONFIG } from '@gratuity/shared';
import { generateBreadcrumbSchema, combineSchemas } from '@gratuity/seo-utils';
import NewsletterForm from '@/components/forms/NewsletterForm';
import styles from './page.module.css';

export const revalidate = 3600; // revalidate every hour

export const metadata: Metadata = {
  title: 'UAE Labor Law Blog | Gratuity & Employment News 2026',
  description:
    'Stay updated with the latest UAE labor law news, gratuity calculation guides, and employment tips for workers in the UAE.',
  keywords: [
    'uae labor law blog',
    'gratuity news',
    'uae employment updates',
    'mohre news',
    'uae worker rights',
  ],
};

import { getPublishedBlogs } from '@gratuity/firebase-config/firestore';
import type { BlogPost } from '@gratuity/shared/types';

const categories = ['All', 'Labor Law', 'Free Zones', 'Tips', 'Legal', 'Employment', 'Visa'];

export default async function BlogPage() {
  const blogPosts = await getPublishedBlogs<BlogPost>(100); // Fetch up to 100 posts
  const breadcrumbs = [
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Blog', url: `${SITE_CONFIG.url}/blog` },
  ];

  const schemas = combineSchemas([
    generateBreadcrumbSchema(breadcrumbs),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemas }}
      />

      {/* Hero Section */}
      <section className={styles.pageHero}>
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link href="/">Home</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Blog</li>
            </ol>
          </nav>

          <h1>UAE Labor Law Blog</h1>
          <p className={styles.lead}>
            Stay updated with the latest news, guides, and tips about UAE employment and gratuity.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <div className="container">
          <div className={styles.categories}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.categoryBtn} ${cat === 'All' ? styles.active : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section section-light">
        <div className="container">
          <div className="row g-4">
            {blogPosts.map((post) => (
              <div key={post.slug} className="col-lg-4 col-md-6">
                <article className={styles.postCard}>
                  <div className={styles.postMeta}>
                    <span className={styles.category}>{post.category}</span>
                    <span className={styles.date}>
                      {post.publishedAt
                        ? (post.publishedAt instanceof Date
                          ? post.publishedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                          : new Date((post.publishedAt as any).seconds * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }))
                        : 'Draft'}
                    </span>
                  </div>
                  <h2 className={styles.postTitle}>
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className={styles.postExcerpt}>{post.excerpt}</p>
                  <div className={styles.postFooter}>
                    <span className={styles.readTime}>{post.readingTime} min read</span>
                    <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                      Read More →
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section">
        <div className="container">
          <div className={styles.newsletter}>
            <h2>Stay Updated</h2>
            <p>Get the latest UAE labor law updates and gratuity news delivered to your inbox.</p>
            <NewsletterForm variant="blog" />
            <p className={styles.disclaimer}>We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-light">
        <div className="container text-center">
          <h2>Calculate Your Gratuity</h2>
          <p className="lead mb-4">
            Use our free calculator to estimate your end of service benefits.
          </p>
          <Link href="/#calculator" className="btn btn-primary btn-lg">
            Calculate Now
          </Link>
        </div>
      </section>
    </>
  );
}
