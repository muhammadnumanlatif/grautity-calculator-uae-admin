import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SITE_CONFIG } from '@gratuity/shared';
import { generateBreadcrumbSchema, combineSchemas } from '@gratuity/seo-utils';
import NewsletterForm from '@/components/forms/NewsletterForm';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './page.module.css';

// Revalidate every hour
export const revalidate = 3600;

// Use dynamic rendering to avoid build-time Firebase issues
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

import { getActiveWidgets } from '@/lib/widgets';
import type { BlogPost, Widget } from '@gratuity/shared/types';
import WidgetRenderer from '@/components/widgets/WidgetRenderer';
import { getBlogBySlug, getLatestBlogs } from '@/lib/blog-content';

async function getRelatedPosts(currentSlug: string, category?: string) {
  // Use cached latest blogs
  const blogs = await getLatestBlogs(10);
  return blogs.filter(p => p.slug !== currentSlug).slice(0, 3);
}

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getBlogBySlug(params.slug);
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
  const post = await getBlogBySlug(params.slug);
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

  // Fetch active widgets for sidebar
  const activeWidgets = await getActiveWidgets();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemas }}
      />

      <article>
        {/* Simple breadcrumb - no hero banner */}
        <div className="container pt-4">
          <nav aria-label="breadcrumb" className="mb-2">
            <ol className={styles.breadcrumbSimple}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li>{post.title}</li>
            </ol>
          </nav>
        </div>

        {/* Content Section */}
        <section className="section">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className={styles.postContent}>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      img: ({ node, ...props }) => (
                        // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
                        <img loading="lazy" decoding="async" {...props} />
                      ),
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>
                </div>

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
                  <WidgetRenderer widgets={activeWidgets} />

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

