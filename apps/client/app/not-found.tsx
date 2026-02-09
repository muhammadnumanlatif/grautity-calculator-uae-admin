import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light text-center px-3">
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h2 className="h2 fw-semibold mt-4 mb-3">Page Not Found</h2>
      <p className="lead text-muted mb-4">Could not find the requested resource.</p>
      <Link href="/" className="btn btn-primary btn-lg px-4 rounded-pill shadow-sm">
        Return Home
      </Link>
    </div>
  );
}