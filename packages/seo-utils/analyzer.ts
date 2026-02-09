import type { SEOData } from '@gratuity/shared';
import { SEO_DEFAULTS } from '@gratuity/shared';

export interface SEOAnalysisResult {
  score: number;
  maxScore: number;
  percentage: number;
  issues: SEOIssue[];
  suggestions: SEOSuggestion[];
}

export interface SEOIssue {
  type: 'error' | 'warning' | 'info';
  field: string;
  message: string;
  impact: 'high' | 'medium' | 'low';
}

export interface SEOSuggestion {
  field: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
}

// Analyze SEO data
export function analyzeSEO(options: {
  seo: SEOData;
  content: string;
  url: string;
}): SEOAnalysisResult {
  const { seo, content, url } = options;
  const issues: SEOIssue[] = [];
  const suggestions: SEOSuggestion[] = [];
  let score = 0;
  const maxScore = 100;

  // Title analysis (max 15 points)
  const titleScore = analyzeTitle(seo.metaTitle, seo.focusKeyword, issues, suggestions);
  score += titleScore;

  // Meta description analysis (max 15 points)
  const descScore = analyzeDescription(seo.metaDescription, seo.focusKeyword, issues, suggestions);
  score += descScore;

  // URL analysis (max 10 points)
  const urlScore = analyzeUrl(url, seo.focusKeyword, issues, suggestions);
  score += urlScore;

  // Content analysis (max 30 points)
  const contentScore = analyzeContent(content, seo.focusKeyword, issues, suggestions);
  score += contentScore;

  // Keyword analysis (max 20 points)
  const keywordScore = analyzeKeywords(
    content,
    seo.focusKeyword,
    seo.secondaryKeywords,
    issues,
    suggestions
  );
  score += keywordScore;

  // Technical SEO (max 10 points)
  const technicalScore = analyzeTechnical(seo, issues, suggestions);
  score += technicalScore;

  return {
    score,
    maxScore,
    percentage: Math.round((score / maxScore) * 100),
    issues,
    suggestions,
  };
}

// Analyze title
function analyzeTitle(
  title: string,
  focusKeyword: string,
  issues: SEOIssue[],
  suggestions: SEOSuggestion[]
): number {
  let score = 0;

  // Check title length
  if (title.length >= 50 && title.length <= SEO_DEFAULTS.TITLE_MAX_LENGTH) {
    score += 5;
  } else if (title.length < 50) {
    issues.push({
      type: 'warning',
      field: 'metaTitle',
      message: `Title is too short (${title.length} chars). Aim for 50-60 characters.`,
      impact: 'medium',
    });
    score += 2;
  } else {
    issues.push({
      type: 'error',
      field: 'metaTitle',
      message: `Title is too long (${title.length} chars). Keep it under 60 characters.`,
      impact: 'high',
    });
  }

  // Check if focus keyword is in title
  if (title.toLowerCase().includes(focusKeyword.toLowerCase())) {
    score += 5;
  } else {
    issues.push({
      type: 'error',
      field: 'metaTitle',
      message: 'Focus keyword not found in title.',
      impact: 'high',
    });
  }

  // Check if keyword is at the beginning
  if (title.toLowerCase().startsWith(focusKeyword.toLowerCase())) {
    score += 5;
  } else if (title.toLowerCase().includes(focusKeyword.toLowerCase())) {
    suggestions.push({
      field: 'metaTitle',
      message: 'Consider placing the focus keyword at the beginning of the title.',
      priority: 'medium',
    });
    score += 2;
  }

  return score;
}

