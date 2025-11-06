
import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  schema?: object;
}

const SEO: React.FC<SEOProps> = ({ title, description, schema }) => {
  useEffect(() => {
    document.title = title;
    
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', description);
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

  }, [title, description, schema]);

  return null;
};

export default SEO;
