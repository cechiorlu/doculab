export default function seo(data = {}) {
    data.title = data.title || 'Google Docs Clone';
    data.metaDescription = data.metaDescription || 'Google docslike text editor that enables real time collaboration';

    document.title = data.title;
    document.querySelector('meta[name="description"]').setAttribute('content', data.metaDescription)
}