import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SITE_CONFIG } from '@gratuity/shared';
import { generateBreadcrumbSchema, combineSchemas } from '@gratuity/seo-utils';
import NewsletterForm from '@/components/forms/NewsletterForm';
import styles from './page.module.css';

// Revalidate every hour
export const revalidate = 3600;

// Use dynamic rendering to avoid build-time Firebase issues
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

import { getBlogBySlug, getPublishedBlogs, where, orderBy, limit } from '@gratuity/firebase-config/firestore';
import type { BlogPost } from '@gratuity/shared/types';

async function getRelatedPosts(currentSlug: string, category?: string) {
  // Optimized query with limit - only fetch what we need
  const blogs = await getPublishedBlogs<BlogPost>(10); // Limit to 10 instead of all
  return blogs.filter(p => p.slug !== currentSlug).slice(0, 3);
}

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getBlogBySlug<BlogPost>(params.slug);
  if (!post) {
    return { title: 'Post Not Found' };
  }
  const url = `${SITE_CONFIG.url}/blog/${params.slug}`;

  return {
    title: `${post.title} | UAE Gratuity Blog`,
    description: post.excerpt,
    keywords: [post.category.toLowerCase(), 'uae gratuity', 'labor law', post.title.toLowerCase()],
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: url,
      publishedTime: post.publishedAt
        ? (post.publishedAt instanceof Date
          ? post.publishedAt.toISOString()
          : (post.publishedAt as any).toDate?.().toISOString() || new Date((post.publishedAt as any).seconds * 1000).toISOString())
        : undefined,
      images: post.featuredImage ? [
        {
          url: post.featuredImage.url,
          alt: post.featuredImage.alt || post.title,
        }
      ] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getBlogBySlug<BlogPost>(params.slug);
  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(post.slug);

  const breadcrumbs = [
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Blog', url: `${SITE_CONFIG.url}/blog` },
    { name: post.title, url: `${SITE_CONFIG.url}/blog/${post.slug}` },
  ];

  const schemas = combineSchemas([
    generateBreadcrumbSchema(breadcrumbs),
  ]);

  const publishDate = post.publishedAt
    ? (post.publishedAt instanceof Date
      ? post.publishedAt
      : (post.publishedAt as any).toDate?.() || new Date((post.publishedAt as any).seconds * 1000))
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemas }}
      />

      <article>
        {/* Hero Section */}
        <header className={styles.postHero}>
          <div className="container">
            <nav aria-label="breadcrumb" className="mb-3">
              <ol className={styles.breadcrumb}>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li>{post.category}</li>
              </ol>
            </nav>

            <span className={styles.category}>{post.category}</span>
            <h1>{post.title}</h1>

            <div className={styles.postMeta}>
              <span className={styles.author}>By Gratuity Team</span>
              <span className={styles.separator}>•</span>
              {publishDate && (
                <>
                  <time dateTime={publishDate.toISOString()}>
                    {publishDate.toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </time>
                  <span className={styles.separator}>•</span>
                </>
              )}
              <span>{post.readingTime} min read</span>
            </div>
          </div>
        </header>

        {/* Content Section */}
        <section className="section">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div
                  className={styles.postContent}
                  dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
                />

                {/* Author Box */}
                <div className={styles.authorBox}>
                  <div className={styles.authorAvatar}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                  <div>
                    <h4>Gratuity Calculator Team</h4>
                    <p>Helping UAE employees understand their gratuity and labor law rights.</p>
                  </div>
                </div>


                {/* Share Section */}
                <div className={styles.shareSection}>
                  <span>Share this article:</span>
                  <div className={styles.shareButtons}>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${SITE_CONFIG.url}/blog/${post.slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.shareBtn}
                    >
                      Twitter
                    </a>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`${SITE_CONFIG.url}/blog/${post.slug}`)}&title=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.shareBtn}
                    >
                      LinkedIn
                    </a>
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(`${post.title} - ${SITE_CONFIG.url}/blog/${post.slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.shareBtn}
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="col-lg-4">
                <div className={styles.sidebar}>
                  <div className={styles.sidebarCard}>
                    <h3>Calculate Your Gratuity</h3>
                    <p>Use our free calculator to estimate your end of service benefits.</p>
                    <Link href="/#calculator" className="btn btn-primary w-100">
                      Calculate Now
                    </Link>
                  </div>

                  <div className={styles.sidebarCard}>
                    <h3>Newsletter</h3>
                    <p>Get the latest UAE labor law updates.</p>
                    <NewsletterForm variant="blog" />
                  </div>

                  <div className={styles.sidebarCard}>
                    <h3>Related Articles</h3>
                    <div className={styles.relatedList}>
                      {relatedPosts.map((related) => (
                        <Link key={related.slug} href={`/blog/${related.slug}`} className={styles.relatedItem}>
                          <span className={styles.relatedCategory}>{related.category}</span>
                          <span className={styles.relatedTitle}>{related.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}

function formatContent(content: string): string {
  // Simple markdown-like formatting
  return content
    .replace(/## (.*)/g, '<h2>$1</h2>')
    .replace(/### (.*)/g, '<h3>$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/- (.*)/g, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>');
}
