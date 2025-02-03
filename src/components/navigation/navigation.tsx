import { Link } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { useAuth } from "../../authentication/AuthProvider";

function Navigation(): JSX.Element {
  const { isLoggedIn, userProfile, logout } = useAuth();

  return (
    <div>
      <nav className="bg-white">
        <div className="container flex flex-wrap justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="/holidazelogo.png" className="h-12" alt="Holidaze Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-primary">
              Holidaze
            </span>
          </Link>

          <ul className="flex flex-col font-bold p-4 md:p-0 mt-4 border sm:flex-row gap-10 items-center border-none">
            <li>
              <Link
                to="/venues"
                className="py-2 px-3 rounded  md:hover:bg-transparent md:hover:text-primaryButton md:p-0 "
              >
                Venues
              </Link>
            </li>

            {!isLoggedIn ? (
              <>
                <li>
                  <Link
                    to="/login"
                    className="py-2 px-3 rounded md:hover:bg-transparent md:hover:text-primaryButton md:p-0"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="py-2 px-3 rounded  md:hover:bg-transparent md:hover:text-primaryButton md:p-0"
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to={`profiles/${userProfile.name}`}
                    className="py-2 px-3 rounded md:hover:bg-transparent md:hover:text-primaryButton md:p-0"
                  >
                    Profile
                  </Link>
                </li>

                <Dropdown
                  arrowIcon={false}
                  label="Menu"
                  style={{
                    border: "none",
                    outline: "none",
                    boxShadow: "none",
                    fontWeight: "700",
                  }}
                  renderTrigger={(theme) => (
                    <span
                      className="text-sm flex items-center justify-center space-x-2"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "700",
                      }}
                    >
                      <img
                        src="https://i1.sndcdn.com/artworks-NZstK5rBoTgmMXBK-RShAtw-t500x500.jpg"
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full cursor-pointer"
                      />
                    </span>
                  )}
                >
                  <Dropdown.Header>
                    <div>
                      <span className="block text-sm font-semibold">
                        {userProfile.name}
                      </span>
                      <span className="block text-xs text-gray-500 truncate">
                        {userProfile.email}
                      </span>
                    </div>
                  </Dropdown.Header>
                  <Dropdown.Item>Dashboard</Dropdown.Item>
                  <Dropdown.Item>Settings</Dropdown.Item>
                  <Dropdown.Item>Earnings</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
                </Dropdown>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
