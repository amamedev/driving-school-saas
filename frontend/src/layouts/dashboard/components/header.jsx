const header = () => {
  return (
    <header className="h-16 bg-[var(--header-bg)] border-b flex items-center justify-between px-6">
      {/* LEFT */}
      <h2 className="text-lg font-semibold text-[var(--sb-hd-text)]">
        Autoescuela Úbeda
      </h2>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <button className="text-[var(--sb-hd-text)] hover:text-[var(--sb-hd-text-hover)]">
          Notificaciones
        </button>

        <div className="w-8 h-8 rounded-full bg-gray-300" />
      </div>
    </header>
  );
};

export default header;
