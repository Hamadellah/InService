// src/components/layout/Sidebar.jsx
import { NavLink } from 'react-router-dom';

const Sidebar = ({ user }) => {
  const roles = user?.roles || [];
  const isEmployee = roles.some(r => ['employee', 'trainer'].includes(r));
  const isManager = roles.includes('manager');
  const isHR = roles.includes('hr') || roles.includes('admin');

  console.log('👤 Sidebar - User:', user);
  console.log('🎭 Sidebar - Roles:', roles);
  console.log('📋 isHR:', isHR);
  console.log('📋 isManager:', isManager);

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white shadow-md overflow-y-auto">
      <nav className="p-4 space-y-2">
        {/* Menu Employee */}
        {isEmployee && (
          <>
            <NavLink
              to="/employee/dashboard"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                }`
              }
            >
              📊 Dashboard
            </NavLink>
            <NavLink
              to="/employee/requests"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                }`
              }
            >
              📋 Mes Demandes
            </NavLink>
            <NavLink
              to="/employee/requests/new"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                }`
              }
            >
              ✏️ Nouvelle Demande
            </NavLink>
          </>
        )}

        {/* Menu Manager */}
        {isManager && (
          <>
            <div className="border-t pt-2 mt-2">
              <p className="text-xs uppercase text-gray-400 font-semibold px-4 py-1">
                Manager
              </p>
              <NavLink
                to="/manager/approvals"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg transition-colors ${
                    isActive ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                  }`
                }
              >
                ✅ Approbations
              </NavLink>
            </div>
          </>
        )}

        {/* Menu HR */}
        {isHR && (
          <>
            <div className="border-t pt-2 mt-2">
              <p className="text-xs uppercase text-gray-400 font-semibold px-4 py-1">
                RH
              </p>
              <NavLink
                to="/hr/dashboard"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg transition-colors ${
                    isActive ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                  }`
                }
              >
                📈 Dashboard RH
              </NavLink>
              <NavLink
                to="/hr/calendar"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg transition-colors ${
                    isActive ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                  }`
                }
              >
                📅 Calendrier
              </NavLink>
              <NavLink
                to="/hr/reports"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg transition-colors ${
                    isActive ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                  }`
                }
              >
                📊 Rapports
              </NavLink>
              {isManager && (
                <NavLink
                  to="/manager/approvals"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-lg transition-colors ${
                      isActive ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                    }`
                  }
                >
                  ✅ Approbations
                </NavLink>
              )}
            </div>
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;