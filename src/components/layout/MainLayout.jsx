import Header from "./Header"
import Footer from "./Footer"

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    )
}

export default MainLayout