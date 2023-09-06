export default function Footer() {
  return (
    <footer className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Abir Authentication. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
