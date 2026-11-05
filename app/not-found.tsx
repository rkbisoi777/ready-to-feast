import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section text-center">
      <div className="container-x">
        <h1 className="text-6xl">Page not found</h1>
        <p className="mt-4 text-lg text-muted">This page has gone off the menu.</p>
        <Link href="/products/" className="btn-primary mt-8">See all flavours</Link>
      </div>
    </section>
  );
}