// Analyze description
function analyzeDescription(
  description: string,
  focusKeyword: string,
  issues: SEOIssue[],
  suggestions: SEOSuggestion[]
): number {
  let score = 0;

  // Check description length
  if (description.length >= 150 && description.length <= SEO_DEFAULTS.DESCRIPTION_MAX_LENGTH) {
    score += 5;
  } else if (description.length < 150) {
    issues.push({
      type: 'warning',
      field: 'metaDescription',
      message: `Description is too short (${description.length} chars). Aim for 150-160 characters.`,
      impact: 'medium',
    });
    score += 2;
  } else {
    issues.push({
      type: 'error',
      field: 'metaDescription',
      message: `Description is too long (${description.length} chars). Keep it under 160 characters.`,
      impact: 'high',
    });
  }

  // Check if focus keyword is in description
  if (description.toLowerCase().includes(focusKeyword.toLowerCase())) {
    score += 5;
  } else {
    issues.push({
      type: 'error',
      field: 'metaDescription',
      message: 'Focus keyword not found in meta description.',
      impact: 'high',
    });
  }

  // Check for call-to-action words
  const ctaWords = ['learn', 'discover', 'calculate', 'find', 'get', 'try', 'free'];
  const hasCTA = ctaWords.some((word) => description.toLowerCase().includes(word));
  if (hasCTA) {
    score += 5;
  } else {
    suggestions.push({
      field: 'metaDescription',
      message: 'Consider adding a call-to-action in your meta description.',
      priority: 'low',
    });
    score += 2;
  }

  return score;
}

// Analyze URL
function analyzeUrl(
  url: string,
  focusKeyword: string,
  issues: SEOIssue[],
  suggestions: SEOSuggestion[]
): number {
  let score = 0;
  const urlPath = url.split('/').pop() || '';

  // Check URL length
  if (urlPath.length <= 75) {
    score += 3;
  } else {
    suggestions.push({
      field: 'url',
      message: 'URL is quite long. Consider shortening it for better SEO.',
      priority: 'low',
    });
    score += 1;
  }

  // Check if keyword is in URL
  const keywordSlug = focusKeyword.toLowerCase().replace(/\s+/g, '-');
  if (urlPath.toLowerCase().includes(keywordSlug)) {
    score += 5;
  } else {
    const keywordWords = focusKeyword.toLowerCase().split(' ');
    const hasPartialMatch = keywordWords.some((word) => urlPath.toLowerCase().includes(word));
    if (hasPartialMatch) {
      score += 3;
    } else {
      suggestions.push({
        field: 'url',
        message: 'Consider including the focus keyword in the URL.',
        priority: 'medium',
      });
    }
  }

  // Check for special characters
  if (!/[^a-z0-9-/]/.test(urlPath.toLowerCase())) {
    score += 2;
  } else {
    issues.push({
      type: 'warning',
      field: 'url',
      message: 'URL contains special characters. Use only lowercase letters, numbers, and hyphens.',
      impact: 'low',
    });
  }

  return score;
}

// Analyze content
function analyzeContent(
  content: string,
  focusKeyword: string,
  issues: SEOIssue[],
  suggestions: SEOSuggestion[]
): number {
  let score = 0;
  const wordCount = content.trim().split(/\s+/).length;

  // Check content length
  if (wordCount >= 1500) {
    score += 10;
  } else if (wordCount >= 1000) {
    score += 7;
    suggestions.push({
      field: 'content',
      message: `Content is ${wordCount} words. Consider adding more content (1500+ words recommended).`,
      priority: 'medium',
    });
  } else if (wordCount >= 500) {
    score += 4;
    issues.push({
      type: 'warning',
      field: 'content',
      message: `Content is only ${wordCount} words. Aim for at least 1000 words.`,
      impact: 'medium',
    });
  } else {
    issues.push({
      type: 'error',
      field: 'content',
      message: `Content is too short (${wordCount} words). Minimum 500 words recommended.`,
      impact: 'high',
    });
  }

  // Check keyword in first paragraph
  const firstParagraph = content.split('\n')[0] || '';
  if (firstParagraph.toLowerCase().includes(focusKeyword.toLowerCase())) {
    score += 10;
  } else {
    issues.push({
      type: 'warning',
      field: 'content',
      message: 'Focus keyword not found in the first paragraph.',
      impact: 'medium',
    });
    score += 3;
  }

  // Check for headings
  const hasH2 = content.includes('##') || content.includes('<h2');
  const hasH3 = content.includes('###') || content.includes('<h3');
  if (hasH2 && hasH3) {
    score += 10;
  } else if (hasH2) {
    score += 6;
    suggestions.push({
      field: 'content',
      message: 'Consider adding H3 subheadings to improve content structure.',
      priority: 'low',
    });
  } else {
    issues.push({
      type: 'warning',
      field: 'content',
      message: 'No subheadings found. Add H2 and H3 headings to structure your content.',
      impact: 'medium',
    });
    score += 2;
  }

  return score;
}

