import "./LegalLayout.css";

type Props = {
  title: string;
  lastUpdated?: string;
  children: React.ReactNode;
};

export default function LegalLayout({
  title,
  lastUpdated = "June 2026",
  children,
}: Props) {
  return (
    <div className="legal-container">
      <h1 className="legal-title">{title}</h1>

      <p className="legal-updated">
        Last Updated: {lastUpdated}
      </p>

      <div className="legal-content">
        {children}
      </div>
    </div>
  );
}