
import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  schema?: object;
  image?: string;
  url?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, schema, image, url }) => {
  useEffect(() => {
    // Set page title
    document.title = title;

    // Helper function to update or create meta tag
    const updateMetaTag = (selector: string, attribute: string, content: string) => {
      let meta = document.querySelector(selector);
      if (!meta) {
        meta = document.createElement('meta');
        if (selector.includes('property=')) {
          meta.setAttribute('property', selector.split('"')[1]);
        } else if (selector.includes('name=')) {
          meta.setAttribute('name', selector.split('"')[1]);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute(attribute, content);
    };

    // Basic meta tags
    updateMetaTag('meta[name="description"]', 'content', description);
    updateMetaTag('meta[name="title"]', 'content', title);

    // Open Graph tags
    const baseUrl = url || 'https://fixbyras.com/';
    const defaultImage = image || 'https://fixbyras.com/ras-img.PNG';

    updateMetaTag('meta[property="og:title"]', 'content', title);
    updateMetaTag('meta[property="og:description"]', 'content', description);
    updateMetaTag('meta[property="og:image"]', 'content', defaultImage);
    updateMetaTag('meta[property="og:url"]', 'content', baseUrl);
    updateMetaTag('meta[property="og:type"]', 'content', 'website');

    // Twitter Card tags
    updateMetaTag('meta[name="twitter:title"]', 'content', title);
    updateMetaTag('meta[name="twitter:description"]', 'content', description);
    updateMetaTag('meta[name="twitter:image"]', 'content', defaultImage);
    updateMetaTag('meta[name="twitter:card"]', 'content', 'summary_large_image');

    // Update canonical URL if provided
    if (url) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', url);
    }

    // Remove existing schema
    const existingSchema = document.getElementById('json-ld-schema');
    if (existingSchema) {
      existingSchema.remove();
    }

    // Add new schema
    if (schema) {
      const script = document.createElement('script');
      script.id = 'json-ld-schema';
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    return () => {
        const script = document.getElementById('json-ld-schema');
        if (script) {
            script.remove();
        }
    };

  }, [title, description, schema, image, url]);

  return null;
};

export default SEO;