// Analyze keywords
function analyzeKeywords(
  content: string,
  focusKeyword: string,
  secondaryKeywords: string[],
  issues: SEOIssue[],
  suggestions: SEOSuggestion[]
): number {
  let score = 0;
  const contentLower = content.toLowerCase();
  const wordCount = content.trim().split(/\s+/).length;

  // Calculate keyword density
  const keywordRegex = new RegExp(focusKeyword.toLowerCase(), 'gi');
  const keywordCount = (contentLower.match(keywordRegex) || []).length;
  const density = (keywordCount / wordCount) * 100;

  if (density >= 1 && density <= 3) {
    score += 10;
  } else if (density < 1) {
    issues.push({
      type: 'warning',
      field: 'keywords',
      message: `Keyword density is too low (${density.toFixed(2)}%). Aim for 1-3%.`,
      impact: 'medium',
    });
    score += 4;
  } else {
    issues.push({
      type: 'error',
      field: 'keywords',
      message: `Keyword density is too high (${density.toFixed(2)}%). This may be seen as keyword stuffing.`,
      impact: 'high',
    });
    score += 2;
  }

  // Check secondary keywords
  let secondaryCount = 0;
  secondaryKeywords.forEach((keyword) => {
    if (contentLower.includes(keyword.toLowerCase())) {
      secondaryCount++;
    }
  });

  if (secondaryKeywords.length > 0) {
    const secondaryPercentage = (secondaryCount / secondaryKeywords.length) * 100;
    if (secondaryPercentage >= 80) {
      score += 10;
    } else if (secondaryPercentage >= 50) {
      score += 6;
      suggestions.push({
        field: 'keywords',
        message: 'Some secondary keywords are missing from the content.',
        priority: 'low',
      });
    } else {
      issues.push({
        type: 'warning',
        field: 'keywords',
        message: 'Most secondary keywords are missing from the content.',
        impact: 'low',
      });
      score += 3;
    }
  } else {
    suggestions.push({
      field: 'keywords',
      message: 'Consider adding secondary keywords to improve topic coverage.',
      priority: 'medium',
    });
    score += 5;
  }

  return score;
}

// Analyze technical SEO
function analyzeTechnical(
  seo: SEOData,
  issues: SEOIssue[],
  suggestions: SEOSuggestion[]
): number {
  let score = 0;

  // Check robots meta
  if (seo.robots.index && seo.robots.follow) {
    score += 5;
  } else if (!seo.robots.index) {
    issues.push({
      type: 'info',
      field: 'robots',
      message: 'Page is set to noindex. This page will not appear in search results.',
      impact: 'high',
    });
  }

  // Check canonical URL
  if (seo.canonicalUrl) {
    score += 5;
  } else {
    suggestions.push({
      field: 'canonical',
      message: 'Consider setting a canonical URL to avoid duplicate content issues.',
      priority: 'medium',
    });
    score += 2;
  }

  return score;
}

// Calculate readability score (Flesch-Kincaid)
export function calculateReadabilityScore(content: string): number {
  const sentences = content.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const words = content.trim().split(/\s+/);
  const syllables = words.reduce((count, word) => count + countSyllables(word), 0);

  if (sentences.length === 0 || words.length === 0) {
    return 0;
  }

  const avgWordsPerSentence = words.length / sentences.length;
  const avgSyllablesPerWord = syllables / words.length;

  // Flesch Reading Ease formula
  const score = 206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord;

  return Math.max(0, Math.min(100, Math.round(score)));
}

// Count syllables in a word
function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (word.length <= 3) return 1;

  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const matches = word.match(/[aeiouy]{1,2}/g);

  return matches ? matches.length : 1;
}

// Get readability level
export function getReadabilityLevel(score: number): string {
  if (score >= 90) return 'Very Easy';
  if (score >= 80) return 'Easy';
  if (score >= 70) return 'Fairly Easy';
  if (score >= 60) return 'Standard';
  if (score >= 50) return 'Fairly Difficult';
  if (score >= 30) return 'Difficult';
  return 'Very Difficult';
}
