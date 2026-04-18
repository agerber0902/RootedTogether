import { AuthProvider } from "@/provider/auth-provider";
import StoreProvder from "@/state/StateProvider";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthProvider>
        <StoreProvder>
          {children}
          </StoreProvder>
      </AuthProvider>
    </>
  );
};
export default LayoutWrapper;
