export default function ContactLayout({
  children,
}: Readonly<{   children: React.ReactNode }>) {
  return (
    <div>
      <h1>This is a contact layout</h1>
      {children}
    </div>
  );
}   