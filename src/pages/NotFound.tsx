import Button from "../components/Button";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function NotFound() {
  useDocumentTitle("Page not found");
  return (
    <section className="page-hero not-found">
      <div className="page-hero-grid" aria-hidden="true" />
      <div className="container">
        <div className="not-found-inner">
          <span className="label mono">404</span>
          <h1 className="h1">This page isn't part of the workflow.</h1>
          <p className="lead">The page you're looking for doesn't exist or has moved.</p>
          <div className="btn-row center">
            <Button to="/" arrow>Back to home</Button>
            <Button to="/contact" variant="secondary">Contact us</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
