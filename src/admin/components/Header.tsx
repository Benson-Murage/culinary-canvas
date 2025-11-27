export default function Header() {
  return (
    <header className="h-20 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Kijani Restaurant Admin</h2>
      </div>
      <div className="flex items-center">
        {/* User profile can go here */}
      </div>
    </header>
  );
}