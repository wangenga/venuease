import Container from "./Container";
import Logo from "./Logo";
import BrowseSpaces from "./BrowseSpaces";
import UserMenu from "./UserMenu";

const Navbar = () => {
    return ( 
        <div className="fixed w-full bg-white z-10 shadow-sm">
        <div className="py-4 border-b-[1px]">
          <Container>
            <div className="flex flex-row items-center justify-end gap-6 md:gap-4">
              <div className="mr-auto">
                <Logo />
              </div>
              <div className="flex-grow flex justify-end">
                <BrowseSpaces />
              </div>
              <UserMenu />
            </div>
          </Container>
        </div>
      </div>      
     );
   }
   
   export default Navbar;