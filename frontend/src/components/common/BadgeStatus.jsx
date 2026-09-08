// src/components/common/BadgeStatus.jsx
const BadgeStatus = ({ status }) => {
  const config = {
    pending_manager: { label: '⏳ En attente Manager', color: 'bg-yellow-100 text-yellow-800' },
    pending_hr: { label: '⏳ En attente RH', color: 'bg-orange-100 text-orange-800' },
    approved: { label: '✅ Approuvé', color: 'bg-green-100 text-green-800' },
    rejected: { label: '❌ Refusé', color: 'bg-red-100 text-red-800' },
    cancelled: { label: 'Annulé', color: 'bg-gray-100 text-gray-800' },
  };

  const { label, color } = config[status] || config.pending_manager;

  return (
    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${color}`}>
      {label}
    </span>
  );
};

export default BadgeStatus; 