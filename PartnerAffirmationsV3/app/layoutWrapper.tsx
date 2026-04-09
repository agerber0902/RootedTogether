import { AuthProvider } from "@/provider/auth-provider";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
    return <>
        <AuthProvider>
            {children}
        </AuthProvider>
    </>;
};
export default LayoutWrapper;