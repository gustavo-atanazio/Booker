function Pill({ active, onClick, children, }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors whitespace-nowrap ${
        active
          ? 'bg-yellow-400 text-black border-yellow-400'
          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
      }`}
    >
      {children}
    </button>
  );
}

export default Pill;